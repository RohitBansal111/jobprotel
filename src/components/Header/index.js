import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './../../assets/images/inner-logo.png';
import Notification from './../../assets/icons/notification-ico.png'
import userAvtar from './../../assets/images/user-img.jpg';

const Header = () => {
     const [mobileMenu, setmobileMenu] = useState('')
     const menuToggle = () =>{
          setmobileMenu('navbar-mobile')
          if(mobileMenu === 'navbar-mobile'){
               setmobileMenu('')
          }
     }
     return (
          <header id="header" className="header header-scrolled">
               <div className="container d-flex align-items-center justify-content-between">
                    <div className="inner-logo">
                         <Link to="#" className="logo d-flex align-items-center">
                              <img src={Logo} alt="Real Job" />
                         </Link>
                    </div>
                    <div className="right-side-nav">
                         <nav id="navbar" className={`navbar ${mobileMenu}`}>
                              <ul>
                                   <li><NavLink className="nav-link scrollto" to="/job-feeds" activeclassname="active-link">Find Work</NavLink></li>
                                   <li><NavLink className="nav-link scrollto" to="/my-applications" activeclassname="active-link">My Applications</NavLink></li>
                                   <li><NavLink className="nav-link scrollto" to="/invites" activeclassname="active-link">Invites</NavLink></li>
                                   <li><NavLink className="nav-link scrollto" to="/inbox" activeclassname="active-link">Inbox</NavLink></li>
                              </ul>
                              <button type="button" onClick={menuToggle} className="btn mobile-nav-toggle">
                                   <i className="fa fa-bars" aria-hidden="true"></i>
                                   <i className="fa fa-times" aria-hidden="true"></i>
                              </button>
                         </nav>
                         <div className="head-notification">
                              <span className="notification-ico">
                                   <Link to="#">
                                        <img src={Notification} alt="Notification" />
                                        <span className="n-alert"></span>
                                   </Link>
                              </span>
                         </div>
                         <div className="signin-user">
                              <div className="dropdown">
                                   <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                   Michael T <img src={userAvtar} alt="User Profile" />
                                   </button>
                                   <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="#">Dashboard</Link></li>
                                        <li><Link className="dropdown-item" to="#">Setting</Link></li>
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>
          </header>
     )
}

export default Header
