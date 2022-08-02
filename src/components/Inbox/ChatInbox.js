import ClientChannel from "./channel"
import ClientChatBoxSingle from "./client-chat-box"

const ChatInbox = ({ users, message, setMessage, handleSubmit, errors, messages, user, handleSubmitOnTextArea, handleUser, studentDisplayName, employerDisplayName ,jobTitle}) => {


    return (
        <div className="client-chat-wrapper">
            <div className="row m-0">
                <div className="col-12 col-md-4 p-0">
                    <ClientChannel users={users} handleUser={handleUser} user={user}/>
                </div>
                <div className="col-12 col-md-8 p-0">
                    <ClientChatBoxSingle
                        message={message}
                        setMessage={setMessage}
                        messages={messages}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        user={user}
                        handleSubmitOnTextArea={handleSubmitOnTextArea}
                        studentDisplayName={studentDisplayName}
                        employerDisplayName={employerDisplayName}
                        jobTitle={jobTitle}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatInbox
