import { useEffect, useState } from "react";
import { useAuth, useMessages, useFriends } from "../../contexts";
import { socket } from "../../socket";

function MessagesModal({ handleClose, decline, envelope, sendButton }) {
  const { messages, friendRecipient } = useMessages();
  const { user } = useAuth();
  const [content, setContent] = useState("");

  function handleChange(e) {
    setContent(e.target.value);
  }

  const [friendsMessages, setFriendsMessages] = useState([]);

  function filterMessages() {
    setFriendsMessages(
      messages.filter((m) => {
        if (
          (m.sender == user.username &&
            m.recipient == friendRecipient.username) ||
          (m.sender == friendRecipient.username && m.recipient == user.username)
        ) {
          return m;
        }
      })
    );
  }

  useEffect(() => {
    if (user && messages && friendRecipient) {
      filterMessages();
    }
  }, [messages, friendRecipient]);

  function sendMessage() {
    console.log("sending ", content);
    socket.emit("message", {
      sender: user.username,
      recipient: friendRecipient.username,
      type: "msg",
      content: content,
    });
    setContent("");
  }

  return (
    <>
      <div className="messages-header">
        <span className="friend-recipient-username">
          {friendRecipient ? friendRecipient.username : "friend"}
        </span>
        <button className="close-modal-btn" onClick={handleClose}>
          <div
            className="btn-icon"
            dangerouslySetInnerHTML={{ __html: decline }}
          />
        </button>
      </div>
      <div className="">
        <div className="chat-container">
          <ul className="chat-history">
            {friendsMessages && user && friendsMessages.length > 0 ? (
              friendsMessages.map((msg, i) => {
                console.log(msg);
                if (msg) {
                  console.log(msg);
                  return (
                    <div className="message-container" key={i}>
                      {i === 0 ||
                      msg.time_sent.slice(0, 10) !==
                        friendsMessages[i - 1].time_sent.slice(0, 10) ? (
                        <p className="sent-date">
                          {msg.time_sent.slice(0, 10)}
                        </p>
                      ) : (
                        ""
                      )}
                      {msg.sender == user.username ? (
                        <li className="sent-message">
                          <span className="time-sent">
                            {msg.time_sent.slice(11, 16)}
                          </span>
                          <div className="msg-content sent">
                            <p>{msg.content}</p>
                          </div>
                        </li>
                      ) : (
                        <li className="received-message">
                          <div className="msg-content receive">
                            <p>{msg.content}</p>
                          </div>
                          <span className="time-sent">
                            {msg.time_sent.slice(11, 16)}
                          </span>
                        </li>
                      )}
                    </div>
                  );
                }
              })
            ) : (
              <li></li>
            )}
          </ul>
        </div>
        <div className="message-input-section">
          <textarea
            className="message-input"
            placeholder="Enter your message"
            value={content}
            onChange={handleChange}
          />
          <button className="send-btn" onClick={() => sendMessage()}>
            <div
              className="btn-icon"
              dangerouslySetInnerHTML={{ __html: sendButton }}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default MessagesModal;
