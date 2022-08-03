import React from 'react'
import ClientAvtar from '../../assets/images/client-avtar.jpeg'
import EmployeeAvtar from '../../assets/images/employer-avtar.jpeg'
import { timeAgo } from '../../helpers/timeFunction'
import ScrollToBottom from "react-scroll-to-bottom";

const ClientEmployerChat = ({messages,user,receiverDisplayName}) => {
  console.log(messages,"messages")
  return (
    <ScrollToBottom>
      <ul>
        {messages &&
            messages.length > 0 &&
            messages.map((val) => (
               val.sender == user.id ? (
                <li className='employer-chat rightChat'>
                  <div className='chat-full-desc'>
                    <h5> {user?.fullName} </h5>
                    <p>{val.message && val.message}</p>
                    <span>{timeAgo(val.dateTime)}</span>
                  </div>
                  <div className='chat-avtar'>
                      <img src={process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
                  </div>
                </li>
                ):
                <li className='employer-chat leftChat'>
                  <div className='chat-avtar'>
                      <img src={process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
                  </div>
                  <div className='chat-full-desc'>
                    <h5> {receiverDisplayName && receiverDisplayName} </h5>
                    <p>{val.message && val.message}</p>
                    <span>{timeAgo(val.dateTime)}</span>
                  </div>
                </li>
               
               ))}  
      </ul>
    </ScrollToBottom>
  )
}

export default ClientEmployerChat