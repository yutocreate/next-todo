import React, { useState } from "react";
import { signinWithEmailAndPassword } from "../src/firebase/firebase";
import Link from "next/link";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e) => {
    e.preventDefault();
    const user = await signinWithEmailAndPassword(email, password);
    // console.log(user.user.emailVerified)
    // setEmail('')
    // setPassword('')
  };

  return (
    <>
      <h1>ログインページ</h1>
      <form onSubmit={signin}>
        <input
          type="text"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {userr.user.emailVerified ? (
          <button type={"submit"}>
            <Link href="/page1">
              <a>ログイン</a>
            </Link>
          </button>
        ) : ( */}
          <button type={"submit"}>ログイン</button>
        {/* )} */}
      </form>
      <Link href="/page1">
        <a>Todoへ</a>
      </Link>
    </>
  );
};

export default Signin;
