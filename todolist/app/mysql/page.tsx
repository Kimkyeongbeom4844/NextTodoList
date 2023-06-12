"use client";
import {
  useGetListQuery,
  useDeleteListMutation,
  usePostListMutation,
} from "@/stores/mysqlList";
import React, { useState } from "react";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const {
    data: getListData,
    error: getListError,
    isLoading: getListLoading,
    isFetching: getListFetching,
  } = useGetListQuery(null);
  const [addList, { isLoading: addListLoading }] = usePostListMutation();
  const [deleteList, { isLoading: deleteListLoading }] =
    useDeleteListMutation();
  const onSubmitInputText = async (e: React.FormEvent<any>) => {
    try {
      e.preventDefault();
      await addList({ title: inputText }).unwrap();
      setInputText("");
    } catch (error) {
      console.error(error);
    }
  };
  const onClickDeleteButton = async (e: React.MouseEvent<any>) => {
    try {
      await deleteList(e.currentTarget.dataset.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeInputText = (e: React.ChangeEvent<any>) => {
    setInputText(e.currentTarget.value);
  };
  return (
    <>
      <div>
        {getListError ? (
          <p>DB가 없습니다.</p>
        ) : getListLoading || getListFetching ? (
          <p>로딩중</p>
        ) : getListData ? (
          <>
            <form onSubmit={onSubmitInputText}>
              <input required value={inputText} onChange={onChangeInputText} />
              <button>추가</button>
            </form>
            <ul>
              {getListData.map((v, i) => (
                <li key={i}>
                  {v.title}
                  <button data-id={v.id} onClick={onClickDeleteButton}>
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </>
  );
}
