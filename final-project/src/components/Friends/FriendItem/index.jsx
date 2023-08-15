import { useState } from "react"
import { useFriends } from "../../../contexts"
import '../../../pages/profilePage/styles.css'

function FriendItem({friend, trash, message, add, setShowMessages}){
    const {friends,setFriends} = useFriends()

    function deleteFriend(friend){
         if (confirm(`Are you sure you want to remove ${friend.username} as a friend?`)==true) {
            setFriends(
                friends.filter(f => f.username != friend.username)
            )
         }
    }

    function messageFriend(friend){
        console.log('messaging ',friend.username)
        setShowMessages(true)
    }

    return (
        <li className="friends-item">
            <span className="friend-username">
                {friend.username}
            </span>
            <div className="friends-btn">
                <button className="message-btn" onClick={()=>messageFriend(friend)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: message}}/>
                </button>
                {/* {friends.find((f) => f==friend) ?  */}
                <button className="delete-btn" onClick={()=>deleteFriend(friend)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: trash}}/>
                </button>
                {/* : <button className="add-btn" onClick={()=>addFriend(friend)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: add}}/>
                </button>} */}
            </div>
        </li>
    )
}

export default FriendItem
