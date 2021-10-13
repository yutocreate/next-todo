import Link from "next/link";
import React, { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <>
      <h1>Auth動作確認</h1>
      <form onSubmit={signup}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type={"submit"}>登録</button>
      </form>
      <Link href="/page1">
        <a>Todoへ</a>
      </Link>
    </>
  );
};

export default Home;
