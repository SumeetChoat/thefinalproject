import { useEffect, useRef } from "react";
import "./styles.css";

function AddAssignmentModal({
  showAddAssignmentModal,
  setShowAddAssignmentModal,
}) {
  const dialogRef = useRef();
  useEffect(() => {
    if (showAddAssignmentModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showAddAssignmentModal]);
  return (
    <dialog ref={dialogRef}>
      <h1>Add Assignment</h1>
      <form>
        <div className="input-group">
          <label htmlFor="Clef">Clef:</label>
          <input type="radio" name="clef" id="treble" />
          <label htmlFor="treble">Treble</label>
          <input type="radio" name="clef" id="bass" />
          <label htmlFor="treble">Bass</label>
        </div>

        <div className="add-assignment-modal-button-section">
          <button>Cancel</button>
          <button>Add</button>
        </div>
      </form>
    </dialog>
  );
}

export default AddAssignmentModal;
