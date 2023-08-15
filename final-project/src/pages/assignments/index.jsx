import { useState } from "react";
import "./styles.css";
import { noteStrings } from "../../assets/pattern";
import { useAssignmentList, useAssignments, useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
import AddAssignmentModal from "../../components/AddAssignmentModal";
import { socket } from "../../socket";


function Assignments() {
  const { setCurrentAssignment } = useAssignments();
  const { assignmentList } = useAssignmentList();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toggleChallengeConfigModal, setToggleChallengeConfigModal] =
    useState(false);
  const [form, setForm] = useState({
    studentUsername: "",
    lowNote: "C",
    lowOctave: 4,
    highNote: "G",
    highOctave: 4,
    clef: "bass",
    randomNote: false,
    randomNoteLength: 4,
    rounds: 10,
    key: "C",
    pattern: {
      l2p1: true,
      l2p2: true,
      l2p3: false,
      l2p4: false,
      l2p5: false,
      l3p1: false,
      l3p2: false,
      l3p3: false,
      l3p4: false,
      l3p5: false,
      l3p6: false,
      l3p7: false,
      l3p8: false,
      l4p1: false,
      l4p2: false,
      l4p3: false,
      l4p4: false,
      l4p5: false,
      l4p6: false,
    },
  });

  async function handleAddAssignment(form) {
    let pattern = [];
    for (const key in form.pattern) {
      if (form.pattern[key]) {
        pattern.push(key);
      }
    }
    let range = [];
    range[0] = noteStrings.indexOf(form.lowNote) + (form.lowOctave + 1) * 12;
    range[1] = noteStrings.indexOf(form.highNote) + (form.highOctave + 1) * 12;
    const res = await fetch("http://localhost:3000/teachers/assignment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        range,
        clef: form.clef,
        pattern,
        rounds: form.rounds,
        student_user: form.studentUsername,
        teacher_user: user.username,
        is_random: form.randomNote,
        random_length: form.randomNoteLength,
      }),
    });
    if (res.ok) {
      const assignment = await res.json();
      alert("Assignment added");
      setToggleChallengeConfigModal(!toggleChallengeConfigModal);
      return assignment
    }
  }

  return (
    <div className="assignment-wrapper">
      {
        <AddAssignmentModal
          toggleChallengeConfigModal={toggleChallengeConfigModal}
          setToggleChallengeConfigModal={setToggleChallengeConfigModal}
          form={form}
          setForm={setForm}
          handleAddAssignment={handleAddAssignment}
        />
      }
      <div className="assignment-title-section">
        <h1 className="assignment-title">
          {user && user.role === "student" && "My"} Assignments
        </h1>
        {user && user.role === "teacher" && (
          <button
            className="add-assignment-button"
            onClick={() => {
              setToggleChallengeConfigModal(true);
            }}
          >
            + Add Assignment
          </button>
        )}
      </div>
      <div className="assignment-display-section">
        {assignmentList &&
          assignmentList.map((a, i) => {
            const lowOctave =
              a.range[0] < 24 ? 0 : Math.floor((a.range[0] - 24) / 12) + 1;
            const lowNoteName = a.range[0] % 12;
            const highOctave =
              a.range[1] < 24 ? 0 : Math.floor((a.range[1] - 24) / 12) + 1;
            const highNoteName = a.range[1] % 12;

            return (
              <div className="assignment-row" key={i}>
                <p>
                  Date:{" "}
                  <span className="assignment-row-data-span">
                    {a.date_assigned.slice(0, 10)}
                  </span>
                </p>
                <p className="span-2">
                  {user && user.role === "student" ? "Teacher" : "Student"}:{" "}
                  <span className="assignment-row-data-span">
                    {user && user.role === "student"
                      ? a.teacher_user
                      : a.student_user}
                  </span>
                </p>
                <p>
                  Range:
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
                <p>{a.completed ? "Completed" : "Incompleted"}</p>
                {user && user.role === "student" && (
                  <button
                    className="assignment-row-play-button"
                    onClick={() => {
                      setCurrentAssignment(a);
                      navigate("/challenge");
                    }}
                  >
                    {a.completed ? "Play Again" : "Play"}
                  </button>
                )}
                {user && user.role === "teacher" && (
                  <button
                    className="assignment-row-play-button"
                    onClick={() => {
                      if (a.completed) {
                        console.log(a);
                      } else {
                        socket.emit("reminder", {"sender":a.teacher_user, "recipient":a.student_user});
                      }
                    }}
                  >
                    {a.completed ? "Assign again" : "Send Reminder"}
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Assignments;
