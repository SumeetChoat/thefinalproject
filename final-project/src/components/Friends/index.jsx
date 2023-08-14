import {
    useAuth,
    useFriends,
    useRequests
 } from "../../contexts";
import FriendItem from "./FriendItem";
import '../../pages/profilePage/styles.css'
import { useState } from "react";

function Friends ({trash,message}){
    const token = useAuth().token || localStorage.getItem('token')

    const [friends,setFriends] = useState([
        {username: '1'},
        {username: '2'},
        {username: '3'}
    ])

    //const {friends} = useFriends()

    return (
        <>
            {token ? 
                <ul className="friends-list">
                    {friends ? friends.map((friend,i) => {
                        return <FriendItem friend={friend} key={i} friends={friends} setFriends={setFriends} trash={trash} message={message}/>
                    }) : <p>Add friends!</p>}   
                </ul>
            : <p>Log in to view your friends</p>
            }
        </>
    )
}

export default Friends
