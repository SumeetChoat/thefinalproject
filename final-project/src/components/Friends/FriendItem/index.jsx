import { useState } from "react"
import { useFriends } from "../../../contexts"
import '../../../pages/profilePage/styles.css'

function FriendItem({friend, friends, setFriends}){
    console.log(friend)
    //const {friends,setFriends} = useFriends()

    const trash= '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>'

    const message = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/></svg>'

    function deleteFriend(friend){
         if (confirm(`Are you sure you want to remove ${friend.username} as a friend?`)==true) {
            setFriends(
                friends.filter(f => f.username != friend.username)
            )
         }
    }

    function messageFriend(friend){
        console.log('messaging ',friend.username)
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
                <button className="delete-btn" onClick={()=>deleteFriend(friend)}>
                        <div className="btn-icon" dangerouslySetInnerHTML={{ __html: trash}}/>
                </button>
            </div>
        </li>
    )
}

export default FriendItem
