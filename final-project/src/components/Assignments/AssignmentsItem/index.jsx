import '../../../pages/profilePage/styles.css'
import { useAssignments, useAuth} from '../../../contexts'
import { noteStrings } from '../../../assets/pattern';

function AssignmentsItem({assignment, trash, start, edit}) {

    const {user} = useAuth()
    const {role} = user

    function deleteAssignment(a){
        console.log('deleting ',a)
    }

    function editAssignment(a){
        console.log('editing ',a)
    }

    function displayAssignment(a){
        const lowOctave = a.range[0] < 24 ? 0 : Math.floor((a.range[0] - 24) / 12) + 1;
        const lowNoteName = a.range[0] % 12;
        const highOctave = a.range[1] < 24 ? 0 : Math.floor((a.range[1] - 24) / 12) + 1;
        const highNoteName = a.range[1] % 12;
        return (
        <div className="assignment-item">
            <p>
                Date:{" "}
                <span className="assignment-row-data-span">
                {a.assigned_date}
                </span>
            </p>
                {role == 'student' ? 
                <p>Teacher:{" "}
                <span className="assignment-row-data-span">{a.teacher_user}</span>
                </p>
                : 
                <p>Student:{" "}
                <span className="assignment-row-data-span">{a.student_user}</span></p>
                }
            <p>
                Range:{" "}
                <span className="assignment-row-data-span">
                {`${noteStrings[lowNoteName]}${lowOctave}`} -
                {` ${noteStrings[highNoteName]}${highOctave}`}
                </span>
            </p>
            <p>
                Pattern:{" "}
                <span className="assignment-row-data-span">
                {a.pattern.length === 0 ? "Random" : a.pattern.length}
                </span>
            </p>
            <p>
                Rounds:{" "}
                <span className="assignment-row-data-span">{a.rounds}</span>
            </p>
            {role == 'teacher' ?
            <div className="assignment-btn">
                <button className="edit-btn" onClick={()=>editAssignment(a)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: edit}}/>
                </button>
                <button className="delete-btn" onClick={()=>deleteAssignment(a)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: trash}}/>
                </button>
            </div>
            : 
            <div className="assignment-btn">
                <button className='start-btn'>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: start}}/>
                </button>
            </div>
            }
        </div>
        );
    }

    return (
        <li className="assignments-item">
        <div className="assignment">
            {displayAssignment(assignment)}
        </div>
        </li>
    )
}

export default AssignmentsItem
