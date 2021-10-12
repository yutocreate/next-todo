import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react"

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
      <ButtonGroup onClick={cancel} variant="outline" spacing="6">
       <Button onClick={update} colorScheme="blue">更新</Button>
      <Button style={{cursor: "pointer"}}>キャンセル</Button>
      </ButtonGroup>
    </>
  );
};

export default Filter;
