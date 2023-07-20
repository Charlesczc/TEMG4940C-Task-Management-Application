import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Listitem = ({
  popup,
  setPopup,
  text,
  item,
  setCurrent,
  setDefaultValue,
  setDefaultDes,
  index,
}) => {
  const clickHandler = (e) => {
    //pop up window for editing task and detail after double click on target card
    if (e.detail === 2) {
      setPopup(true);
      setCurrent(item);
      setDefaultValue(item.text);
      setDefaultDes(item.descript);
    }
  };
  return (
    <Draggable index={index} draggableId={item.id.toString()} key={item.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span onClick={clickHandler} className="cards">
            {text ? text : "Double Click to Edit"}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Listitem;
