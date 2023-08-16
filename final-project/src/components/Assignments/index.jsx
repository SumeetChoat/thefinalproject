import '../../pages/profilePage/styles.css'
import { useAuth, useAssignmentList } from '../../contexts'
import AssignmentsItem from './AssignmentsItem'
import { useState } from 'react'

function AssignmentsList({start,edit,trash}) {
    const {assignmentList, setAssignmentList} = useAssignmentList()
    const {user} = useAuth()
    
    return (
        <div className="assignments-lists">
        <div className="assignments-list-container assignments-completed">
            <p className='container-subtitle'>Completed</p>
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

        <div className="assignments-list-container assignments-incomplete">
            <p className='container-subtitle'>Incomplete</p>
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
