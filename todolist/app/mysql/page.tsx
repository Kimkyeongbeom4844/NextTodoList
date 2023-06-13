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
  } = useGetListQuery(null);
  const [postList, { isLoading: postListLoading }] = usePostListMutation();
  const [deleteList, { isLoading: deleteListLoading }] =
    useDeleteListMutation();
  const onSubmitInputText = async (e: React.FormEvent<any>) => {
    try {
      e.preventDefault();
      await postList({ title: inputText }).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setInputText("");
    }
  };
  const onClickDeleteButton = async (e: React.MouseEvent<any>) => {
    try {
      await deleteList({ id: e.currentTarget.dataset.id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeInputText = (e: React.ChangeEvent<any>) => {
    setInputText(e.currentTarget.value);
  };
  return (
    <>
      <form onSubmit={onSubmitInputText}>
        <input required value={inputText} onChange={onChangeInputText} />
        <button>추가</button>
      </form>
      {getListLoading || postListLoading || deleteListLoading ? (
        <p>로딩중</p>
      ) : getListError ? (
        <p>DB가 없습니다.</p>
      ) : getListData ? (
        <>
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
    </>
  );
}
