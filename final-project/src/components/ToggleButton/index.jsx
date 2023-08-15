/* eslint-disable react/prop-types */
import "./styles.css";

function ToggleButton({ mic }) {
  return (
    <div className="button r" id="button-1">
      <input type="checkbox" className="checkbox" checked={mic} />
      <div className="knobs"></div>
      <div className="layer"></div>
    </div>
  );
}

export default ToggleButton;
