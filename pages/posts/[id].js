import { db } from "../../src/firebase";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Post = ({ id }) => {
  const [todos, setTodos] = useState([])
  console.log(todos)

  useEffect(() => {

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

  
 
  

  return (
    <>
      <h1>todoID: {id}</h1>
      {todos.map((todo) => {
        if(todo.id === id) {
          return (
            <p key={id}>todoText:{todo.text} </p>
          )
        }
      })}
      <Link href="/">Back</Link>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const snapshot = await db.collection("todos").get();
  return {
    paths: snapshot.docs.map((doc) => ({
      params: {
        id: doc.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  return {
    props: { id },
  };
};
