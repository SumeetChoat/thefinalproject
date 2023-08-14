import { useState } from "react";
import {
    useAuth,
    useMessages,
    useFriends
} from "../../contexts";

function MessagesModal() {

    const [content,setContent] = useState('')

    function handleChange(e) {
        setContent(e.target.value)
    }

    return(
        <div className="messages-container">
            
            <input className="message-input" value={content} onChange={handleChange} />
            <button className="send-btn">
                Send
            </button>
        </div>
    )
}

export default MessagesModal

