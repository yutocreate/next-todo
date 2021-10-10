import Head from "next/head";
import styles from "../styles/Home.module.css";
import { db } from "../src/firebase";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import {TextField} from "@material-ui/core";

export default function Home() {
  const [todo, setTodos] = useState('')
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

  const textOnChange = (e) => {
    setTodos(e.target.value)
  }

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <>
      <TextField autoFocus value={todo} onChange={textOnChange}/>
      <div className={styles.container}>
        <ol>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ol>
      </div>
    </>
  );
}
