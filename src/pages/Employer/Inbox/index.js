import Layout from "../../../components/Layout";
import ChatInbox from "../../../components/Inbox/ChatInbox";

const EmployerInbox = () => {
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="chat-feeds-wrapper">
          <div className="container-fluid p-0">
            <ChatInbox />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmployerInbox;
