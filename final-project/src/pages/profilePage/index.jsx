import { useState, useEffect } from "react"
import { useAuth, useRole} from "../../contexts"
import Friends from "../../components/Friends"
import './styles.css'

function ProfilePage () {
    const token = useAuth().token || localStorage.getItem('token')
    const {role} = useRole()

    if (role === 'student' || role==='teacher'){
        return(
            <>
            <div className="profile-container">
            <div className="assignments-container">
                <p></p>
            </div>
            <div className="friends-container">
                {<Friends/>} 
            </div> 
            {role=='student'?
                <p></p>
            :
                <p></p>
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
