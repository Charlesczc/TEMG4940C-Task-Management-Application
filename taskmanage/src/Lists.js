import React from "react";

import Listitem from "./Listitem";
import { Droppable } from "react-beautiful-dnd";

const Lists = ({
  popup,
  items,
  setItems,
  setPopup,
  setCurrent,
  setDefaultValue,
  setDefaultDes,
  uid,
}) => {
  // console.log(items);
  return (
    <div className="sub-container">
      <Droppable droppableId={uid}>
        {(provided) => (
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/*//list of cards in corresponding list*/}
            {items.map((item, index) => (
              <Listitem
                setPopup={setPopup}
                text={item.text}
                popup={popup}
                item={item} //
                setCurrent={setCurrent}
                setDefaultValue={setDefaultValue}
                setDefaultDes={setDefaultDes}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
