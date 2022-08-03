import ClientChannel from "./channel";
import ClientChatBoxSingle from "./client-chat-box";

const ChatInbox = ({ users, message, setMessage, handleSubmit, errors, messages, user, handleSubmitOnTextArea, handleUser, studentDisplayName, employerDisplayName ,jobTitle,handleSearchSubmit,search,setSearch,handleDeleteUser,handleCloseUser,roomId,chatDisabled,addEmoji,receiverDisplayName}) => {


    return (
        <div className="client-chat-wrapper">
            <div className="row m-0">
                <div className="col-12 col-md-3 p-0">
                    <ClientChannel 
                    users={users} 
                    handleUser={handleUser} 
                    user={user}
                    handleSearchSubmit={handleSearchSubmit}
                    search={search}
                    setSearch={setSearch}
                    handleDeleteUser={handleDeleteUser}
                    handleCloseUser={handleCloseUser}
                    roomId={roomId}
                    chatDisabled={chatDisabled}
                    />
                </div>
                <div className="col-12 col-md-9 p-0">
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
                        chatDisabled={chatDisabled}
                        addEmoji={addEmoji}
                        receiverDisplayName={receiverDisplayName}
                    />
                </div>
            </div>
        </div>
  );
};

export default ChatInbox;
