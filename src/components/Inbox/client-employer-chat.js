import React from 'react'
import ClientAvtar from '../../assets/images/client-avtar.jpeg'
import EmployeeAvtar from '../../assets/images/employer-avtar.jpeg'
import { timeAgo } from '../../helpers/timeFunction'
import ScrollToBottom from "react-scroll-to-bottom";

const ClientEmployerChat = ({messages,user}) => {
  console.log(messages,"messages")
  return (
    <ul>
     <ScrollToBottom>
      <>
      {messages &&
            messages.length > 0 &&
            messages.map((val) => (
               val.senderId === user._id ? (
                <li className='employer-chat'>
                  <div className='chat-avtar'>
                      <img src={process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
                  </div>
                  <div className='chat-full-desc'>
                    <h5> {val.displayName && val.displayName} <span>{timeAgo(val.dateTime)}</span></h5>
                    <p>{val.message && val.message}</p>
                  </div>
                </li>
                ):
                <li className='employer-chat'>
                  <div className='chat-avtar'>
                      <img src={process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
                  </div>
                  <div className='chat-full-desc'>
                    <h5> {val.displayName && val.displayName} <span>{timeAgo(val.dateTime)}</span></h5>
                    <p>{val.message && val.message}</p>
                  </div>
                </li>
               
               ))}
         </>      
     </ScrollToBottom>
    </ul>
  )
}

export default ClientEmployerChat