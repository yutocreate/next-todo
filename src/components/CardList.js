import React from "react";

const CardList = (props) => {
  const {text } = props;

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
      <p>{text}</p>
      <button onClick={remove}>削除</button>
      <button onClick={edit}>編集</button>
    </>
  );
};

export default CardList;
