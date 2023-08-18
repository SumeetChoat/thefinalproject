/* eslint-disable react/prop-types */
import "./styles.css";

function ToggleButton({ mic }) {

  function handleChange(){
    //
  }

  return (
    <div className="button r" id="button-1">
      <input type="checkbox" className="checkbox" checked={mic} onChange={()=>handleChange()}/>
      <div className="knobs"></div>
      <div className="layer"></div>
    </div>
  );
}

export default ToggleButton;
