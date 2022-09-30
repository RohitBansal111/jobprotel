import Layout from "../../components/Layout";
import ChatInbox from "../../components/Inbox/ChatInbox";
import React, { useEffect, useState } from "react";
import * as studentServices from "../../services/studentServices";
import * as employerServices from "../../services/employerServices";
import * as jobServices from "../../services/jobServices";
import { useSelector } from "react-redux";
import app from "../../helpers/firebase";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  query,
  equalTo,
  orderByChild,
  get,
  update,
  remove,
} from "@firebase/database";
import { Navigate, useParams } from "react-router";
import UserAvtar from "../../assets/images/demo.png";

const Inbox = () => {
  const db = getDatabase(app);
  const [chatRoomState, setChatRoomState] = useState([]);
  const [receiverState, setReceiverState] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiverDisplayName, setReceiverDisplayName] = useState("");
  const [employerDisplayName, setEmployerDisplayName] = useState("");
  const [employerUserImage, setEmployerUserImage] = useState("");
  const [studentDisplayName, setStudentDisplayName] = useState("");
  const [studentUserImage, setStudentUserImage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [search, setSearch] = useState("");
  const [jobIdd, setJobIdd] = useState("");
  const [chatDisabled, setChatDisabled] = useState(false);
  const [roomStatus, setRoomStatus] = useState(false);
  const [receiverLiveStatus, setReceiverLiveStatus] = useState(false);
  const [senderLiveStatus, setSenderLiveStatus] = useState(false);
  const [liveRefresh , setLiveRefresh]=useState(true)
  const { userId, jobId } = useParams();

  const navigate = useNavigate();

  useEffect(async () => {
    console.log(user, "user");
    if (user && userId && jobId && liveRefresh) {
      setReceiverId(userId);
      getJobDetails(jobId);
      if (user.userRoles[0] === "Student") {
        const rid = user.id + "_" + userId + "_" + jobId;
        setRoomId(rid);
        console.log("aman12");
        const resp = await getEmployerDetails(userId);
        if (resp.status == 200) {
          setStudentDisplayName(user?.fullName);
          setStudentUserImage(user?.studentDetails?.pictureUrl ||'');
          setEmployerDisplayName(resp.data.data.fullName);
          setEmployerUserImage(resp?.data?.data?.comapanyDetail?.logoPath || '');
          setStudentId(user?.id);
          setEmployerId(resp?.data?.data?.id);
          //call function
          addUser(
            rid,
            user?.fullName,
            user?.studentDetails?.pictureUrl ||'',
            resp.data.data.fullName,
            resp?.data?.data?.comapanyDetail?.logoPath ||'',
            user.id,
            resp?.data?.data?.id,
            user?.userRoles[0]
          );
          navigate("/inbox");
        }
      } else {
        const rid = userId + "_" + user.id + "_" + jobId;
        setRoomId(rid);
        const resp = await getStudentDetails(userId);
        if (resp.status == 200) {
          setStudentDisplayName(resp?.data?.data?.fullName);
          setStudentUserImage(resp?.data?.data?.studentDetails?.pictureUrl||'');
          setEmployerDisplayName(user?.fullName);
          setEmployerUserImage(user?.comapanyDetail?.logoPath || '');
          setStudentId(resp?.data?.data?.id);
          setEmployerId(user?.id);
          addUser(
            rid,
            resp?.data?.data?.fullName,
            resp?.data?.data?.studentDetails?.pictureUrl ||'',
            user?.fullName,
            user?.comapanyDetail?.logoPath ||'',
            userId,
            user?.id,
            user?.userRoles[0]
          );
          navigate("/inbox");
        }
      }
    }
  }, [user, userId, jobId]);

  useEffect(() => {
    //update last message
    if (roomId && !senderLiveStatus && user  && liveRefresh) {
      const updates = {};
      if (user && user.userRoles[0] && user.userRoles[0] == "Student") {
        updates["/studentLive/"] = true;
      } else {
        updates["/employerLive/"] = true;
      }
      update(ref(db, "User/" + roomId), updates);
    }
  }, [roomId, user]);

  const getStudentDetails = async (id) => {
    const resp = await studentServices.getStudentDetails(id);
    return resp;
  };

  const getJobDetails = async (jobId) => {
    const resp = await jobServices.getJobByJobId(jobId);
    if (resp.status == 200) {
      setJobTitle(resp?.data?.data?.title);
    }
  };

  const getEmployerDetails = async (id) => {
    const resp = await employerServices.getEmployerDetails(id);
    return resp;
  };
  const addUser = (
    roomId,
    studentDisplayName,
    studentUserImage,
    employerDisplayName,
    employerUserImage,
    studentId,
    employerId,
    userRole
  ) => {
   
    const date = new Date().getTime();
    var d1 = new Date().toISOString();
    set(ref(db, "User/" + roomId), {
      messageID: date,
      chatRoomID: roomId,
      dateTime: d1,
      studentDisplayName: studentDisplayName,
      studentUserImage: studentUserImage,
      employerDisplayName: employerDisplayName,
      employerUserImage: employerUserImage,
      message: "",
      receiver: userId,
      sender: user.id,
      studentId: studentId,
      employerId: employerId,
      jobId: jobId,
      block: false,
      live: true,
    });
    readUsers();
  };

  const addMessage = async () => {
    const date = new Date().getTime();
    var d1 = new Date().toISOString();
    set(ref(db, "ChatRoom/" + roomId + "/" + date), {
      messageID: date,
      chatRoomID: roomId,
      dateTime: d1,
      displayName: user?.fullName,
      message: message,
      receiver: receiverId,
      sender: user.id,
      userid: user.id,
      userImage:
        user && user.userRoles[0] && user.userRoles[0] == "Student"
          ? user.studentDetails?.pictureUrl
          : user?.comapanyDetail?.logoPath,
      jobId: jobId ? jobId : jobIdd ? jobIdd : undefined,
    });

    //update last message
    const updates = {};
    updates["/message/"] = message;
    updates["/dateTime/"] = d1;

    await update(ref(db, "User/" + roomId), updates);
    readMessage(roomId);
    readUsers(roomId);
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !message.trim():
        setErrors({ message: "Please add some text here!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
    setErrors({ message: "" });
  };

  const handleSubmitOnTextArea = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (isValid()) {
        await addMessage();
        setMessage("");
        setErrors({});
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      await addMessage();
      setMessage("");
      setErrors({});
    }
  };
  const readMessage = async (id) => {
    let rid = id ? id : roomId;
    let deleteData = true;
    const starCountRef = ref(db, "ChatRoom/" + rid);
    console.log(starCountRef, "helloo");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data, "hello02");
      if (data) {
        const convertedData = Object.keys(data).map((d) => {
          return data[d];
        });
        setMessages(convertedData);
      } else {
        setMessages([]);
      }
    });

   
    readUsers(roomId);
  };

  const readUsers = async (roomId) => {
    console.warn('jdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffs')
    //get user roomes
    // const starUserRef = query( ref(db, "User/" + rid ),orderByValue("dateTime"),equalTo(user.id));
    const starUserRef = query(ref(db, "User"), orderByChild("dateTime"));
    //const refData= ref.order().equalTo(user.id, 'studentId');
    onValue(starUserRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        updateUsers(data, roomId);
      
      } else {
        setUsers([]);
        //setRoomId("")
        setJobIdd("");
        setStudentDisplayName("");
        setEmployerDisplayName("");
        getJobDetails("");
        setMessages([]);
      }
    });
    setLiveRefresh(false)
  };

  const updateUsers = (data, roomId) => {
    if (user.userRoles[0] == "Student") {
      const convertedData = Object.keys(data).map((d) => {
        return data[d];
      });
      let finalData = convertedData.filter((data) => data.studentId == user.id);
      const sortByDate = (finalData) => {
        const sorter = (a, b) => {
          return (
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
        };
        finalData.sort(sorter);
      };
      sortByDate(finalData);
      if (finalData.length > 0) {
        if (!roomId && !roomStatus) {
          setRoomStatus(true);
          setRoomId(finalData[0]?.chatRoomID);
          setJobIdd(finalData[0]?.jobId);
          setStudentDisplayName(finalData[0]?.studentDisplayName);
          setEmployerDisplayName(finalData[0]?.employerDisplayName);
          getJobDetails(finalData[0]?.jobId);
          setChatDisabled(finalData[0]?.block);
          setReceiverId(finalData[0]?.employerId);
          setReceiverDisplayName(finalData[0]?.employerDisplayName);
          setReceiverLiveStatus(finalData[0]?.live);
        }
        setUsers(finalData);
      }
    } else {
      //setUsers(current => [...current, data]);
      const convertedData = Object.keys(data).map((d) => {
        return data[d];
      });
      const finalData = convertedData.filter(
        (data) => data.employerId == user.id
      );

      const sortByDate = (finalData) => {
        const sorter = (a, b) => {
          return (
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
        };
        finalData.sort(sorter);
      };
      sortByDate(finalData);
      console.log("finalData", finalData, user);
      if (!roomId && !roomStatus) {
        setRoomStatus(true);
        setRoomId(finalData[0]?.chatRoomID);
        console.log("aman17");
        setJobIdd(finalData[0]?.jobId);
        setStudentDisplayName(finalData[0]?.studentDisplayName);
        setEmployerDisplayName(finalData[0]?.employerDisplayName);
        getJobDetails(finalData[0]?.jobId);
        setReceiverId(finalData[0]?.studentId);
        setReceiverDisplayName(finalData[0]?.studentDisplayName);
        setReceiverLiveStatus(finalData[0]?.live);
      }
      setUsers(finalData);
    }
  };

  useEffect(() => {
    if (roomId ) {
     
      readMessage(roomId);
      //readUsers(roomId);
    }
  }, [roomId]);
  useEffect(() => {
    if (user) readUsers("");
  }, [user]);

  const handleUser = (val) => {
    setLiveRefresh(true)
    if (val.chatRoomID) {
      setRoomId(val.chatRoomID);
      setReceiverLiveStatus(val.live && val.live);
      if (user.userRoles[0] && user.userRoles[0] == "Student") {
        setReceiverId(val.employerId);
        setReceiverDisplayName(val.employerDisplayName);
      } else {
        setReceiverId(val.studentId);
        setReceiverDisplayName(val.studentDisplayName);
      }
      setChatDisabled(val.block);
      setStudentDisplayName(val.studentDisplayName);
      setEmployerDisplayName(val.employerDisplayName);
      getJobDetails(val.jobId);
      readMessage(val.chatRoomID);
      readUsers(val.chatRoomID);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search != "" && search.length > 0) {
      if (user && user.userRoles[0] && user.userRoles[0] == "Student") {
        const newUsers = users.filter((data) => {
          if (
            data.employerDisplayName
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return data;
          }
        });
        setUsers(newUsers);
      } else {
        const newUsers = users.filter((data) => {
          if (
            data.studentDisplayName.toLowerCase().includes(search.toLowerCase())
          ) {
            return data;
          }
        });
        setUsers(newUsers);
      }
    } else {
      readUsers();
    }
  };

  const handleCloseUser = async (roomId) => {
    var d1 = new Date().toISOString();
    const updates = {};
    updates["/block/"] = true;
    updates["/dateTime/"] = d1;
    console.log(updates, ":::");
    await update(ref(db, "User/" + roomId), updates);
    readUsers();
  };
  const handleDeleteUser = async (roomId) => {
    await remove(ref(db, "User/" + roomId));
    readUsers();
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

  useEffect(() => {
    console.log('qwer',users);
    setChatDisabled(users[0]?.block);
  }, [users]);

  return (
    <Layout>
      <div className="inner-page-wrapper chat-full-screen">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
          </div>
        </section>
        <section className="job-feeds-wrapper">

          {
            users?.length>0?
             <div className="container">
            <ChatInbox
              users={users}
              message={message}
              setMessage={setMessage}
              messages={messages}
              handleSubmit={handleSubmit}
              handleSubmitOnTextArea={handleSubmitOnTextArea}
              errors={errors}
              user={user}
              handleUser={handleUser}
              studentDisplayName={studentDisplayName}
              employerDisplayName={employerDisplayName}
              jobTitle={jobTitle}
              handleSearchSubmit={handleSearchSubmit}
              search={search}
              setSearch={setSearch}
              handleDeleteUser={handleDeleteUser}
              handleCloseUser={handleCloseUser}
              roomId={roomId}
              chatDisabled={chatDisabled}
              addEmoji={addEmoji}
              receiverDisplayName={receiverDisplayName}
            />
          </div>:<div className="container">

            <h2 > No user Found</h2>
            
          </div>
          }
        </section>
      </div>
    </Layout>
  );
};

export default Inbox;
