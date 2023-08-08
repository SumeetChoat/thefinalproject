import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
function ChallengeConfigModal({
  toggleChallengeConfigModal,
  setToggleChallengeConfigModal,
}) {
  const dialogRef = useRef();
  useEffect(() => {
    if (toggleChallengeConfigModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [toggleChallengeConfigModal]);
  return (
    <dialog ref={dialogRef}>
      <h1>Challenge Configuration</h1>
      <div className="input-group">
        <label htmlFor="range">Range: </label>
        <select name="range-low-name" id="range">
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
        <select name="range-low-octave" id="">
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <span> - </span>
        <select name="range-high-name" id="range">
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
        <select name="range-high-octave" id="">
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="clef">Clef:</label>
        <input type="radio" name="clef" id="treble-clef" defaultChecked />
        <label htmlFor="treble-clef">Treble Clef</label>
        <input type="radio" name="clef" id="bass-clef" />
        <label htmlFor="bass-clef">Bass Clef</label>
      </div>
      <button
        onClick={() => {
          setToggleChallengeConfigModal(!toggleChallengeConfigModal);
        }}
      >
        Close
      </button>
    </dialog>
  );
}

export default ChallengeConfigModal;
