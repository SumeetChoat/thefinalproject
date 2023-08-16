import { useEffect, useState } from "react";
import {
    useAuth,
    useMessages,
    useFriends
} from "../../contexts";
import {socket} from '../../socket';

function MessagesModal({handleClose, decline, envelope}) {
    const {messages, friendRecipient} = useMessages()
    const {user} = useAuth()
    const [content,setContent] = useState('')

    function handleChange(e) {
        setContent(e.target.value)
    }

    const [friendsMessages, setFriendsMessages] = useState([])

    function filterMessages() {
        setFriendsMessages(messages.map((m) => {
            if((m.sender == user.username && m.recipient == friendRecipient.username) || (m.sender == friendRecipient.username && m.recipient == user.username)){
                return m
            }
        }))     
    }

    useEffect(() => {
        if(user && messages && friendRecipient){
            filterMessages()
        }
    },[messages, friendRecipient])


    function sendMessage() {
        console.log('sending ',content)
        socket.emit("message", {"sender":user.username, "recipient":friendRecipient.username, "type":"msg", "content":content});
        
    }

    return(
        <>
        <div className="messages-header">
            <span className="friend-recipient-username">
                {friendRecipient ? friendRecipient.username : "friend"}
            </span>
            <button className="close-modal-btn" onClick={handleClose}>
                <div className="btn-icon" dangerouslySetInnerHTML={{__html: decline}} />
            </button>
        </div>
        <div className="messages-container">
            <div className="chat-container">
                <ul className="chat-history">
                {friendsMessages && user && friendsMessages.length > 0 ?
                friendsMessages.map((msg,i) => {
                    if (msg){
                    return (<div className="message-container" key={i}>
                        {msg.sender == user.username ? 
                        <li className="sent-message">
                        <div className="msg-content">
                            <p>{msg.content}</p></div>
                        </li>
                        :
                        <li className="received-message">
                        <div className="msg-content"><p>{msg.content}</p></div>
                        </li>
                        }
                    </div>)
                    }
                })
                :
                <li></li>
                }
                </ul>
            </div>
            <input className="message-input" placeholder="Enter your message" value={content} onChange={handleChange} />
            <button className="send-btn" onClick={()=>sendMessage()}>
                <div className="btn-icon" dangerouslySetInnerHTML={{__html: envelope}}/>
            </button>
        </div>
        </>
    )
}

export default MessagesModal

