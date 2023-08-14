import React from 'react';
import { useState } from "react"
import { useFriends } from "../../../contexts"
import '../../../pages/profilePage/styles.css'

function FriendItem({friend, friends, setFriends}){
    console.log(friend)
    //const {friends,setFriends} = useFriends()

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
            <button className="delete-friend-btn" onClick={()=>deleteFriend(friend)}>
                Delete
            </button>
            <button className="message-friend-btn" onClick={()=>messageFriend(friend)}>
                Message
            </button>
        </li>
    )
}

export default FriendItem
