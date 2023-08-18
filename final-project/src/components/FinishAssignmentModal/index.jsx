/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import "./styles.css";
import { useAssignments, useAuth } from "../../contexts";
import { socket } from "../../socket";

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
  const { user } = useAuth();

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
            (Math.floor(
              (currentAssignment.range[1] - currentAssignment.range[0]) / 10
            ) *
              4) /
              15,
            1
          ) *
            Math.max(
              Math.min(
                (5 * Math.pow(noteCount, 2)) / (time / 100),
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
              (Math.floor(
                (currentAssignment.range[1] - currentAssignment.range[0]) / 10
              ) *
                4) /
                15,
              1
            ) *
            Math.max(
              Math.min(
                (5 * Math.pow(noteCount, 2)) / (time / 100),
                5 * noteCount
              ),
              noteCount
            )
        )
      );
    }
  }, [noteCount, time]);
  async function handleCompleteAssignment() {
    const res = await fetch(
      "https://sightreader.onrender.com/students/assignment/complete",
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...currentAssignment,
          completed: true,
          score,
          time_taken: time,
          date_completed: new Date(),
        }),
      }
    );
    if (res.ok) {
      socket.emit("complete_assignment", {
        sender: user.username,
        recipient: currentAssignment.teacher_user,
        time: time,
      });
      setShowFinishAssignmentModal(false);
      setCurrentAssignment(null);
    } else {
      console.log("something went wrong");
    }
  }
  return (
    <dialog ref={dialogRef} className="finish-assignment-modal">
      <h1>Congratulations! You have finished this assignment!</h1>
      <h1 className="finish-assignment-time">
        Your time is: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
      <h1 className="finish-assignment-score">Your gain {score} points!</h1>
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
