/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import "./styles.css";
import { useAssignments } from "../../contexts";
function FinishAssignmentModal({
  showFinishAssignmentModal,
  setShowFinishAssignmentModal,
  time,
  noteCount,
}) {
  const dialogRef = useRef();
  const { currentAssignment, setCurrentAssignment } = useAssignments();
  const [score, setScore] = useState();
  console.log(currentAssignment);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  useEffect(() => {
    if (showFinishAssignmentModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showFinishAssignmentModal]);
  useEffect(() => {
    if (currentAssignment && currentAssignment.pattern.length > 0) {
      setScore(
        Math.ceil(
          Math.max(
            (currentAssignment.range[0] - currentAssignment.range[1]) % 10,
            1
          ) *
            Math.max(
              Math.min(
                (5 * Math.pow(noteCount, 2)) / ((2 * time) / 100),
                5 * noteCount
              ),
              noteCount
            )
        )
      );
    } else if (currentAssignment && currentAssignment.pattern.length === 0) {
      setScore(
        Math.ceil(
          1.5 *
            Math.max(
              (currentAssignment.range[0] - currentAssignment.range[1]) % 10,
              1
            ) *
            Math.max(
              Math.min(
                (5 * Math.pow(noteCount, 2)) / ((2 * time) / 100),
                5 * noteCount
              ),
              noteCount
            )
        )
      );
    }
  }, [noteCount, time]);
  async function handleCompleteAssignment() {
    const res = await fetch("http://localhost:3000/teachers/assignment", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...currentAssignment,
        completed: true,
        score,
      }),
    });
    if (res.ok) {
      setShowFinishAssignmentModal(false);
      setCurrentAssignment(null);
    } else {
      console.log("something went wrong");
    }
  }
  return (
    <dialog ref={dialogRef} className="finish-assignment-modal">
      <h1>Congratulations! You have finished this assignment!</h1>
      <h1>
        Your time is: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
      <h1>Your gain {score} points!</h1>
      <button
        className="finish-assignment-modal-button"
        onClick={() => {
          handleCompleteAssignment();
        }}
      >
        Back
      </button>
    </dialog>
  );
}

export default FinishAssignmentModal;
