import React, { useState } from "react";
import EmojiIcon from "../../assets/svg-icons/emoji";
import LaunchIcon from "./../../assets/svg-icons/launch";
import ClientEmployerChat from "./client-employer-chat";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const ClientChatBoxSingle = ({ message, setMessage, messages, handleSubmit, errors, user, handleSubmitOnTextArea ,studentDisplayName,employerDisplayName,jobTitle,chatDisabled,addEmoji,receiverDisplayName}) => {
  const [showEmoji, setShowEmoji] = useState(false)
  const handleEmoji = () => setShowEmoji(!showEmoji)
  const handleCloseEmoji = () => setShowEmoji(false)
  console.warn(chatDisabled)
  return (
    <div className="channel-single-discussion">
      <div className="client-chatbox-header">
        <h5>
          {studentDisplayName && studentDisplayName},{employerDisplayName && employerDisplayName} 
        </h5>
        <p>{jobTitle.slice(0, 30) + (jobTitle.length > 30 ? "..." : "")  }</p>
      </div>
      <div className="client-employer-chat">
        <ClientEmployerChat messages={messages} user={user} receiverDisplayName={receiverDisplayName}/>
      </div>
      <div className="client-textarea-box">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            placeholder="Write a message..."
            value={message}
            // onKeyDown={handleSubmitOnTextArea}
            onChange={(e) => setMessage(e.target.value)}
            disabled={chatDisabled}
          ></textarea>
          <span>{errors && errors.message && errors.message}</span>
          <button type="button" onClick={handleEmoji} className="emoji-button"  disabled={chatDisabled}>😄</button>
          {
            showEmoji &&
            <div className="emoji-action">
              <div className="message-launch">
              <button type="button" onClick={handleCloseEmoji} className="close-emoji">✕</button>
              <Picker data={data} onEmojiSelect={addEmoji} />
              </div>
            </div>
          }
          <button type="submit" className="btn-submit"  disabled={chatDisabled}>
            <LaunchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientChatBoxSingle;
