import '../../pages/profilePage/styles.css'
import { useAuth, useAssignments, useStudents, useRole } from '../../contexts'
import AssignmentsItem from './AssignmentsItem'
import { useState } from 'react'

function AssignmentsList() {
    //const {assignments, setAssignments} = useAssignments()
    //const role = useRole()
    console.log('assignments')
    const [assignments, setAssignments] = useState([
        {
          assignment_id: 1,
          student_id: 3,
          teacher_id: 5,
          range: [36, 48],
          pattern: ["l2p1", "l2p3", "l3p1"],
          completed: true,
          score: 0,
          clef: "bass",
          rounds: 20,
          assigned_date: "2023-08-07",
          completed_date: null,
        },
        {
          assignment_id: 2,
          student_id: 3,
          teacher_id: 5,
          range: [60, 72],
          pattern: ["l2p1", "l2p3", "l3p1"],
          completed: false,
          score: 0,
          clef: "treble",
          rounds: 10,
          assigned_date: "2023-08-07",
          completed_date: null,
        },
        {
          assignment_id: 3,
          student_id: 3,
          teacher_id: 5,
          range: [36, 72],
          pattern: ["l2p1", "l2p3", "l3p1"],
          completed: false,
          score: 0,
          clef: "bass",
          rounds: 20,
          assigned_date: "2023-08-08",
          completed_date: null,
        },
        {
          assignment_id: 4,
          student_id: 3,
          teacher_id: 5,
          range: [60, 62],
          pattern: ["l2p1", "l2p3", "l3p1"],
          completed: false,
          score: 0,
          clef: "bass",
          rounds: 1,
          assigned_date: "2023-08-08",
          completed_date: null,
        },
      ]);

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
