import { useState, useEffect } from "react"
import { useAuth } from "../../contexts"

function LeaderBoard(){
    const token = localStorage.getItem('token') || useAuth().token
    const [users,setUsers] = useState()

    async function getUsers() {
        const options = {
            headers: {
                token: token,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
        const resp = await fetch('http://localhost:3000/users/points',options)
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
            {users && users.length > 0 ?
            users.map((u, i) => {
                return <li key={i} className="leaderboard-item">
                    <span className="lb-username">{u.username}</span>
                    <span className="lb-points">{u.points}</span>
                </li>
            })  
            :
            ""
            }
        </ul>
        </>
    )
}

export default LeaderBoard
