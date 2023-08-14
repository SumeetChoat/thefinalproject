import { useState } from "react";
import "./styles.css";
import { noteStrings } from "../../assets/pattern";
import { useAssignments, useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
import AddAssignmentModal from "../../components/AddAssignmentModal";
function Assignments() {
  const { setCurrentAssignment } = useAssignments();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toggleChallengeConfigModal, setToggleChallengeConfigModal] =
    useState(false);
  const [assignments, setAssignments] = useState([
    {
      assignment_id: 1,
      student_username: "student2",
      teacher_username: "teacher2",
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
      student_username: "student1",
      teacher_username: "teacher1",
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
      student_username: "student2",
      teacher_username: "teacher2",
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
      student_username: "student1",
      teacher_username: "teacher1",
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
    console.log(form);
    let pattern = [];
    for (const key in form.pattern) {
      if (form.pattern[key]) {
        pattern.push(key);
      }
    }
    let range = [];
    range[0] = noteStrings.indexOf(form.lowNote) + (form.lowOctave + 1) * 12;
    range[1] = noteStrings.indexOf(form.highNote) + (form.highOctave + 1) * 12;
    console.log(range);
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
      console.log(assignment);
      alert("Assignment added");
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
        {assignments.map((a, i) => {
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
                  {a.assigned_date}
                </span>
              </p>
              <p className="span-2">
                {user && user.role === "student" ? "Teacher" : "Student"}:{" "}
                <span className="assignment-row-data-span">
                  {user && user.role === "student"
                    ? a.teacher_username
                    : a.student_username}
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
