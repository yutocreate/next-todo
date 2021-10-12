import React, { useState, useEffect, useRef } from "react";
import { db } from "../src/firebase";
import "firebase/firestore";
import Link from "next/link";
import styled from "styled-components";
import CardList from "../src/components/CardList";
import Filter from "../src/components/Filter";

let nowId = 0;
const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const inputRef = useRef(null);

  // console.log(todos);

  const change = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();

    const unSub = db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          editing: doc.data().editing,
          completed: doc.data().completed,
        }))
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
    firestoreAdd(newTodo);
  };

  //Enterを押した時にFirestoreにTodoを追加する
  const firestoreAdd = async (newTodo) => {
    db.collection("todos").add({
      text: newTodo.text,
      editing: newTodo.editing,
      completed: newTodo.completed,
    });
  };

  //Todoを追加する時の挙動
  const handleSubmit = (e) => {
    if (todo === "") return;
    e.preventDefault();
    onSubmit(todo);
    setTodo("");
  };

  //Todoの削除
  const deleteTodo = async (id) => {
    await db.collection("todos").doc(id).delete();
  };

  //編集モードをオンにする
  const todoEdit = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //編集をキャンセルする
  const editCancel = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //編集の時にTodoのTextを変更する
  const changeText = (id, edit) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: edit };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //編集時の更新ボタンの挙動
  const editUpdate = async (id, editing, text) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
    await db.collection("todos").doc(id).update({
      text: text,
    });
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
      {todos.map((todo) => {
        return (
          <div key={todo.id} style={{ display: "flex" }}>
            <Link href={`/posts/${todo.id}`}>
              <a>{todo.text}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Home;

const Sa = styled.a`
  display: flex;
  margin: 4px;
  cursor: pointer;
`;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
