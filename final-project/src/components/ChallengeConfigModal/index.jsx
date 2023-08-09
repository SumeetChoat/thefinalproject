import { useEffect, useRef } from "react";
import { patternArr } from "../../assets/pattern";
import "./style.css";

/* eslint-disable react/prop-types */
function ChallengeConfigModal({
  toggleChallengeConfigModal,
  setToggleChallengeConfigModal,
  form,
  setForm,
  generateNewChallenge,
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
    <dialog ref={dialogRef}>
      <h1 className="challenge-config-modal-title">Challenge Configuration</h1>
      <div className="challenge-config-modal-input-group">
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
          onChange={(e) => setForm({ ...form, lowOctave: e.target.value })}
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
          <option value="c">C</option>
          <option value="c#">C#/Db</option>
          <option value="d">D</option>
          <option value="d#">D#/Eb</option>
          <option value="e">E</option>
          <option value="f">F</option>
          <option value="g">G</option>
          <option value="g#">G#/Ab</option>
          <option value="a">A</option>
          <option value="a#">A#/Bb</option>
          <option value="b">B</option>
        </select>
        <select
          name="range-high-octave"
          id=""
          value={form.highOctave}
          onChange={(e) => setForm({ ...form, highOctave: e.target.value })}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="challenge-config-modal-input-group">
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
      <div className="challenge-config-modal-input-group">
        <label htmlFor="">Pattern:</label>
        <div className="pattern-config-modal-random-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="random"
              onChange={() => {
                setForm({ ...form, randomNote: !form.randomNote });
              }}
            />
            <label htmlFor="random">Random Note(s)</label>
          </div>
          <div className="challenge-config-modal-input-group">
            <label htmlFor="length">Length:</label>
            <select
              name="length"
              id="length"
              value={form.randomNoteLength}
              onChange={(e) => {
                setForm({
                  ...form,
                  randomNoteLength: parseInt(e.target.value),
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

      <button
        className="pattern-config-modal-button"
        onClick={() => {
          setToggleChallengeConfigModal(!toggleChallengeConfigModal);
        }}
      >
        Cancel
      </button>
      <button
        className="pattern-config-modal-button"
        onClick={() => {
          generateNewChallenge();
          setToggleChallengeConfigModal(!toggleChallengeConfigModal);
        }}
      >
        Save
      </button>
    </dialog>
  );
}

export default ChallengeConfigModal;
