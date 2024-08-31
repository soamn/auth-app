import React, { useState } from "react";
import "../index.css";

export default function Login() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [invalid, setInvalid] = useState(false);
  const loginUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      setInvalid(false);
      window.alert("LOGIN SUCCESSFULL");
    } else {
      setInvalid(true);
    }
  };
  return (
    <>
      <div className="bg-zinc-900 w-screen h-screen flex justify-center content-center items-center">
        <form
          className=" bg-zinc-800 w-96 p-7 rounded-xl gap-4 flex flex-col text-white "
          onSubmit={loginUser}
        >
          <label htmlFor="email" className="block p-1 ">
            Enter your email:
          </label>
          <input
            name="email"
            type="email "
            id="email"
            required
            className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
            }}
          />

          <label htmlFor="password" className="block p-1  ">
            Enter your password:
          </label>
          <input
            name="password"
            type="password"
            className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
            //   minLength={8}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalid(false);
            }}
          />
          {invalid ? (
            <div className="relative  text-xs -top-4 left-2 text-red-500  ">
              Invalid Credentials !!
            </div>
          ) : (
            <></>
          )}
          <input
            type="submit"
            className="bg-blue-400 p-1 rounded-md border-1 shadow-md shadow-zinc-700 border-black active:bg-blue-600 m-10 font-semibold"
            value="Login"
          />
          <h1 className="text-center">OR</h1>
          <a
            className="bg-blue-400 p-1 rounded-md border-1 shadow-md shadow-zinc-700 border-black active:bg-blue-600 m-10 font-semibold text-center"
            href="/"
          >
            Signup
          </a>
        </form>
      </div>
    </>
  );
}
