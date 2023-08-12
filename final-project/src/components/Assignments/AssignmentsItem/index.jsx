import '../../../pages/profilePage/styles.css'
import { useAssignments, useRole} from '../../../contexts'
import { noteStrings } from '../../../assets/pattern';

function AssignmentsItem({assignment, assignments, setAssignments}) {

    //const {assignments, setAssignments} = useAssignments()
    //const {role} = useRole()
    let role = 'teacher'

    const trash= '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>'

    const edit = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"/></svg>'

    const start = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'

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
            <p>
                Teacher:{" "}
                <span className="assignment-row-data-span">{a.teacher_id}</span>
            </p>
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
