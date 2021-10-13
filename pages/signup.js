import React, {useState} from 'react'
import {  signupWithEmailAndPassword} from "../src/firebase/firebase"
import Link from "next/link"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    const user = await signupWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
    <h1>新規ユーザー登録</h1>
    <form onSubmit={signup}>
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
        <button type={"submit"}>登録</button>
      </form>
      <div style={{display: "flex"}}>
      <h1>続けてログインする</h1>
      <button style={{cursor: "pointer",marginTop: "16px"}}><Link href="/signin">ログインページへ</Link></button>
      </div>
    </>
  )
}

export default Signup
