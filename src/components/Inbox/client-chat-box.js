import React from "react";
import EmojiIcon from "../../assets/svg-icons/emoji";
import LaunchIcon from "./../../assets/svg-icons/launch";
import ClientEmployerChat from "./client-employer-chat";

const ClientChatBoxSingle = () => {
  return (
    <div className="channel-single-discussion">
      <div className="client-chatbox-header">
        <h5>
          Steve Katz, Eran Tenenboim <span>4:34PM</span>
        </h5>
        <p>Fixing some issues on Figma</p>
      </div>
      <div className="client-employer-chat">
        <ClientEmployerChat />
      </div>
      <div className="client-textarea-box">
        <form>
          <textarea
            className="form-control"
            placeholder="Write a message..."
          ></textarea>
          <div className="emoji-action">
            <div className="message-launch">
              <button type="submit" className="btn emoji-icon">
                <EmojiIcon />
              </button>
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
