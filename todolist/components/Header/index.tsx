"use client";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header_wrap}>
      <h1 className={styles.header_title}>Next로 만들어본 투두리스트</h1>
      <button onClick={() => router.push("/")}>redux 투두리스트</button>
      <button onClick={() => router.push("/mysql")}>mysql 투두리스트</button>
    </header>
  );
}
