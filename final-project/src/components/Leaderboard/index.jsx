import { useState, useEffect } from "react"
import { useAuth } from "../../contexts"

function LeaderBoard(){
    const token = localStorage.getItem('token') || useAuth().token
    const {user} = useAuth()
    const [users,setUsers] = useState()

    async function getUsers() {
        const options = {
            headers: {
                token: token,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
        const resp = await fetch('https://sightreader.onrender.com/users/points',options)
        const data = await resp.json()
        if (resp.ok) {
            console.log(data)
            setUsers(data)
        } else {
            console.log(data)
        }
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <>
        <ul className="leaderboard-list">
            {user && users && users.length > 0 ?
            users.slice(0,10).map((u, i) => {
                const className = u.username == user.username ? 'lb-item lb-self' : 'lb-item lb-other'
                return <li key={i} className={className}>
                    <span className="lb-username">{u.username}</span>
                    <span className="lb-points">{u.points}</span>
                </li>
            })  
            :
            <p>No users yet.</p>
            }
        </ul>
        </>
    )
}

export default LeaderBoard
