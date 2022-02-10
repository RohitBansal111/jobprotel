import { Link } from "react-router-dom"
import JobCard from "../../../components/Job-card"
import Layout from "../../../components/Layout"
import UserAvtar from './../../../assets/images/profile-img.jpg'
import ConnectIcon from './../../../assets/icons/connect.png'
import Filtericon from './../../../assets/icons/filter-ico.png'
import CompleteKycModal from "../../../components/Common/CompleteKycModal"



const EmployerInbox = () => {
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner">
                              </div>
                         </div>
                    </section>
                    <section className="job-feeds-wrapper">
                         <div className="container">
                              <h3 className="text-white">Chat Inbox</h3>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default EmployerInbox
