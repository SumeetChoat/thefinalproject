import "./App.css";
import StaveComponent from "./components/StaveComponent";
import { useEffect, useState } from "react";
import { autoCorrelate } from "./lib/pitchDetaction";
function App() {
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

  window.onload = function () {
    audioContext = new AudioContext();
  };

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
        setCurrentIndex((prev) => prev + 1);
      }
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    window.requestAnimationFrame(updatePitch);
  }
  console.log(currentIndex);
  useEffect(() => {
    startPitchDetect();
  }, [currentIndex]);
  return (
    <>
      <button onClick={startPitchDetect}>Start</button>
      <StaveComponent challenge={challenge} />
    </>
  );
}

export default App;
