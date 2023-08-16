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
        const resp = fetch('http://localhost:3000/users/',options)
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <>
        <ul className="leaderboard-list">

        </ul>
        </>
    )
}

export default LeaderBoard
