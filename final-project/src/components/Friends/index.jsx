import {
    useAuth,
    useFriends,
} from "../../contexts";
import FriendItem from "./FriendItem";
import '../../pages/profilePage/styles.css'
import { useState } from "react";

function Friends ({trash,message,search,add,setShowMessages}){
    const token = useAuth().token || localStorage.getItem('token')
    const {user} = useAuth()

    //const {friends} = useFriends()

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
        console.log('add')
        const options = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: '	9f283e2a-8b27-4b09-8e95-266e2b949c39'
            },
          }
        const resp = await fetch(`http://localhost:3000/users/${searchText}`,options)
        const data = await resp.json()
        if (resp.ok && (!friends.find((f) => f.username == searchText)) && searchText!==user.username) {
            console.log(data)
            // socket
            alert(`You have sent a friend request to user ${searchText}`)
        } else if (friends.find((f) => f.username == searchText)){
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
            {friends.length > 0 ? 
                friends.filter(f => textFilter.length == 0 | f.username.toLowerCase().includes(textFilter.toLowerCase()))
                    .map((friend,i) => {
                        return <FriendItem friend={friend} key={i} friends={friends} setFriends={setFriends} trash={trash} message={message} search={search} add={add} setShowMessages={setShowMessages}/>
                    }) 
                : <p>Add friends with the search bar above!</p>}       
        </ul>
        </>
    )
}

export default Friends
