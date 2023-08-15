import { useState } from "react";
import {
    useAuth,
    useMessages,
    useFriends
} from "../../contexts";

function MessagesModal({handleClose, showMessages}) {
    const {messages, friendRecipient} = useMessages()
    const {user} = useAuth()
    const [content,setContent] = useState('')

    function handleChange(e) {
        setContent(e.target.value)
    }

    function sendMessage() {
        console.log('sending ',content)
    }

    return(
        <>
        <div className="messages-header">
            <div className="messages-friend-name">
                {friendRecipient ? friendRecipient.username : "friend"}
            </div>

            <div className="close-modal-btn">
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
        <div className="messages-container">
            <div className="chat-container">
                <ul className="chat-history">
                {messages && messages.length > 0 ?
                messages.map(msg => {
                    (<div className="message-container" key={msg.id}>
                        {msg.sender == user.username ? 
                        <li className="sent-message">
                        <div className="msg-content">user's sent message</div>
                        </li>
                        :
                        <li className="received-message">
                        <div className="msg-content">user's received message</div>
                        </li>
                        }
                    </div>)
                })
                :
                ""
                }
                </ul>
            </div>
            <input className="message-input" placeholder="Enter your message" value={content} onChange={handleChange} />
            <button className="send-btn" onClick={()=>sendMessage()}>
                Send
            </button>
        </div>
        </>
    )
}

export default MessagesModal

