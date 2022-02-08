import ChatBox from "../../components/Inbox/ChatBox"
import Layout from "../../components/Layout"



const Inbox = () => {
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
                              <div className="chat-boot-react">
                                   <ChatBox />
                              </div>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default Inbox
