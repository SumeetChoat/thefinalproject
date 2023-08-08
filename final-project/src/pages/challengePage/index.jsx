import { useEffect, useState } from "react";
import { autoCorrelate } from "../../lib/pitchDetection";
import StaveComponent from "../../components/StaveComponent";
import "./style.css";
function ChallengePage() {
  const [challengeLength, setChallengeLength] = useState(4);
  const [range, setRange] = useState([65, 75]);
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
        console.log(note);
        const newState = [...challenge];
        newState[currentIndex].isCorrect = true;
        setChallenge(newState);
        if (currentIndex < challenge.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    window.requestAnimationFrame(updatePitch);
  }
  function generateNewChallenge() {
    const newChallenge = [];
    localStorage.getItem("accidentals") &&
      localStorage.removeItem("accidentals");
    localStorage.setItem("accidentals", "");
    for (let i = 0; i < challengeLength; i++) {
      const localStorageAccidental = localStorage.getItem("accidentals");
      Math.random() > 0.5
        ? localStorage.setItem("accidentals", localStorageAccidental + "#")
        : localStorage.setItem("accidentals", localStorageAccidental + "b");
      const randomNote =
        Math.floor(Math.random() * (range[1] - range[0])) + range[0];
      const newNoteObj = { note: randomNote, isCorrect: false };
      newChallenge.push(newNoteObj);
    }

    setChallenge(newChallenge);
    setCurrentIndex(0);
  }
  useEffect(() => {
    startPitchDetect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="challenge-container">
      <div className="challenge-left-section">
        <h1 className="challenge-title">
          Play the following. Remember to hit the start button.
        </h1>
        <StaveComponent challenge={challenge} />
      </div>
      <div className="challenge-right-section">
        <h1 className="challenge-timer">00:00</h1>
        <button onClick={startPitchDetect} className="challenge-button">
          Start
        </button>
        <button
          type="button"
          className="challenge-button"
          onClick={generateNewChallenge}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ChallengePage;
