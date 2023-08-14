import {
    useAuth,
    useFriends,
    useRequests
 } from "../../contexts";
import FriendItem from "./FriendItem";
import '../../pages/profilePage/styles.css'
import { useState } from "react";
import FontAwesomeIcon from 'react'

function Friends ({trash,message,search, add}){
    const token = useAuth().token || localStorage.getItem('token')

    const [friends,setFriends] = useState([
        {username: '1'},
        {username: '2'},
        {username: '3'}
    ])

    const [textFilter,setTextFilter] = useState('')

    function updateTextFilter(e) {
        setTextFilter(e.target.value)
    }

    //const {friends} = useFriends()

    return (
        <>
        <div className="search-row">
            <input type="text" placeholder="Search" value={textFilter} onChange={updateTextFilter} />
            <button className="add-btn">
                <div className="btn-icon" dangerouslySetInnerHTML={{ __html: add}}/>
            </button>
        </div>
        <ul className="friends-list">
            {friends.length > 0 ? friends.map((friend,i) => {
                return <FriendItem friend={friend} key={i} friends={friends} setFriends={setFriends} trash={trash} message={message} search={search} add={add}/>
            }) : <p>Add friends with the search bar above!</p>}       
        </ul>
        </>
    )
}

export default Friends
