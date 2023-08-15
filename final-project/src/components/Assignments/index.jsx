import '../../pages/profilePage/styles.css'
import { useAuth, useAssignmentList } from '../../contexts'
import AssignmentsItem from './AssignmentsItem'
import { useState } from 'react'

function AssignmentsList({start,edit,trash}) {
    const {assignmentList, setAssignmentList} = useAssignmentList()
    const {user} = useAuth()
    console.log('assignments: ', assignmentList)
    console.log("a user: ",user)
    // const [assignments, setAssignments] = useState([
    //     {
    //       assignment_id: 1,
    //       student_id: 3,
    //       teacher_id: 5,
    //       range: [36, 48],
    //       pattern: ["l2p1", "l2p3", "l3p1"],
    //       completed: true,
    //       score: 0,
    //       clef: "bass",
    //       rounds: 20,
    //       assigned_date: "2023-08-07",
    //       completed_date: null,
    //     },
    //     {
    //       assignment_id: 2,
    //       student_id: 3,
    //       teacher_id: 5,
    //       range: [60, 72],
    //       pattern: ["l2p1", "l2p3", "l3p1"],
    //       completed: false,
    //       score: 0,
    //       clef: "treble",
    //       rounds: 10,
    //       assigned_date: "2023-08-07",
    //       completed_date: null,
    //     },
    //     {
    //       assignment_id: 3,
    //       student_id: 3,
    //       teacher_id: 5,
    //       range: [36, 72],
    //       pattern: ["l2p1", "l2p3", "l3p1"],
    //       completed: false,
    //       score: 0,
    //       clef: "bass",
    //       rounds: 20,
    //       assigned_date: "2023-08-08",
    //       completed_date: null,
    //     },
    //     {
    //       assignment_id: 4,
    //       student_id: 3,
    //       teacher_id: 5,
    //       range: [60, 62],
    //       pattern: ["l2p1", "l2p3", "l3p1"],
    //       completed: false,
    //       score: 0,
    //       clef: "bass",
    //       rounds: 1,
    //       assigned_date: "2023-08-08",
    //       completed_date: null,
    //     },
    //   ]);
    
    return (
        <div className="assignments-lists">
        <div className="assignments-list-container">
            <p>Completed</p>
            {user && assignmentList && assignmentList.filter(a => a.completed).length !== 0 ?
                <ul className="assignments-list">
                    {assignmentList.filter(a=>a.completed)
                    .map((a,i)=>{
                        return <AssignmentsItem start={start} edit={edit} trash={trash} assignment={a} key={i}/>
                    })}
                </ul>
                : <p>No completed assignments</p>
            }
        </div>

        <div className="assignments-list-container">
            <p>Incomplete</p>
            {user && assignmentList && assignmentList.filter(a=>!a.completed).length !== 0 ? 
                <ul className="assignments-list">
                    {assignmentList.filter(a=>!a.completed)
                    .map((a,i)=>{
                         return <AssignmentsItem start={start} edit={edit} trash={trash} assignment={a} key={i} />
                    })}
                </ul>
                : <p>No incomplete assignments</p>
            } 
        </div>
        </div>
    )
}

export default AssignmentsList
