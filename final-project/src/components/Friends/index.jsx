import {
    useAuth,
    useFriends,
} from "../../contexts";
import FriendItem from "./FriendItem";
import '../../pages/profilePage/styles.css'
import { useState, useEffect } from "react";
import { socket } from "../../socket";

function Friends ({trash,message,add,setShowMessages}){
    const token = useAuth().token || localStorage.getItem('token')
    const {user} = useAuth()
    const {friends,setFriends} = useFriends()

    const [friendUsernames, setFriendUsernames] = useState([])

    function getUsernames() {
        setFriendUsernames(friends.map((f) => {
            if(f.user1 !== user.username){
                return {"username": f.user1}
            } else {
                return {"username": f.user2}
            }
        }))  
    }

    useEffect(() => {
        if (friends) {  
            getUsernames()
        }
    },[friends])

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
              token: localStorage.getItem('token')
            },
          }
        const resp = await fetch(`http://localhost:3000/users/${searchText}`,options)
        const data = await resp.json()
        if (resp.ok && (!friendUsernames.find((f) => f.username == searchText)) && searchText!==user.username && searchText.length>0) {
            console.log(data)
            socket.emit("friend_req", {"sender":user.username, "recipient":searchText});

            alert(`You have sent a friend request to user ${searchText}`)
        } else if (friendUsernames.find((f) => f.username == searchText)){
            alert('You are already friends with this user.')
        } else if (searchText == user.username){
            alert ('You can\'t send a friend request to yourself!')
        } else {
            alert('There is no user with this username.')
        }
    }

    return (
        <>
        <div className="search-row">
            <input type="text" placeholder="Search" value={textFilter} onChange={updateTextFilter} />
            <button className="add-btn" onClick={()=>addFriend(textFilter)}>
                <div className="btn-icon" dangerouslySetInnerHTML={{ __html: add}}/>
            </button>
        </div>
        <ul className="friends-list">
            {friends && friendUsernames && friendUsernames.length > 0 ? 
                friendUsernames.filter(f => textFilter.length == 0 || f.username.toLowerCase().includes(textFilter.toLowerCase()))
                    .map((friend,i) => {
                        return <FriendItem friend={friend} key={i} friendUsernames={friendUsernames} trash={trash} message={message} setShowMessages={setShowMessages}/>
                    }) 
                : <p>Add friends with the search bar above!</p>}       
        </ul>

        </>
    )
}

export default Friends
