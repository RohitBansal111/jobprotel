import Layout from "../../components/Layout"
import ChatInbox from "../../components/Inbox/ChatInbox"
import React, { useEffect, useState } from "react";
import * as studentServices from "../../services/studentServices";
import * as employerServices from "../../services/employerServices";
import * as jobServices from "../../services/jobServices";
import { useSelector } from "react-redux";
import app from "../../helpers/firebase";
import { getDatabase, ref, set, onValue, child, query, equalTo, orderByValue, get, update } from "@firebase/database";
import { useParams } from "react-router";


const Inbox = () => {

     const db = getDatabase(app);
     const [chatRoomState, setChatRoomState] = useState([]);
     const [receiverState, setReceiverState] = useState([]);
     const [roomId, setRoomId] = useState("");
     const [studentId, setStudentId] = useState("");
     const [employerId, setEmployerId] = useState("");
     const [receiverId, setReceiverId] = useState("");
     const [employerDisplayName, setEmployerDisplayName] = useState("");
     const [employerUserImage, setEmployerUserImage] = useState("")
     const [studentDisplayName, setStudentDisplayName] = useState("");
     const [studentUserImage, setStudentUserImage] = useState("")
     const user = useSelector((state) => state.auth.user);
     const [message, setMessage] = useState("");
     const [messages, setMessages] = useState([]);
     const [errors, setErrors] = useState({});
     const [users, setUsers] = useState([]);
     const [jobTitle, setJobTitle] = useState("");
     const [search, setSearch] = useState("");
     const [jobIdd, setJobIdd] = useState("");
     const { userId, jobId } = useParams();


     useEffect(async () => {
          console.log(user, "user")
          if (user && userId && jobId) {
               setReceiverId(userId);
               getJobDetails(jobId);
               if (user.userRoles[0] === "Student") {
                    const rid = user.id + '_' + userId;
                    setRoomId(rid);
                    const resp = await getEmployerDetails(userId);
                    if (resp.status == 200) {
                         setStudentDisplayName(user?.fullName);
                         setStudentUserImage(user.studentDetails.pictureUrl)
                         setEmployerDisplayName(resp.data.data.fullName);
                         setEmployerUserImage(resp.data.data.comapanyDetail.logoPath)
                         setStudentId(user.id)
                         setEmployerId(resp.data.data.id)
                         //call function
                         addUser(rid, user.fullName, user.studentDetails.pictureUrl, resp.data.data.fullName, resp.data.data.comapanyDetail.logoPath, user.id, resp.data.data.id)
                    }
               } else {
                    const rid = userId + '_' + user.id;
                    setRoomId(rid);
                    const resp = await getStudentDetails(user.id);
                    if (resp.status == 200) {

                         setStudentDisplayName(resp.data.data.fullName);
                         setStudentUserImage(resp.data.data.studentDetails.pictureUrl)
                         setEmployerDisplayName(user.fullName);
                         setEmployerUserImage(user.comapanyDetail.logoPath)
                         setStudentId(resp.data.data.id)
                         setEmployerId(user.id)
                         addUser(rid, resp.data.data.fullName, resp.data.data.studentDetails.pictureUrl, user.fullName, user.comapanyDetail.logoPath, userId, user.id)
                    }
               }
          }
     }, [user, userId, jobId])

     const getStudentDetails = async (id) => {
          const resp = await studentServices.getStudentDetails(id);
          return resp
     }

     const getJobDetails = async (jobId) => {
          const resp = await jobServices.getJobByJobId(jobId);
          if (resp.status == 200) {
               console.log(resp.data.data,"jobdetails")
               setJobTitle(resp?.data?.data?.title)
            }
     }

     const getEmployerDetails = async (id) => {
          const resp = await employerServices.getEmployerDetails(id);
          return resp
     }
     const addUser = (roomId, studentDisplayName, studentUserImage, employerDisplayName, employerUserImage, studentId, employerId) => {
          console.log(studentDisplayName, studentUserImage, employerDisplayName, employerUserImage)
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
               jobId: jobId

          });
          readUsers()

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
               userImage: user && user.userRoles[0] && user.userRoles[0] == "Student" ? user.studentDetails?.pictureUrl : user?.comapanyDetail?.logoPath,
               jobId: jobId?jobId:jobIdd?jobIdd:undefined

          });

          //update last message
          const updates = {};
          updates['/message/'] = message;

          await update(ref(db, "User/" + roomId), updates);
          readMessage(roomId)

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
          let rid = (id) ? id : roomId;
          let deleteData = true;
          const starCountRef = ref(db, "ChatRoom/" + rid);
          console.log(starCountRef, "helloo")
          onValue(starCountRef, (snapshot) => {
               const data = snapshot.val();
               console.log(data, 'hello02')
               if (data) {
                    const convertedData = Object.keys(data).map(d => {
                         return data[d];
                    })
                    setMessages(convertedData)
               }
               else {
                    setMessages([]);

               }
          });


     };

     const readUsers = async () => {

          //get user roomes
          // const starUserRef = query( ref(db, "User/" + rid ),orderByValue("dateTime"),equalTo(user.id));
          const starUserRef = ref(db, "User");
          //const refData= ref.order().equalTo(user.id, 'studentId');
          onValue(starUserRef, (snapshot) => {
               const data = snapshot.val();
               console.log(data, 'data24')
               if (data) {
                    if (user.userRoles[0] == 'Student') {
                         //setUsers(current => [...current, data]);
                         const convertedData = Object.keys(data).map(d => {
                              return data[d];
                         })

                         const finalData = convertedData.filter((data) => data.studentId == user.id)
                         
                         if(!roomId)
                         {    
                              setRoomId(finalData[0]?.chatRoomID);
                              setJobIdd(finalData[0]?.jobId)
                              setStudentDisplayName(finalData[0]?.studentDisplayName)
                              setEmployerDisplayName(finalData[0]?.employerDisplayName)
                              getJobDetails(finalData[0]?.jobId)
                              if(user && user.userRoles[0] && user.userRoles[0] == "Student")
                              {
                                   setReceiverId(finalData[0]?.employerId)
                              }else{
                                   setReceiverId(finalData[0]?.studentId)
                              }
                         }
                         setUsers(finalData)

                    } else {
                         //setUsers(current => [...current, data]);
                         const convertedData = Object.keys(data).map(d => {
                              return data[d];
                         })
                         const finalData = convertedData.filter((data) => data.employerId == user.id)
                         if(!roomId)
                         {
                              setRoomId(finalData[0]?.chatRoomID)
                              setJobIdd(finalData[0]?.jobId)
                              setStudentDisplayName(finalData[0]?.studentDisplayName)
                              setEmployerDisplayName(finalData[0]?.employerDisplayName)
                              getJobDetails(finalData[0]?.jobId)
                              if(user && user.userRoles[0] && user.userRoles[0] == "Student")
                              {
                                   setReceiverId(finalData[0]?.employerId)
                              }else{
                                   setReceiverId(finalData[0]?.studentId)
                              }
                         }
                         setUsers(finalData)

                    }

               }
               else {
                    setUsers([]);

               }
          });

     };

     useEffect(() => {
          if (roomId) {
               readMessage(roomId);
               //readUsers(roomId);
          }
     }, [roomId]);
     useEffect(() => {
          readUsers();
          
     }, [user]);

     const handleUser = (val) => {
               setRoomId(val.chatRoomID);
               if(user.userRoles[0] && user.userRoles[0] == "Student")
               {
                    setReceiverId(val.employerId);
               }else{
                    setReceiverId(val.studentId);
               }
               setStudentDisplayName(val.studentDisplayName)
               setEmployerDisplayName(val.employerDisplayName)
               getJobDetails(val.jobId);
               readMessage(val.chatRoomID);
          
     }

     const handleSearchSubmit =()=>{

     }


     console.log(users, "users")
     return (
          <Layout>
               <div className="inner-page-wrapper chat-full-screen">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner"></div>
                         </div>
                    </section>
                    <section className="job-feeds-wrapper">
                         <div className="container">
                              <ChatInbox users={users}
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
                                   />
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default Inbox
