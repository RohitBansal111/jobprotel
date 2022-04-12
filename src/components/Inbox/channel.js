import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '../../assets/svg-icons/search'
import ClientAvtar from './../../assets/images/profile-img.jpg'


const channelList = [
    {name: 'Jaroslav Plotnikov', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'},
    {name: 'chris donlon', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'},
    {name: 'Eran Tenenboim', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'},
    {name: 'Jaroslav Plotnikov', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'},
    {name: 'Jaroslav Plotnikov', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'},
    {name: 'Jaroslav Plotnikov', clientId: 'room_1c45dbb9cb68109f507e2ee331594a4b', task: 'Simplify the existing HTML/CSS code in my static website', lastChat: 'Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?'}
]
const ClientChannel = () => {
  return (
    <div className='channel-list-wrapper'>
        <div className='client-search-box'>
            <input type="text" className="form-control" placeholder='Search' />
            <SearchIcon />
        </div>
        <ul>
            {
                channelList.map((item,index) => {
                    return(
                        <li key={index}>
                            <Link to={item.clientId}>
                                <div className='client-avtar'>
                                    <img src={ClientAvtar} alt="client" />
                                    <span style={{backgroundColor:'grey'}}></span>
                                </div>
                                <div className='client-info'>
                                    <h5>{item.name}</h5>
                                    <h5> {item.task} </h5>
                                    <p>{item.lastChat}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default ClientChannel