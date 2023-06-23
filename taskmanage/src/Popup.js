import React from "react";
import "./Popup.css";

function Popup(props) {
  const closeHandler = (e) => {
    e.preventDefault();
    props.setTrigger(false);
  };
  const inputTaskHandler = (e) => {
    //console.log(e.target.value);
    props.current.text = e.target.value;
    props.setDefaultValue(props.current.text);
  };
  const inputDesHandler = (e) => {
    //console.log(e.target.value);
    props.current.descript = e.target.value;
    props.setDefaultDes(props.current.descript);
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={closeHandler}>
          x
        </button>
        {/* {props.children} */}
        <ul>
          <input
            className="task"
            placeholder="Enter your task here"
            onChange={inputTaskHandler}
            value={props.defaultValue}
            type="text"
          ></input>
          <textarea
            className="description"
            placeholder="Enter task description here"
            onChange={inputDesHandler}
            value={props.defaultDes}
            type="text"
          ></textarea>
        </ul>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
