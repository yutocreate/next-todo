import Link from "next/link";
import React, { useState } from "react";

const Home = () => {

  return (
    <>
      <h1>TODOAPP</h1>
      <Link href="/signup"><a>新規登録用フォームへ</a></Link>
      <br />
      <Link href="/signin"><a>ログインフォームへ</a></Link>
    <br />
      <Link href="/page1">
        <a>Todoへ</a>
      </Link>
    </>
  );
};

export default Home;
