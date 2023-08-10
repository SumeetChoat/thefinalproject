/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { autoCorrelate } from "../../lib/pitchDetection";
import {
  noteStrings,
  patternArr,
  majorArr,
  minorArr,
} from "../../assets/pattern";
import StaveComponent from "../../components/StaveComponent";
import "./styles.css";
import ChallengeConfigModal from "../../components/ChallengeConfigModal";
function ChallengePage() {
  const [form, setForm] = useState({
    lowNote: "C",
    lowOctave: 4,
    highNote: "G",
    highOctave: 4,
    clef: "bass",
    randomNote: false,
    randomNoteLength: 4,
    key: "C",
    pattern: {
      l2p1: true,
      l2p2: true,
      l2p3: false,
      l2p4: false,
      l2p5: false,
      l3p1: false,
      l3p2: false,
      l3p3: false,
      l3p4: false,
      l3p5: false,
      l3p6: false,
      l3p7: false,
      l3p8: false,
      l4p1: false,
      l4p2: false,
      l4p3: false,
      l4p4: false,
      l4p5: false,
      l4p6: false,
    },
  });

  const [toggleChallengeConfigModal, setToggleChallengeConfigModal] =
    useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [challenge, setChallenge] = useState([
    { note: 60, isCorrect: false },
    { note: 62, isCorrect: false },
    { note: 64, isCorrect: false },
    { note: 65, isCorrect: false },
  ]);

  let audioContext = null;
  let analyser = null;
  let mediaStreamSource = null;

  function startPitchDetect() {
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          mandatory: {
            googEchoCancellation: "false",
            googAutoGainControl: "false",
            googNoiseSuppression: "false",
            googHighpassFilter: "false",
          },
          optional: [],
        },
      })
      .then((stream) => {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Connect it to the destination.
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        mediaStreamSource.connect(analyser);
        updatePitch();
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
        alert("Stream generation failed.");
      });
  }

  const buflen = 2048;
  var buf = new Float32Array(buflen);

  function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  function updatePitch() {
    analyser.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioContext.sampleRate);

    if (ac == -1) {
      // Not hearing anything
    } else {
      let pitch = ac;
      var note = noteFromPitch(pitch);

      if (
        note == challenge[currentIndex].note &&
        challenge[currentIndex].isCorrect !== true
      ) {
        const newState = [...challenge];
        newState[currentIndex].isCorrect = true;
        setChallenge(newState);

        setCurrentIndex((prev) => prev + 1);
      }
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    window.requestAnimationFrame(updatePitch);
  }

  function generateNewChallenge() {
    const lowestNote =
      noteStrings.indexOf(form.lowNote) + (form.lowOctave - 1) * 12 + 24;
    const highestNote =
      noteStrings.indexOf(form.highNote) + (form.highOctave - 1) * 12 + 24;
    const newChallenge = [];
    if (form.randomNote) {
      localStorage.getItem("accidentals") &&
        localStorage.removeItem("accidentals");
      localStorage.setItem("accidentals", "");
      for (let i = 0; i < form.randomNoteLength; i++) {
        const randomNote =
          Math.floor(Math.random() * (highestNote - lowestNote)) + lowestNote;
        const localStorageAccidental = localStorage.getItem("accidentals");
        Math.random() > 0.5
          ? localStorage.setItem("accidentals", localStorageAccidental + "#")
          : localStorage.setItem("accidentals", localStorageAccidental + "b");
        const newNoteObj = { note: randomNote, isCorrect: false };
        newChallenge.push(newNoteObj);
      }
    } else {
      // Pattern
      let newChallengePattern = [];

      const randomNote =
        Math.floor(Math.random() * (highestNote - lowestNote)) + lowestNote;
      for (let i = 0; i < patternArr.length; i++) {
        if (form.pattern[Object.keys(patternArr[i])]) {
          newChallengePattern.push(...Object.values(patternArr[i]));
        }
      }
      const randomPattern =
        newChallengePattern[
          Math.floor(Math.random() * newChallengePattern.length)
        ];

      const scale =
        form.key.length < 2
          ? majorArr.map((n) => 24 + noteStrings.indexOf(form.key) + n)
          : minorArr.map((n) => 24 + noteStrings.indexOf(form.key) + n);

      const indexInKey = scale.findIndex((n) => (randomNote - n) % 12 === 0);
      console.log(indexInKey);
      if (indexInKey !== -1) {
        for (let i = 0; i < randomPattern.length; i++) {
          const newNoteObj = {
            note: randomNote + majorArr[randomPattern[i]],
            isCorrect: false,
          };
          newChallenge.push(newNoteObj);
        }
      } else {
        const newRandomNote = randomNote - 1;
        for (let i = 0; i < randomPattern.length; i++) {
          const newNoteObj = {
            note: newRandomNote + majorArr[randomPattern[i]],
            isCorrect: false,
          };
          newChallenge.push(newNoteObj);
        }
      }
    }

    console.log(newChallenge);
    setChallenge(newChallenge);
    setCurrentIndex(0);
  }
  useEffect(() => {
    if (currentIndex === challenge.length) {
      setTimeout(() => {
        generateNewChallenge();
      }, 800);
    }
    if (currentIndex !== 0) startPitchDetect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="challenge-container">
      <div className="challenge-left-section">
        <h1 className="challenge-title">
          Play the following. Remember to hit the start button.
        </h1>
        <StaveComponent challenge={challenge} form={form} />
      </div>
      <div className="challenge-right-section">
        <h1 className="challenge-timer">00:00</h1>
        <button onClick={startPitchDetect} className="challenge-button">
          Start
        </button>
        <button
          type="button"
          onClick={() =>
            setToggleChallengeConfigModal(!toggleChallengeConfigModal)
          }
          className="challenge-button"
        >
          Challenge Configuration
        </button>
        <button
          type="button"
          className="challenge-button"
          onClick={generateNewChallenge}
        >
          Next
        </button>
        <ChallengeConfigModal
          toggleChallengeConfigModal={toggleChallengeConfigModal}
          setToggleChallengeConfigModal={setToggleChallengeConfigModal}
          generateNewChallenge={generateNewChallenge}
          form={form}
          setForm={setForm}
        />
      </div>
    </div>
  );
}

export default ChallengePage;
