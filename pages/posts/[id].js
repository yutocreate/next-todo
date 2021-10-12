import { db } from "../../src/firebase";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CardDetailButton from "../../src/components/CardDetailButton";
import Filter from "../../src/components/Filter";

const Post = ({ id }) => {
  const [todos, setTodos] = useState([]);
  console.log(todos);

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

  const todoEdit = (id, editing) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: editing };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = async (id) => {
    await db.collection("todos").doc(id).delete();
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
      <h1>todoID: {id}</h1>
      {todos.map((todo) => {
        if (todo.id === id) {
          return (
            <div key={todo.id}>
              {todo.editing ? (
                <Filter
                  id={todo.id}
                  text={todo.text}
                  editing={todo.editing}
                  changeText={changeText}
                  editCancel={editCancel}
                  editUpdate={editUpdate}
                />
              ) : (
                <CardDetailButton
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  editing={todo.editing}
                  todoEdit={todoEdit}
                  deleteTodo={deleteTodo}
                />
              )}
            </div>
          );
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
