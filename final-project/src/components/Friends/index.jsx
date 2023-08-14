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
        {username: 'username1'},
        {username: 'dsfjdsf'},
        {username: 'ednjdfs'}
    ])

    const [textFilter,setTextFilter] = useState('')

    function updateTextFilter(e) {
        setTextFilter(e.target.value)
    }

    async function addFriend(searchText) {
        const options = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: {
                username: searchText
            }
          }
        const resp = await fetch('https://pitchperfect-api.onrender.com/users/username',options)
        const data = await resp.json()
        if (resp.ok) {
            console.log(data)
            // add friend - socket
            setFriends([...friends,{username: data.username}])
        }
    }

    //const {friends} = useFriends()

    return (
        <>
        <div className="search-row">
            <input type="text" placeholder="Search" value={textFilter} onChange={updateTextFilter} />
            <button className="add-btn" onClick={()=>addFriend(textFilter)}>
                <div className="btn-icon" dangerouslySetInnerHTML={{ __html: add}}/>
            </button>
        </div>
        <ul className="friends-list">
            {friends.length > 0 ? 
                friends.filter(f => textFilter.length == 0 | f.username.toLowerCase().includes(textFilter.toLowerCase()))
                    .map((friend,i) => {
                        return <FriendItem friend={friend} key={i} friends={friends} setFriends={setFriends} trash={trash} message={message} search={search} add={add}/>
                    }) 
                : <p>Add friends with the search bar above!</p>}       
        </ul>
        </>
    )
}

export default Friends
