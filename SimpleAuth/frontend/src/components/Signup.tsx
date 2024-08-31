import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Signup() {
  const [email, setEmail] = useState<String>();
  const [username, setUsername] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [confirmPassword, setConfirmPassword] = useState<String>();
  const [match, setMatch] = useState<String>("match");

  const navigate = useNavigate();

  const registerUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMatch("noMatch");
      return;
    }

    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 200) {
      console.log("logged in ");
      navigate("/Login");
    }
  };
  return (
    <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center">
      <form
        className=" bg-zinc-800 w-96 p-7 rounded-xl gap-4 flex flex-col text-white"
        onSubmit={registerUser}
      >
        <label htmlFor="email" className="block p-1 ">
          Enter your email:
        </label>
        <input
          name="email"
          type="email "
          id="email"
          className="rounded-md border-2 w-full p-1 focus:outline-none text-black "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username" className="block p-1 ">
          Enter your username:
        </label>
        <input
          name="username"
          type="text"
          className="rounded-md border-2  w-full  p-1 focus:outline-none text-black "
          maxLength={8}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="block p-1  ">
          Enter your password:
        </label>
        <input
          name="password"
          type="password"
          className="rounded-md border-2 w-full p-1 focus:outline-none text-black  "
          // minLength={8}
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setMatch("match");
          }}
        />
        {match === "noMatch" ? (
          <div className="relative -top-4 text-xs left-2 text-red-500  ">
            ! password do not not match
          </div>
        ) : (
          <></>
        )}

        <label htmlFor="confirmPassword" className="block p-1">
          Confirm your password:
        </label>
        <input
          name="confirmPassword"
          type="password"
          className="rounded-md border-2 w-full p-1 focus:outline text-black"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setMatch("match");
          }}
          // minLength={8}
          required
        />
        <input
          type="submit"
          className="bg-blue-400 p-1 rounded-md border-1 shadow-md shadow-zinc-700 border-black active:bg-blue-600 m-10 font-semibold "
          value="Sign up"
        />
        <h1 className="text-center">OR</h1>
        <a
          className="bg-blue-400 p-1 rounded-md border-1 shadow-md shadow-zinc-700 border-black active:bg-blue-600 m-10 font-semibold text-center"
          href="/login"
        >
          Login
        </a>
      </form>
    </div>
  );
}
