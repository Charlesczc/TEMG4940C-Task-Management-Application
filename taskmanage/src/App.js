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
  const [current, setCurrent] = useState();
  const [defaultValue, setDefaultValue] = useState("");
  const [defaultDes, setDefaultDes] = useState("");

  const [search, setSearch] = useState(""); //Search bar input content
  const [searchTodos, setSearchTodos] = useState([]); //Displaying todo lsit contant
  const [searchInprog, setSearchInprog] = useState([]); //Displaying inprog lsit contant
  const [searchAchieved, setSearchAchieved] = useState([]); //Displaying achieved lsit contant

  //js code & function
  const newTodoHandler = (e) => {
    //Create new todo card
    e.preventDefault();
    setTodos([...todos, { text: "", descript: "", id: Math.random() * 1000 }]);
    setSearch("");
  };
  const newInprogHandler = (e) => {
    //create new inprogress card
    e.preventDefault();
    setInprog([
      ...inprog,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  const newAchievedHandler = (e) => {
    //create new achieved card
    e.preventDefault();
    setAchieved([
      ...achieved,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  const searchHandler = (e) => {
    //filter to show searching cards
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
  useEffect(() => {
    //When the actual lists change, displaying list change
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

  const onDragEnd = (DropResult) => {
    console.log(DropResult);
    // if (
    //   todos.length !== searchTodos.length ||
    //   inprog.length !== searchInprog.length ||
    //   achieved.length !== searchAchieved.length
    // ) {
    //   window.alert("Please empty the search bar before reordering.");
    //   return;
    // }
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
  const getLocal = () => {
    //load content from storage and set actual lists and display lists
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
  };

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
              <h2>ToDo</h2> {/*Todo list*/}
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
              <span onClick={newTodoHandler} className="new-btn">
                {" "}
                {/*New card button*/}+
              </span>
            </div>
            <div>
              <h2>InProgress</h2> {/*Inprogress list*/}
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
              <span onClick={newInprogHandler} className="new-btn">
                {" "}
                {/*New card button*/}+
              </span>
            </div>
            <div>
              <h2>Achieved</h2> {/*Achieved list*/}
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
              <span onClick={newAchievedHandler} className="new-btn">
                {" "}
                {/*New card button*/}+
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
          <Droppable droppableId={"discard"}>
            {" "}
            {/*Bin for removing cards*/}
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
