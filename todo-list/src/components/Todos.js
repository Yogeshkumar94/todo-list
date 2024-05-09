import React, { useState, useRef, useEffect } from "react";

export default function Todos() {
  const [todo, setTodo] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [id, setId] = useState("");
  const todoRef = useRef();

  useEffect(() => {
    todoRef.current.value = "";
  }, [isAdded]);
  // todoRef && console.log(todoRef?.current?.value);
  function addTask() {
    if (todoRef.current.value !== "") {
      setTodo((prevtodos) => {
        return [
          ...prevtodos,
          { id: new Date(), text: todoRef.current.value, isChecked: false },
        ];
      });
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 500);
  }

  function deleteChecked(tid) {
    const newtodo = todo.filter((td) => !td.isChecked);
    setTodo(newtodo);
  }
  function editTask(t) {
    const tt = t.text;
    todoRef.current.value = tt;
    const newtodo = todo.filter((td) => t.id !== td.id);
    setTodo(newtodo);
  }

  return (
    <div>
      <div id="inputDiv">
        <input id="taskInput" ref={todoRef} type="text"></input>
      </div>
      <div id="upperButtons">
        <button type="submit" id="addTodo" onClick={addTask}>
          Add task
        </button>
        <button onClick={deleteChecked}>Delete checked tasks</button>
      </div>
      <div className="todoItem">
        {todo.map((t) => {
          return (
            <div className="centerAlign" key={t.id}>
              <input
                name={t}
                onClick={(e) => {
                  const thisTodo = todo.find((th) => th.id === t.id);
                  thisTodo.isChecked = e.target.checked;
                  const newTodos = todo.filter((th) => th.id !== t.id);
                  newTodos.push(thisTodo);
                  setTodo(newTodos);
                }}
                type="checkbox"
              />
              {editing && id === t.id ? (
                <div>
                  <input
                    id="editInput"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    type="text"
                  />
                  <button
                    onClick={() => {
                      setEditing(false);
                      setId("");
                      t.text = editText;
                    }}
                  >
                    update
                  </button>
                </div>
              ) : (
                <label htmlFor={t}>{t.text}</label>
              )}
              {/* <button className="editButton" onClick={() => editTask(t)}>
              Edit
            </button> */}
              <button
                className="editButton"
                onClick={() => {
                  setEditing(!editing);
                  setEditText(t.text);
                  setId(t.id);
                }}
              >
                Edit
              </button>
              <button
                className="deleteButton"
                name={t}
                onClick={(e) => {
                  const newtodo = todo.filter((td) => t.id !== td.id);
                  setTodo(newtodo);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
