import React from "react";

import DeleteIcon from '@mui/icons-material/Delete';


const CardList = (props) => {
  const { text } = props;

  const edit = () => {
    const { id, editing, todoEdit } = props;
    todoEdit(id, !editing);
  };

  const remove = () => {
    const { id, deleteTodo } = props;
    deleteTodo(id);
  };

  return (
    <div style={{display: "flex"}}>
      <h1>{text}</h1>
      <DeleteIcon fontSize="large" onClick={remove}>削除</DeleteIcon>
      <button onClick={edit}>編集</button>
    </div>
  );
};

export default CardList;
