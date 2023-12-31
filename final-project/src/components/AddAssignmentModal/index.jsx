import { useEffect, useRef } from "react";
import { patternArr } from "../../assets/pattern";
import { socket } from "../../socket";
import "./styles.css";

/* eslint-disable react/prop-types */
function AddAssignmentModal({
  toggleChallengeConfigModal,
  setToggleChallengeConfigModal,
  form,
  setForm,
  handleAddAssignment,
}) {
  const dialogRef = useRef();

  useEffect(() => {
    if (toggleChallengeConfigModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [toggleChallengeConfigModal]);
  function handleCheckBoxChange(e) {
    setForm({
      ...form,
      pattern: {
        ...form.pattern,
        [e.target.name]: !form.pattern[e.target.name],
      },
    });
  }

  return (
    <dialog ref={dialogRef} className="add-assignment-dialog">
      <h1 className="add-assignment-dialog-modal-title">Create Assignment</h1>
      <div className="add-assignment-dialog-modal-input-group">
        <label htmlFor="studentUsername">Student Username:</label>
        <input
          type="text"
          name="studentUsername"
          id="studentUsername"
          onChange={(e) =>
            setForm({ ...form, studentUsername: e.target.value })
          }
        />
      </div>
      <div className="add-assignment-dialog-modal-input-group">
        <label htmlFor="range">Range: </label>
        <select
          name="range-low-name"
          id="range"
          value={form.lowNote}
          onChange={(e) => setForm({ ...form, lowNote: e.target.value })}
        >
          <option value="C">C</option>
          <option value="C#">C#/Db</option>
          <option value="D">D</option>
          <option value="D#">D#/Eb</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="G#">G#/Ab</option>
          <option value="A">A</option>
          <option value="A#">A#/Bb</option>
          <option value="B">B</option>
        </select>
        <select
          name="range-low-octave"
          id=""
          value={form.lowOctave}
          onChange={(e) =>
            setForm({ ...form, lowOctave: parseInt(e.target.value) })
          }
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <span> - </span>
        <select
          name="range-high-name"
          id="range"
          value={form.highNote}
          onChange={(e) => setForm({ ...form, highNote: e.target.value })}
        >
          <option value="C">C</option>
          <option value="C#">C#/Db</option>
          <option value="D">D</option>
          <option value="D#">D#/Eb</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="G#">G#/Ab</option>
          <option value="A">A</option>
          <option value="A#">A#/Bb</option>
          <option value="B">B</option>
        </select>
        <select
          name="range-high-octave"
          id=""
          value={form.highOctave}
          onChange={(e) =>
            setForm({ ...form, highOctave: parseInt(e.target.value) })
          }
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="add-assignment-dialog-modal-input-group">
        <label htmlFor="clef">Clef:</label>
        <input
          type="radio"
          name="clef"
          id="treble-clef"
          value="treble"
          onChange={(e) => setForm({ ...form, clef: e.target.value })}
          checked={form.clef === "treble"}
        />
        <label htmlFor="treble-clef">Treble Clef</label>
        <input
          type="radio"
          name="clef"
          id="bass-clef"
          value="bass"
          onChange={(e) => setForm({ ...form, clef: e.target.value })}
          checked={form.clef === "bass"}
        />
        <label htmlFor="bass-clef">Bass Clef</label>
      </div>
      <div className="add-assignment-dialog-modal-input-group">
        <label htmlFor="rounds">Number of Rounds:</label>
        <input
          type="number"
          name="rounds"
          id="rounds"
          min={1}
          onChange={(e) => {
            setForm({ ...form, rounds: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="add-assignment-dialog-modal-input-group">
        <label htmlFor="">Pattern:</label>
        <div className="pattern-config-modal-random-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="random"
              checked={form.randomNote}
              onChange={() => {
                setForm({ ...form, randomNote: !form.randomNote });
              }}
            />
            <label htmlFor="random">Random Note(s)</label>
          </div>
          <div className="add-assignment-dialog-modal-input-group">
            <label htmlFor="length">Length:</label>
            <select
              name="length"
              id="length"
              value={form.randomNoteLength}
              onChange={(e) => {
                setForm({
                  ...form,
                  randomNoteLength:
                    e.target.value.length > 0
                      ? parseInt(e.target.value)
                      : undefined,
                });
              }}
              disabled={!form.randomNote}
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="pattern-container">
          <div className="pattern-group">
            {patternArr.map((p, i) => {
              if (Object.keys(p)[0][1] == 2) {
                return (
                  <div className="checkbox-group" key={i}>
                    <input
                      type="checkbox"
                      id={i}
                      name={Object.keys(p)[0]}
                      checked={form.pattern[Object.keys(p)[0]]}
                      onChange={(e) => handleCheckBoxChange(e)}
                      disabled={form.randomNote}
                    />
                    <img
                      src={`${Object.keys(p)[0]}.png`}
                      alt="note pattern"
                      className={`pattern-img ${form.randomNote && "hidden"}`}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="pattern-group">
            {patternArr.map((p, i) => {
              if (Object.keys(p)[0][1] == 3) {
                return (
                  <div className="checkbox-group" key={i}>
                    <input
                      type="checkbox"
                      id={i}
                      name={Object.keys(p)[0]}
                      checked={form.pattern[Object.keys(p)[0]]}
                      onChange={(e) => handleCheckBoxChange(e)}
                      disabled={form.randomNote}
                    />
                    <img
                      src={`${Object.keys(p)[0]}.png`}
                      alt="note pattern"
                      className={`pattern-img ${form.randomNote && "hidden"}`}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="pattern-group">
            {patternArr.map((p, i) => {
              if (Object.keys(p)[0][1] == 4) {
                return (
                  <div className="checkbox-group" key={i}>
                    <input
                      type="checkbox"
                      id=""
                      name={Object.keys(p)[0]}
                      checked={form.pattern[Object.keys(p)[0]]}
                      onChange={(e) => handleCheckBoxChange(e)}
                      disabled={form.randomNote}
                    />
                    <img
                      src={`${Object.keys(p)[0]}.png`}
                      alt="note pattern"
                      className={`pattern-img ${form.randomNote && "hidden"}`}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="add-assignment-dialog-modal-button-section">
        <button
          className="add-assignment-dialog-modal-button cancel-button"
          onClick={() => {
            setToggleChallengeConfigModal(!toggleChallengeConfigModal);
          }}
        >
          Cancel
        </button>
        <button
          className="add-assignment-dialog-modal-button save-button"
          onClick={async () => {
            if (
              Array.from(
                dialogRef.current.querySelectorAll("input[type='checkbox']")
              ).some((el) => el.checked) &&
              form.rounds > 0
            ) {
              const newAssignment = await handleAddAssignment(form);
              socket.emit("add_assignment", newAssignment);
            } else if (form.rounds <= 0) {
              alert("Rounds has to be greater than 0");
            } else {
              alert("Please check at least 1 checkbox.");
            }
          }}
        >
          Save
        </button>
      </div>
    </dialog>
  );
}

export default AddAssignmentModal;
