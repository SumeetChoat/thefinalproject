import {
    useAuth,
    useFriends,
    useRole,
    useRequests
 } from "../../contexts";
import FriendItem from "../FriendItem";
import '../../pages/profilePage/styles.css'
import { useState } from "react";

function Friends (){
    const token = useAuth().token || localStorage.getItem('token')
    const role = useRole().role || localStorage.getItem('role')
    const {friends} = useFriends()

    return (
        <>
            {token ? 
                <ul className="friends-list">
                    {friends ? friends.map((friend,i) => {
                        return <FriendItem friend={friend} key={i}/>
                    }) : <p>Add friends!</p>}   
                </ul>
            : <p>Log in to view your friends</p>
            }
        </>
    )
}

export default Friends
