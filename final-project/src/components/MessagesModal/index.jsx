import { useState } from "react";
import {
    useAuth,
    useMessages,
    useFriends
} from "../../contexts";

function MessagesModal({handleClose, decline, envelope}) {
    const {messages, friendRecipient} = useMessages()
    const {user} = useAuth()
    const [content,setContent] = useState('')

    // let friendRecipient1 = {"username": 'student1'}

    let messages1 = [
        {
            "sender":"student1",
            "recipient":"student2",
            "content": "hi"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student1",
            "recipient":"student2",
            "content": "hi2"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student2",
            "recipient":"student1",
            "content": "hello"
        },
        {
            "sender":"student1",
            "recipient":"student2",
            "content": "hi2"
        },
    ]

    function handleChange(e) {
        setContent(e.target.value)
    }

    function sendMessage() {
        console.log('sending ',content)
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
                {messages1 && user && messages1.length > 0 ?
                messages1.map((msg,i) => {
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
                })
                :
                <li>"no messages"</li>
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

