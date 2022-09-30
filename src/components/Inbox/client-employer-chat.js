import React from 'react'
import ClientAvtar from '../../assets/images/demo.png'
import EmployeeAvtar from '../../assets/images/employer-avtar.jpeg'
import { timeAgo } from '../../helpers/timeFunction'
import ScrollToBottom from "react-scroll-to-bottom";

const ClientEmployerChat = ({messages,user,receiverDisplayName}) => {
  return (
    <ScrollToBottom>
      <ul>
        {messages &&
            messages.length > 0 &&
            messages.map((val) => (
               val.sender == user.id ? (
                <li className='employer-chat rightChat'>
                  {console.log(
                      "qqqqq",
                      val.userImage
                    )}
                  <div className='chat-full-desc'>
                    <h5> {user?.fullName} </h5>
                    <p>{val.message && val.message}</p>
                    <span>{timeAgo(val.dateTime)}</span>
                  </div>
                  <div className='chat-avtar'>
                      <img src={ val?.userImage ==undefined?ClientAvtar :   process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
                  </div>
                </li>
                ):
                <li className='employer-chat leftChat'>
                  <div className='chat-avtar'>
                      <img src={ val?.userImage ==undefined? ClientAvtar: process.env.REACT_APP_IMAGE_API_URL+val.userImage} alt="User" />
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