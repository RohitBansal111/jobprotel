import React from 'react'
import ClientAvtar from '../../assets/images/client-avtar.jpeg'
import EmployeeAvtar from '../../assets/images/employer-avtar.jpeg'

const ClientEmployerChat = () => {
  return (
    <ul>
      <li className='client-chat'>
        <div className='chat-avtar'>
            <img src={ClientAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5>Jaroslav Plotnikov <span>03:07 AM</span></h5>
          <p>Thanks for reaching out!</p> 
          <p>Hi, are you available today for 4-5 of hours to work on this (together with me with share screen) and finish?</p>
        </div>
      </li>
      <li className='employer-chat'>
        <div className='chat-avtar'>
            <img src={EmployeeAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5> Ranjit Singh <span>12:07 PM</span></h5>
          <p>Hello Jaroslav</p> 
          <p>I have checked your reference site and below 3 required pages.</p>
          <p>So it's minimum 12-15hr job</p>
          <p>My fixed price is $120 or you can suggest as per your work and budget. Thanks</p>
        </div>
      </li>
      <li className='client-chat'>
        <div className='chat-avtar'>
            <img src={ClientAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5>Jaroslav Plotnikov <span>03:07 AM</span></h5>
          <p>Thanks for reaching out!</p> 
          <p>Hi, are you available today for 4-5 of hours to work on this (together with me with share screen) and finish?</p>
        </div>
      </li>
      <li className='employer-chat'>
        <div className='chat-avtar'>
            <img src={EmployeeAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5> Ranjit Singh <span>12:07 PM</span></h5>
          <p>Hello Jaroslav</p> 
          <p>I have checked your reference site and below 3 required pages.</p>
          <p>So it's minimum 12-15hr job</p>
          <p>My fixed price is $120 or you can suggest as per your work and budget. Thanks</p>
        </div>
      </li>
      <li className='client-chat'>
        <div className='chat-avtar'>
            <img src={ClientAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5>Jaroslav Plotnikov <span>03:07 AM</span></h5>
          <p>Thanks for reaching out!</p> 
          <p>Hi, are you available today for 4-5 of hours to work on this (together with me with share screen) and finish?</p>
        </div>
      </li>
      <li className='employer-chat'>
        <div className='chat-avtar'>
            <img src={EmployeeAvtar} alt="User" />
        </div>
        <div className='chat-full-desc'>
          <h5> Ranjit Singh <span>12:07 PM</span></h5>
          <p>Hello Jaroslav</p> 
          <p>I have checked your reference site and below 3 required pages.</p>
          <p>So it's minimum 12-15hr job</p>
          <p>My fixed price is $120 or you can suggest as per your work and budget. Thanks</p>
        </div>
      </li>
    </ul>
  )
}

export default ClientEmployerChat