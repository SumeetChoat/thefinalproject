import '../../pages/profilePage/styles.css'
import { useAuth, useAssignments, useStudents, useRole } from '../../contexts'
import AssignmentsItem from './AssignmentsItem'
import { useState } from 'react'

function AssignmentsList() {
    //const {assignments, setAssignments} = useAssignments()
    //const role = useRole()
    console.log('assignments')
    const [assignments,setAssignments] = useState([
        {"range": ["C4","C5"], "completed": true}
    ])

    let role = 'student'
    
    return (
        <div className="assignments-lists">
        <div className="assignments-list-container">
            <p>Completed</p>
            {assignments.filter(a => a.completed) !== [] ?
                <ul className="assignments-list">
                    {assignments.filter(a=>a.completed)
                    .map((a,i)=>{
                        return <AssignmentsItem assignment={a} key={i} assignments={assignments} setAssignments={setAssignments}/>
                    })}
                </ul>
                : <p></p>
            }
        </div>

        <div className="assignments-list-container">
            <p>Incomplete</p>
            {assignments.filter(a=>!a.completed) !== [] ? 
                <ul className="assignments-list">
                    {assignments.filter(a=>!a.completed)
                    .map((a,i)=>{
                         return <AssignmentsItem assignment={a} key={i} assignments={assignments} setAssignments={setAssignments}/>
                    })}
                </ul>
                : <p></p>
            } 
        </div>
        </div>
    )
}

export default AssignmentsList
