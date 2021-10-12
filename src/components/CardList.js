import React from "react";
import Link from "next/link"

const CardList = (props) => {
  const {id, text } = props;

  const edit = () => {
    const { id, editing, todoEdit } = props;
    todoEdit(id, !editing);
  };

  const remove = () => {
    const {id, deleteTodo} = props
    deleteTodo(id)
  }

  return (
    <>
      <Link href={`/posts/${id}`}><a>{text}</a></Link>
      <button onClick={remove}>削除</button>
      <button onClick={edit}>編集</button>
    </>
  );
};

export default CardList;
