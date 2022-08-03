import Layout from "../../components/Layout";
import ChatInbox from "../../components/Inbox/ChatInbox";
import React, { useEffect, useState } from "react";
import * as studentServices from "../../services/studentServices";
import * as employerServices from "../../services/employerServices";
import * as jobServices from "../../services/jobServices";
import { useSelector } from "react-redux";
import app from "../../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue, child, query, equalTo, orderByChild, get, update ,remove} from "@firebase/database";
import { Navigate, useParams } from "react-router";

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
     const [chatDisabled, setChatDisabled] = useState(false)
     const [roomStatus, setRoomStatus] = useState(false)
     const { userId, jobId } = useParams();
     
     const navigate = useNavigate();

     useEffect(async () => {
          console.log(user, "user")
          if (user && userId && jobId) {
               setReceiverId(userId);
               getJobDetails(jobId);
               if (user.userRoles[0] === "Student") {
                    const rid = user.id + '_' + userId + '_'+jobId;
                    setRoomId(rid); console.log("aman12")
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
                         navigate("/inbox")
                    }
               } else {
                    const rid = userId + '_' + user.id + '_'+ jobId;
                    setRoomId(rid);console.log("aman13")
                    const resp = await getStudentDetails(user.id);
                    if (resp.status == 200) {

                         setStudentDisplayName(resp.data.data.fullName);
                         setStudentUserImage(resp.data.data.studentDetails.pictureUrl)
                         setEmployerDisplayName(user.fullName);
                         setEmployerUserImage(user.comapanyDetail.logoPath)
                         setStudentId(resp.data.data.id)
                         setEmployerId(user.id)
                         addUser(rid, resp.data.data.fullName, resp.data.data.studentDetails.pictureUrl, user.fullName, user.comapanyDetail.logoPath, userId, user.id)
                         navigate("/inbox")
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
               jobId: jobId,
               block:false

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
          updates['/dateTime/'] = d1;

          await update(ref(db, "User/" + roomId), updates);
          readMessage(roomId)
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
          readUsers(roomId);

     };

     const readUsers = async (roomId) => {
          
          //get user roomes
          // const starUserRef = query( ref(db, "User/" + rid ),orderByValue("dateTime"),equalTo(user.id));
          const starUserRef = query(ref(db, "User"),orderByChild('dateTime'));
          //const refData= ref.order().equalTo(user.id, 'studentId');
          onValue(starUserRef, (snapshot) => {
               const data = snapshot.val();
               console.log(data, 'data24')
               if (data) { console.log(roomId,"aman67")
                    updateUsers(data,roomId)

               }
               else {
                    setUsers([]);
                    //setRoomId("")
                    setJobIdd("")
                    setStudentDisplayName("")
                    setEmployerDisplayName("")
                    getJobDetails("")
                    setMessages([])

               }
          });

     };

     ;
     const updateUsers =(data,roomId)=>{
          
          if (user.userRoles[0] == 'Student') {
               const convertedData = Object.keys(data).map(d => {
                    return data[d];
               })
               let finalData = convertedData.filter((data) => data.studentId == user.id)
               const sortByDate = finalData => {
                    const sorter = (a, b) => {
                       return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                    }
                    finalData.sort(sorter);
                 }
               sortByDate(finalData)
               if(finalData.length > 0)
               {
               if(!roomId && !roomStatus)
               {    
                    setRoomStatus(true)
                    setRoomId(finalData[0]?.chatRoomID);
                    setJobIdd(finalData[0]?.jobId)
                    setStudentDisplayName(finalData[0]?.studentDisplayName)
                    setEmployerDisplayName(finalData[0]?.employerDisplayName)
                    getJobDetails(finalData[0]?.jobId)
                    setChatDisabled(finalData[0]?.block)
                    if(user && user.userRoles[0] && user.userRoles[0] == "Student")
                    {
                         setReceiverId(finalData[0]?.employerId)
                    }else{
                         setReceiverId(finalData[0]?.studentId)
                    }
                    
               }
               setUsers(finalData)
               }
               

          } else {
               //setUsers(current => [...current, data]);
               const convertedData = Object.keys(data).map(d => {
                    return data[d];
               })
               const finalData = convertedData.filter((data) => data.employerId == user.id)
               const sortByDate = finalData => {
                    const sorter = (a, b) => {
                       return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                    }
                    finalData.sort(sorter);
                 }
               sortByDate(finalData)
               console.log("finalData",finalData,user)
               if(!roomId && !roomStatus)
               {
                    setRoomStatus(true)
                    setRoomId(finalData[0]?.chatRoomID); console.log("aman17")
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

     useEffect(() => {
          if (roomId) {
               readMessage(roomId);
               //readUsers(roomId);
          }
     }, [roomId]);
     useEffect(() => {
          if(user)readUsers("");
          
          
     }, [user]);

     const handleUser = (val) => { console.log("handleuser")
     if(val.chatRoomID){
               setRoomId(val.chatRoomID); console.log("aman18")
               console.log(val.chatRoomID,"aman19")
               if(user.userRoles[0] && user.userRoles[0] == "Student")
               {
                    setReceiverId(val.employerId);
               }else{
                    setReceiverId(val.studentId);
               }
               setChatDisabled(val.block)
               setStudentDisplayName(val.studentDisplayName)
               setEmployerDisplayName(val.employerDisplayName)
               getJobDetails(val.jobId);
               readMessage(val.chatRoomID);
               readUsers(val.chatRoomID);
          }
          
     }

     const handleSearchSubmit =(e)=>{
          e.preventDefault()
          if(search !='' && search.length > 0)
          {
               if(user && user.userRoles[0] && user.userRoles[0] == "Student")
               {
                   
                    const newUsers = users.filter((data)=>{
                        if(data.employerDisplayName.toLowerCase().includes(search.toLowerCase()))
                        {
                         return data;
                        }
                    })
                    setUsers(newUsers)
               }else{
                    const newUsers = users.filter((data)=>{
                         if(data.studentDisplayName.toLowerCase().includes(search.toLowerCase()))
                         {
                          return data;
                         }
                     })
                     setUsers(newUsers)
               }
               
          }else{
               readUsers();
          }
            
     }

     const handleCloseUser =async(roomId)=>{
          //update last message
          console.log("close")
          const updates = {};
          updates['/block/'] = true;

          await update(ref(db, "User/" + roomId), updates);
          readUsers();
     }
     const handleDeleteUser =async(roomId)=>{
         console.log("roomId23",roomId)
          await remove(ref(db, "User/" + roomId));
          readUsers();
     }

      const addEmoji = e => {
          let sym = e.unified.split('-')
          let codesArray = []
          sym.forEach(el => codesArray.push('0x' + el))
          let emoji = String.fromCodePoint(...codesArray)
          setMessage(message+emoji)
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
                                   handleDeleteUser={handleDeleteUser}
                                   handleCloseUser={handleCloseUser}
                                   roomId={roomId}
                                   chatDisabled={chatDisabled}
                                   addEmoji={addEmoji}
                                   />
                         </div>
                    </section>
               </div>
          </Layout>
     )
}



export default Inbox;
