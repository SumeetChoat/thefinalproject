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

                <div className="profile-left">
                    <div className="assignments-container">
                        Assignments
                        {<Assignments />}
                    </div>

                    <div className="connections-container">
                        Connections
                        {<Friends/>} 
                    </div> 
                </div>    

                <div className="profile-right">
                    <div className="leaderboard-container">
                            {role=='student'?
                                <p>LeaderBoard</p>
                            :
                                <p>My Students</p>
                            }
                    </div>
                </div>

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
