import { useRef, useEffect } from "react";

function FinishAssignmentModal({
  showFinishAssignmentModal,
  setShowFinishAssignmentModal,
}) {
  const dialogRef = useRef();

  useEffect(() => {
    if (showFinishAssignmentModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showFinishAssignmentModal]);

  return (
    <dialog ref={dialogRef}>
      <h1>Congratulations! You have finished this assignment</h1>
      <h1>Your time is:</h1>
      <button onClick={() => setShowFinishAssignmentModal(false)}>Back</button>
    </dialog>
  );
}

export default FinishAssignmentModal;
