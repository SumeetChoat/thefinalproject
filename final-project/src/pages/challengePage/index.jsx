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

import AssignmentReadyModal from "../../components/AssignmentReadyModal";
import { useAssignments, useAuth } from "../../contexts";
import FinishAssignmentModal from "../../components/FinishAssignmentModal";
import Stopwatch from "../../components/StopWatch";
import ToggleButton from "../../components/ToggleButton";

function ChallengePage() {
  const { currentAssignment, setCurrentAssignment } = useAssignments();
  const { user } = useAuth();
  console.log(user);
  const [round, setRound] = useState(null);
  const [mic, setMic] = useState(false);
  const [showAssignmentReadyModal, setShowAssignmentReadyModal] =
    useState(false);
  const [showFinishAssignmentModal, setShowFinishAssignmentModal] = useState();
  useEffect(() => {
    if (currentAssignment) {
      setRound(currentAssignment.round);
      const lowOctave =
        currentAssignment.range[0] < 24
          ? 0
          : Math.floor((currentAssignment.range[0] - 24) / 12) + 1;
      const lowNoteName = currentAssignment.range[0] % 12;
      const highOctave =
        currentAssignment.range[1] < 24
          ? 0
          : Math.floor((currentAssignment.range[1] - 24) / 12) + 1;
      const highNoteName = currentAssignment.range[1] % 12;
      const newForm = {
        ...form,
        clef: currentAssignment.clef,
        range: [`${lowNoteName}${lowOctave}`, `${highNoteName}${highOctave}`],
        lowNote: lowNoteName,
        lowOctave: lowOctave,
        highNote: highNoteName,
        highOctave: highOctave,
        randomNote: currentAssignment.pattern.length === 0 ? true : false,
      };
      if (currentAssignment.pattern.length > 0) {
        for (const pattern in newForm.pattern) {
          if (currentAssignment.pattern.indexOf(pattern) !== -1) {
            newForm.pattern[pattern] = true;
          } else {
            newForm.pattern[pattern] = false;
          }
        }
      }
      setForm(newForm);
      setShowAssignmentReadyModal(true);
    }
  }, [currentAssignment]);
  // state to store time
  const [time, setTime] = useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

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

      console.log(randomPattern);
      if (indexInKey !== -1) {
        console.log(randomNote);
        console.log(indexInKey);

        for (let i = 0; i < randomPattern.length; i++) {
          const newNoteObj = {
            note:
              randomNote +
              majorArr[randomPattern[i] + indexInKey] -
              majorArr[indexInKey],
            isCorrect: false,
          };
          newChallenge.push(newNoteObj);
        }
      } else {
        const newRandomNote = randomNote - 1;
        console.log(newRandomNote);
        const newIndexInKey = scale.findIndex(
          (n) => (newRandomNote - n) % 12 === 0
        );
        console.log(newIndexInKey);
        for (let i = 0; i < randomPattern.length; i++) {
          const newNoteObj = {
            note:
              newRandomNote +
              majorArr[randomPattern[i] + newIndexInKey] -
              majorArr[newIndexInKey],
            isCorrect: false,
          };
          newChallenge.push(newNoteObj);
        }
      }
    }

    setChallenge(newChallenge);
    setCurrentIndex(0);
  }
  useEffect(() => {
    if (currentIndex === challenge.length) {
      setTimeout(() => {
        if (round && currentAssignment) {
          if (round === currentAssignment.rounds) {
            setShowFinishAssignmentModal(true);
            return;
          }
          setRound((prev) => prev + 1);
        }
        generateNewChallenge();
      }, 800);
    }
    if (currentIndex !== 0) startPitchDetect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="challenge-wrapper">
      <img
        src="content-background3.JPG"
        alt="background"
        className="content-background"
      />

      <div className="challenge-container">
        {currentAssignment && (
          <AssignmentReadyModal
            showAssignmentReadyModal={showAssignmentReadyModal}
            setShowAssignmentReadyModal={setShowAssignmentReadyModal}
            generateNewChallenge={generateNewChallenge}
            setRound={setRound}
            setIsRunning={setIsRunning}
          />
        )}

        <div className="challenge-left-section">
          <StaveComponent challenge={challenge} form={form} />
        </div>
        <div className="challenge-right-section">
          <div className="mic-setting-section">
            <ToggleButton
              mic={mic}
              setMic={setMic}
              startPitchDetect={startPitchDetect}
            />
            <label htmlFor="mic" className="mic-setting-section-text-label">
              Mic
            </label>
          </div>
          <button
            className="challenge-config-modal-button"
            onClick={() => setToggleChallengeConfigModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 20 20"
              height="20"
              fill="none"
              className="challenge-config-modal-button-svg-icon"
            >
              <g strokeWidth="1.5" strokeLinecap="round" stroke="#5d41de">
                <circle r="2.5" cy="10" cx="10"></circle>
                <path
                  fillRule="evenodd"
                  d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 
                  1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 
                  3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 
                  1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            <span className="challenge-config-modal-label">
              Challenge Settings
            </span>
          </button>
          {round ? (
            <div className="assignment-detail">
              <h1>Assignment</h1>
              <h3>
                Round {round}/{currentAssignment.rounds}
              </h3>
            </div>
          ) : (
            <div className="assignment-detail span-2 challenge-instruction">
              <h1 className="challenge-title">Challenge Mode</h1>
              <div className="">
                <p>Activate your microphone</p>
                <p>Configure the pattern on Challenge settings</p>
                <p>Press Next Challenge if you wish to move on</p>
              </div>
            </div>
          )}
          {currentAssignment && (
            <Stopwatch
              time={time}
              setTime={setTime}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          )}

          {round && currentAssignment && (
            <button
              className="challenge-button next-challenge-button"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to quit the current assignment? Your progress will not be saved."
                  )
                ) {
                  setCurrentAssignment(null);
                  setRound(null);
                  setChallenge([
                    { note: 60, isCorrect: false },
                    { note: 62, isCorrect: false },
                    { note: 64, isCorrect: false },
                    { note: 65, isCorrect: false },
                  ]);
                  setIsRunning(false);
                  setTime(0);
                } else {
                  return;
                }
              }}
            >
              Quit Assignment
            </button>
          )}
          {!round && !currentAssignment && (
            <>
              <button
                type="button"
                className="challenge-button next-challenge-button"
                onClick={() => {
                  if (round && currentAssignment) {
                    setRound((prev) => prev + 1);
                  }
                  generateNewChallenge();
                }}
              >
                Next Challenge
              </button>
            </>
          )}
          <ChallengeConfigModal
            toggleChallengeConfigModal={toggleChallengeConfigModal}
            setToggleChallengeConfigModal={setToggleChallengeConfigModal}
            generateNewChallenge={generateNewChallenge}
            form={form}
            setForm={setForm}
          />
          <FinishAssignmentModal
            showFinishAssignmentModal={showFinishAssignmentModal}
            setShowFinishAssignmentModal={setShowFinishAssignmentModal}
          />
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;
