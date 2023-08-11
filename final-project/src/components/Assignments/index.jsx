import '../../pages/profilePage/styles.css'
import { useAuth, useAssignments, useStudents, useRole } from '../../contexts'
import AssignmentsItem from './AssignmentsItem'
import { useState } from 'react'

function AssignmentsList() {
    //const {assignments, setAssignments} = useAssignments()
    //const role = useRole()
    console.log('assignments')
    const [assignments,setAssignments] = useState([
        {range: ["C4","C5"]}
    ])

    function filter(option){

    }

    let role = 'student'
    
    return (
        <ul className="assignments-list">
            {assignments ? assignments.map((a,i)=>{
                return <AssignmentsItem assignment={a} key={i} assignments={assignments} setAssignments={setAssignments}/>
            }) 
            : (role=='student' ? <p>You have no assignments</p>
                    : <p>You have not created any assignments</p>) }
        </ul>
    )
}

export default AssignmentsList
