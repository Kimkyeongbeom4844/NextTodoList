"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();
  return (
    <header className={styles.header_wrap}>
      <h1 className={styles.header_title}>Next로 만들어본 투두리스트</h1>
      <button onClick={() => router.push("/")}>redux 투두리스트</button>
      <button onClick={() => router.push("/count")}>mysql 투두리스트</button>
    </header>
  );
};

export default Header;
