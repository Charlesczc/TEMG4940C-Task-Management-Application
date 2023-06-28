import React, { useState, useEffect } from "react";
import "./App.css";

import Popup from "./Popup";
import Lists from "./Lists";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  //state
  const [todos, setTodos] = useState([]);
  const [inprog, setInprog] = useState([]);
  const [achieved, setAchieved] = useState([]);
  const [popup, setPopup] = useState(false);
  const [current, setCurrent] = useState();
  const [defaultValue, setDefaultValue] = useState("");
  const [defaultDes, setDefaultDes] = useState("");

  const [search, setSearch] = useState("");
  const [searchTodos, setSearchTodos] = useState([]);
  const [searchInprog, setSearchInprog] = useState([]);
  const [searchAchieved, setSearchAchieved] = useState([]);

  //js code & function
  const newTodoHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: "", descript: "", id: Math.random() * 1000 }]);
    setSearch("");
  };
  const newInprogHandler = (e) => {
    e.preventDefault();
    setInprog([
      ...inprog,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  const newAchievedHandler = (e) => {
    e.preventDefault();
    setAchieved([
      ...achieved,
      { text: "", descript: "", id: Math.random() * 1000 },
    ]);
    setSearch("");
  };
  const searchHandler = (e) => {
    console.log(e.target.value);
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
    setSearchTodos(indo); //??
    setSearchInprog(prog);
    setSearchAchieved(achi);
    saveLocal();
  };
  //Save
  const saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("inprog", JSON.stringify(inprog));
    localStorage.setItem("achieved", JSON.stringify(achieved));
  };
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
                +
              </span>
            </div>
            <div>
              <h2>InProgress</h2>
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
                +
              </span>
            </div>
            <div>
              <h2>Achieved</h2>
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
