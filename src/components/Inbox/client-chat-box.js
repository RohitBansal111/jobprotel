import React from "react";
import EmojiIcon from "../../assets/svg-icons/emoji";
import LaunchIcon from "./../../assets/svg-icons/launch";
import ClientEmployerChat from "./client-employer-chat";


const ClientChatBoxSingle = ({ message, setMessage, messages, handleSubmit, errors, user, handleSubmitOnTextArea ,studentDisplayName,employerDisplayName,jobTitle}) => {
  return (
    <div className="channel-single-discussion">
      <div className="client-chatbox-header">
        <h5>
          {studentDisplayName && studentDisplayName},{employerDisplayName && employerDisplayName} <span>4:34PM</span>
        </h5>
        <p>{jobTitle && jobTitle}</p>
      </div>
      <div className="client-employer-chat">
        <ClientEmployerChat messages={messages} user={user} />
      </div>
      <div className="client-textarea-box">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            placeholder="Write a message..."
            value={message}
            onKeyDown={handleSubmitOnTextArea}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <span>{errors && errors.message && errors.message}</span>
          <div className="emoji-action">
            <div className="message-launch">
              {/* <button type="submit" className="btn emoji-icon">
                <EmojiIcon />
              </button> */}
              <button type="submit" className="btn">
                <LaunchIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientChatBoxSingle;
