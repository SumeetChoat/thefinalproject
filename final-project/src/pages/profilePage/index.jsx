import { useState, useEffect } from "react"
import { useAuth, useRole} from "../../contexts"
import {Friends, Assignments} from "../../components"
import './styles.css'

function ProfilePage () {
    //const token = useAuth().token || localStorage.getItem('token')
    //const {role} = useRole()

    let role = 'student'

    if (role === 'student' || role==='teacher'){
        return(
            <>
            <div className="profile-container">
            <div className="assignments-container">
                Assignments
                {<Assignments />}
            </div>
            <div className="friends-container">
                Friends
                {<Friends/>} 
            </div> 
            {role=='student'?
                <p>leader board</p>
            :
                <p>my students</p>
            }
            </div>
            </>
        )
    } else {
        return(
            <div className="profile-container">
            <p>Log in to see your profile</p>    
            </div>
        )
    }
}

export default ProfilePage
