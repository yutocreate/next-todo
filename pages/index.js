import React, { useState, useEffect, useRef } from "react";
import { db } from "../src/firebase";
import "firebase/firestore";
import Link from "next/link";
import styled from "styled-components";
import CardList from "../src/components/CardList";
import Filter from "../src/components/dynamic/Filter";



import { ExternalLinkIcon } from '@chakra-ui/icons'

let nowId = 0;
const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const inputRef = useRef(null);



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
          <SP key={todo.id} style={{ display: "flex" }}>
            <Link href={`/posts/${todo.id}`}>
              <h1 style={{margin: 0}}>
              <Sa>{todo.text}<ExternalLinkIcon mx="16px" /></Sa>
              </h1>
            </Link>
          </SP>
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
  padding-left: 32px;
  margin:0;
`;

const SP = styled.p`
display:flex;
margin: 0;
`;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
