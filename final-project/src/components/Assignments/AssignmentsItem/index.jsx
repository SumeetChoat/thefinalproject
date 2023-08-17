/* eslint-disable react/prop-types */
import "../../../pages/profilePage/styles.css";
import { useAuth } from "../../../contexts";
import { noteStrings } from "../../../assets/pattern";

function AssignmentsItem({ assignment, trash, edit }) {
  const { user } = useAuth();
  const { role } = user;

  function deleteAssignment(a) {
    console.log("deleting ", a);
  }

  function editAssignment(a) {
    console.log("editing ", a);
  }

  function displayAssignment(a) {
    const lowOctave =
      a.range[0] < 24 ? 0 : Math.floor((a.range[0] - 24) / 12) + 1;
    const lowNoteName = a.range[0] % 12;
    const highOctave =
      a.range[1] < 24 ? 0 : Math.floor((a.range[1] - 24) / 12) + 1;
    const highNoteName = a.range[1] % 12;
    return (
      <div className="assignment-item">
        <p>
          Date:{" "}
          <span className="assignment-row-data-span">
            {a.date_assigned.slice(0, 10)}
          </span>
        </p>
        {role == "student" ? (
          <p>
            Teacher:{" "}
            <span className="assignment-row-data-span">{a.teacher_user}</span>
          </p>
        ) : (
          <p>
            Student:{" "}
            <span className="assignment-row-data-span">{a.student_user}</span>
          </p>
        )}
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
          Rounds: <span className="assignment-row-data-span">{a.rounds}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className="assignment-row-data-span"
            style={{ color: a.completed ? "green" : "red" }}
          >
            {a.completed ? "Completed" : "Incompleted"}
          </span>
        </p>
        {role == "teacher" ? (
          <div className="assignment-btn">
            <button className="edit-btn" onClick={() => editAssignment(a)}>
              <div
                className="btn-icon"
                dangerouslySetInnerHTML={{ __html: edit }}
              />
            </button>
            <button className="delete-btn" onClick={() => deleteAssignment(a)}>
              <div
                className="btn-icon"
                dangerouslySetInnerHTML={{ __html: trash }}
              />
            </button>
          </div>
        ) : (
          // <div className="assignment-btn">
          //     <button className='start-btn'>
          //         <div className="btn-icon" dangerouslySetInnerHTML={{ __html: start}}/>
          //     </button>
          // </div>
          ""
        )}
      </div>
    );
  }

  return <div className="assignment">{displayAssignment(assignment)}</div>;
}

export default AssignmentsItem;
