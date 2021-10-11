import React from "react";

const Filter = (props) => {
  const {text} = props

  const change = (e) => {
    const {id,changeText} = props
    changeText(id, e.target.value)
  }

  const update = (e) => {
    const {id, editing, editUpdate,text} = props
    editUpdate(id, !editing, text)
  }

  const cancel = () => {
    const {id, editing, editCancel} = props
    editCancel(id, !editing)
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={text}
          onChange={change}
        />
      </form>
      <button onClick={update}>更新</button>
      <button onClick={cancel}>編集キャンセル</button>
    </>
  );
};

export default Filter;
