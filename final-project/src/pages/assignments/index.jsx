import React from 'react';
import { useState } from "react";
import "./styles.css";
import { noteStrings } from "../../assets/pattern";
import { useAssignments } from "../../contexts";
import { useNavigate } from "react-router-dom";
function Assignments() {
  const { setCurrentAssignment } = useAssignments();
  const navigate = useNavigate();
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
  return (
    <div className="assignment-wrapper">
      <h1 className="assignment-title">My Assignments</h1>
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
              <p>
                Teacher:{" "}
                <span className="assignment-row-data-span">{a.teacher_id}</span>
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
              <button
                className="assignment-row-play-button"
                onClick={() => {
                  setCurrentAssignment(a);
                  navigate("/challenge");
                }}
              >
                {a.completed ? "Play Again" : "Play"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Assignments;
