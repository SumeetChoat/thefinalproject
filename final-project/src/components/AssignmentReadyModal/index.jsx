/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./styles.css";
import { useAuth } from "../../contexts";
function AssignmentReadyModal({
  showAssignmentReadyModal,
  setShowAssignmentReadyModal,
  generateNewChallenge,
  setRound,
}) {
  const dialogRef = useRef();
  const { currentAssignment, setCurrentAssignment } = useAuth();
  useEffect(() => {
    if (showAssignmentReadyModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showAssignmentReadyModal]);

  function handleStartAssignment() {
    setShowAssignmentReadyModal(false);
    setRound(1);
    generateNewChallenge();
  }
  console.log(currentAssignment);
  return (
    <dialog className="assignment-ready-modal" ref={dialogRef}>
      <h1 className="assignment-ready-modal-title">Assignment</h1>
      <table>
        <tbody>
          <tr className="assignment-ready-modal-tr">
            <td>Date:</td>
            <td>{currentAssignment.assigned_date}</td>
          </tr>
          <tr className="assignment-ready-modal-tr">
            <td>Clef:</td>
            <td>{currentAssignment.clef}</td>
          </tr>
          <tr className="assignment-ready-modal-tr">
            <td>Pattern:</td>
            <td>
              <div className="assignment-ready-pattern-container">
                {currentAssignment.pattern.map((p) => {
                  return (
                    <img
                      src={`${p}.png`}
                      key={p}
                      className="assignment-ready-pattern-img"
                    ></img>
                  );
                })}
              </div>
            </td>
          </tr>
          <tr className="assignment-ready-modal-tr">
            <td>Rounds:</td>
            <td>{currentAssignment.rounds}</td>
          </tr>
        </tbody>
      </table>
      <div className="assignment-ready-modal-button-section">
        <button
          type="button"
          className="assignment-ready-modal-button"
          onClick={() => {
            setCurrentAssignment(null);
            setShowAssignmentReadyModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="assignment-ready-modal-button"
          onClick={handleStartAssignment}
        >
          Start Assignment
        </button>
      </div>
    </dialog>
  );
}

export default AssignmentReadyModal;
