/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./styles.css";
const Stopwatch = ({ time, setTime, isRunning }) => {
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 100), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-time">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
    </div>
  );
};

export default Stopwatch;
