import ClientChannel from "./channel"
import ClientChatBoxSingle from "./client-chat-box"

const ChatInbox = () => (
    <div className="client-chat-wrapper">
        <div className="row m-0">
            <div className="col-12 col-md-4 p-0">
                <ClientChannel />
            </div>
            <div className="col-12 col-md-8 p-0">
                <ClientChatBoxSingle />
            </div>
        </div>
    </div>
)

export default ChatInbox
