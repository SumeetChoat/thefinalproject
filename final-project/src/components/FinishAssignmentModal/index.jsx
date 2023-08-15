/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import "./styles.css";
import { useAssignments } from "../../contexts";
function FinishAssignmentModal({
  showFinishAssignmentModal,
  setShowFinishAssignmentModal,
  time,
}) {
  const dialogRef = useRef();
  const { currentAssignment, setCurrentAssignment } = useAssignments();
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  useEffect(() => {
    if (showFinishAssignmentModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showFinishAssignmentModal]);
  async function handleCompleteAssignment() {
    const res = await fetch("http://localhost:3000/teachers/assignment", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...currentAssignment,
        completed: true,
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
      <h1>Your gain 100 points!</h1>
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
