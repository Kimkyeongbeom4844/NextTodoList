"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/stores";
import { addList, deleteList } from "@/stores/list";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const listStore = useSelector((state: RootState) => state.list);
  const dispatch: AppDispatch = useDispatch();

  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onSubmitInputText = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(addList(inputText));
    setInputText("");
  };
  const onClickDeleteButton = (e: React.SyntheticEvent<any>) => {
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
}
