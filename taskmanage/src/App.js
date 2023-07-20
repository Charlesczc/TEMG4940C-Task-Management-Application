import React, { useState, useEffect } from "react";
import "./App.css";

import Popup from "./Popup";
import Lists from "./Lists";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  //state
  const [todos, setTodos] = useState([]); //todo list content
  const [inprog, setInprog] = useState([]); //Inprogress list content
  const [achieved, setAchieved] = useState([]); //Achieved lsit contant
  const [popup, setPopup] = useState(false); //Pop up window state {true : Pop / fales : close}
  const [current, setCurrent] = useState(); //Facilitate search
  const [defaultValue, setDefaultValue] = useState("");
  const [defaultDes, setDefaultDes] = useState("");

  const [search, setSearch] = useState(""); //Search bar input content
  const [searchTodos, setSearchTodos] = useState([]); //Displaying todo lsit contant
  const [searchInprog, setSearchInprog] = useState([]); //Displaying inprog lsit contant
  const [searchAchieved, setSearchAchieved] = useState([]); //Displaying achieved lsit contant

  //js code & function
  //Create new todo card
  const newTodoHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: "", descript: "", id: Math.random() * 1000 }]);
    setSearch("");
  };
  //create new inprogress card
  const newInprogHandler = (e) => {
    e.preventDefault();
    setInprog([
      ...inprog,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  //create new achieved card
  const newAchievedHandler = (e) => {
    e.preventDefault();
    setAchieved([
      ...achieved,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  //filter to show searching cards
  const searchHandler = (e) => {
    //console.log(e.target.value);
    setSearch(e.target.value);
    setSearchTodos(
      todos.filter(
        (todo) =>
          todo.text.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true ||
          todo.descript.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true
      )
    );
    setSearchInprog(
      inprog.filter(
        (prog) =>
          prog.text.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true ||
          prog.descript.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true
      )
    );
    setSearchAchieved(
      achieved.filter(
        (ach) =>
          ach.text.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true ||
          ach.descript.toLowerCase().includes(e.target.value.toLowerCase()) ===
            true
      )
    );
  };
  //When the actual lists change, displaying list change
  useEffect(() => {
    setSearchTodos(todos);
    setSearchInprog(inprog);
    setSearchAchieved(achieved);
  }, [todos, inprog, achieved]);
  //Run once when start
  useEffect(() => {
    getLocal();
  }, []);
  useEffect(() => {
    saveLocal();
  }, [todos, inprog, achieved, popup]);

  //handle drag and drop of cards
  const onDragEnd = (DropResult) => {
    //console.log(DropResult);
    if (
      todos.length !== searchTodos.length ||
      inprog.length !== searchInprog.length ||
      achieved.length !== searchAchieved.length
    )
      return;
    //console.log("dragged");
    const { source, destination } = DropResult;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    let addr,
      indo = todos,
      prog = inprog,
      achi = achieved;
    if (source.droppableId === "ToDo") {
      addr = indo[source.index];
      indo.splice(source.index, 1);
    } else if (source.droppableId === "InProg") {
      addr = prog[source.index];
      prog.splice(source.index, 1);
    } else {
      addr = achi[source.index];
      achi.splice(source.index, 1);
    }
    if (destination.droppableId === "ToDo") {
      indo.splice(destination.index, 0, addr);
    } else if (destination.droppableId === "InProg") {
      prog.splice(destination.index, 0, addr);
    } else if (destination.droppableId === "Acheived") {
      achi.splice(destination.index, 0, addr);
    }
    setTodos(indo);
    setInprog(prog);
    setAchieved(achi);
    setSearchTodos(indo);
    setSearchInprog(prog);
    setSearchAchieved(achi);
    saveLocal();
  };
  //Saving actual lists content (browser)
  const saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("inprog", JSON.stringify(inprog));
    localStorage.setItem("achieved", JSON.stringify(achieved));
  };
  //load content from storage and set actual lists and display lists
  const getLocal = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    if (localStorage.getItem("inprog") === null) {
      localStorage.setItem("inprog", JSON.stringify([]));
    } else {
      setInprog(JSON.parse(localStorage.getItem("inprog")));
    }
    if (localStorage.getItem("achieved") === null) {
      localStorage.setItem("achieved", JSON.stringify([]));
    } else {
      setAchieved(JSON.parse(localStorage.getItem("achieved")));
    }
  }; //

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header>
          <h1>Task Manager</h1>
        </header>
        <div>
          <div className="upper-container">
            <input
              value={search}
              className="searchBar"
              type="text"
              placeholder="Search Here:"
              onChange={searchHandler}
            />
          </div>
          <div className="container">
            <div>
              <h2>ToDo</h2>
              {/* todo list */}
              <Lists
                items={searchTodos}
                setItems={setTodos}
                setPopup={setPopup}
                popup={popup}
                setCurrent={setCurrent}
                setDefaultValue={setDefaultValue}
                setDefaultDes={setDefaultDes}
                uid="ToDo"
              />
              {/* new card button */}
              <span onClick={newTodoHandler} className="new-btn">
                +
              </span>
            </div>
            <div>
              <h2>InProgress</h2>
              {/* in progress list */}
              <Lists
                items={searchInprog}
                setItemsTodos={setInprog}
                setPopup={setPopup}
                popup={popup}
                setCurrent={setCurrent}
                setDefaultValue={setDefaultValue}
                setDefaultDes={setDefaultDes}
                uid="InProg"
              />
              {/* new card button */}
              <span onClick={newInprogHandler} className="new-btn">
                +
              </span>
            </div>
            <div>
              <h2>Achieved</h2>
              {/* achieved list */}
              <Lists
                items={searchAchieved}
                setItems={setAchieved}
                setPopup={setPopup}
                popup={popup}
                setCurrent={setCurrent}
                setDefaultValue={setDefaultValue}
                setDefaultDes={setDefaultDes}
                uid="Acheived"
              />
              {/* new card button */}
              <span onClick={newAchievedHandler} className="new-btn">
                +
              </span>
            </div>
          </div>
          <Popup
            trigger={popup}
            setTrigger={setPopup}
            current={current}
            defaultValue={defaultValue}
            setDefaultValue={setDefaultValue}
            defaultDes={defaultDes}
            setDefaultDes={setDefaultDes}
          />
          {/* bin for removing cards */}
          <Droppable droppableId={"discard"}>
            {(provided) => (
              <div
                className="bin"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <i className="fa-solid fa-trash-can"></i>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
