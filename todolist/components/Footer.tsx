import React from "react";
import Image from "next/image";
import logo from "@/public/devJeans.png";
import styles from "./Footer.module.css";

const Footer = () => {
  const link = "https://github.com/Kimkyeongbeom4844/NextTodoList";
  return (
    <footer className={styles.footer_wrap}>
      <Image src={logo} alt="개발진스" width={150} priority />
      <div>
        made by
        <a href={link} target={"_blank"}>
          kimkyeongbeom4844
        </a>
      </div>
    </footer>
  );
};

export default Footer;
