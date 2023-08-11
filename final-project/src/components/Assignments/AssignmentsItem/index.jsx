import '../../../pages/profilePage/styles.css'
import { useAssignments } from '../../../contexts'

function AssignmentsItem({assignment, assignments, setAssignments}) {

    //const {assignments, setAssignments} = useAssignments()

    function deleteAssignment(assignment){

    }

    function editAssignment(assignment){

    }

    return (
        <li className="assignments-item">
            <span className="assignment">
                {assignment.range}
            </span>
        </li>
    )
}

export default AssignmentsItem
