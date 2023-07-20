import React from "react";
import "./Popup.css";

//closing pop up window
function Popup(props) {
  const closeHandler = (e) => {
    e.preventDefault();
    props.setTrigger(false);
  };
  //when task title input field changes, update target card value in real time
  const inputTaskHandler = (e) => {
    props.current.text = e.target.value;
    props.setDefaultValue(props.current.text);
  };
  //when task detail input field changes, update target card value in real time
  const inputDesHandler = (e) => {
    props.current.descript = e.target.value;
    props.setDefaultDes(props.current.descript);
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/*button for closing pop up edit window */}
        <button className="close-btn" onClick={closeHandler}>
          x
        </button>
        {/* {props.children} */}
        <ul>
          {/*input field for task title*/}
          <input
            className="task"
            placeholder="Enter your task here"
            onChange={inputTaskHandler}
            value={props.defaultValue}
            type="text"
          ></input>
          {/*input field for task detail*/}
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
