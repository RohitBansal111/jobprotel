import ClientChannel from "./channel";
import ClientChatBoxSingle from "./client-chat-box";

const ChatInbox = ({ users }) => {
  return (
    <div className="client-chat-wrapper">
      <div className="row m-0">
        <div className="col-12 col-md-4 p-0">
          <ClientChannel users={users} />
        </div>
        <div className="col-12 col-md-8 p-0">
          <ClientChatBoxSingle />
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;
