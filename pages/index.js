import React, { useState, useEffect, useRef } from "react";
import { db } from "../src/firebase";
import "firebase/firestore";
import Link from "next/link";
import styled from "styled-components";

let nowId = 0;
const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

  const inputRef = useRef(null);

  console.log(todos);

  const change = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();

    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const onSubmit = (todoText) => {
    const newTodo = {
      id: nowId,
      text: todoText,
      editing: false,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    nowId += 1;
  };

  const handleSubmit = (e) => {
    if (todo === "") return;
    e.preventDefault();
    onSubmit(todo);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const todoEdit = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const editCancel = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const chagneText = (edit, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: edit };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const editUpdate = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <h1>NextTodoアプリ</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="todoを追加"
          value={todo}
          onChange={change}
        />
      </form>

      {todos.map(({ id, text, editing }) => {
        return (
          <div key={id} style={{ display: "flex" }}>
            {editing ? (
              <>
                <form>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => chagneText(e.target.value, id)}
                  />
                </form>
                <button onClick={() => editUpdate(id, !editing)}>更新</button>
                <button onClick={() => editCancel(id, !editing)}>
                  編集キャンセル
                </button>
              </>
            ) : (
              <>
                <p>{text}</p>
                <button onClick={() => deleteTodo(id)}>削除</button>
                <button onClick={() => todoEdit(id, !editing)}>編集</button>
              </>
            )}
          </div>
        );
      })}

      <div>
        {tasks.map((task) => (
          <Link href="/page1" key={task.id}>
            <a style={{ margin: "4px" }}>{task.title}</a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;

const a = styled.a`
  display: flex;
  margin: 4px;
  cursor: pointer;
`;
