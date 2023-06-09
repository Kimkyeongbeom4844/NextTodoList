"use client";
import React, { useState } from "react";
import type { RootState } from "@/stores";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "@/stores/counter";

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(0);
  const test = (e: { currentTarget: { value: string | number } }) => {
    setInputValue(Number(e.currentTarget.value));
  };
  const up = () => {
    dispatch(incrementByAmount(inputValue));
  };
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <input type={"number"} value={inputValue} onChange={test} />
        <button onClick={up}>IncrementByAmount</button>
      </div>
    </div>
  );
};
export default Home;
