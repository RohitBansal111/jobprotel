import Layout from "../../components/Layout"
import ChatInbox from "../../components/Inbox/ChatInbox"



const Inbox = () => {
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner"></div>
                         </div>
                    </section>
                    <section className="job-feeds-wrapper">
                         <div className="container">
                              <ChatInbox />
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default Inbox
