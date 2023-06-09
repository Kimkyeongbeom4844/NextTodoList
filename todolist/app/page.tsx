"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores";
import { addList, deleteList } from "@/stores/list";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const listStore = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  const onChangeInputText = (e: Event) => {
    setInputText(e.target.value);
  };
  const onSubmitInputText = (e: Event) => {
    e.preventDefault();
    dispatch(addList(inputText));
    setInputText("");
  };
  const onClickDeleteButton = (e: Event) => {
    dispatch(deleteList(e.currentTarget.dataset.index));
  };
  return (
    <>
      <form onSubmit={onSubmitInputText}>
        <input required value={inputText} onChange={onChangeInputText} />
        <button>추가</button>
      </form>
      <ul>
        {listStore.list.map((v, i) => (
          <li key={i}>
            {v}
            <button data-index={i} onClick={onClickDeleteButton}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
