import React, { useState, useEffect, useRef } from "react";
import { db } from "../src/firebase/firebase";
import "firebase/firestore";
import Link from "next/link";
import styled from "styled-components";

import { Heading } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Input } from "@chakra-ui/react"

const Page1 = () => {
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
      <Heading size="lg" fontSize="50px" m={2}>
  Next.js Todoアプリ
</Heading>
      <form onSubmit={handleSubmit}>
        <Input placeholder="todoを追加" type="text"
          ref={inputRef}
          value={todo}
          onChange={change} />
      </form>
      {todos.map((todo) => {
        return (
          <SP key={todo.id} style={{ display: "flex" }}>
              <p style={{margin: 0}}>
            <Link href={`/posts/${todo.id}`} >
              <a>{todo.text}</a></Link><ExternalLinkIcon mx="16px" />
              </p>
          </SP>
        );
      })}
      <Link href="/"><a>ログインページへ</a></Link>
    </>
  );
};

export default Page1;

const Sa = styled.a`
  display: flex;
  margin: 4px;
  cursor: pointer;
  padding-left: 32px;
  margin:0;
`;

const SP = styled.h1`
display:flex;
margin: 0;
`;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
