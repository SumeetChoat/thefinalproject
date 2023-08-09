import React from "react";
import { Link } from 'react-router-dom';

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  message,
  setMessage,
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear(); //?

    if (email.length > 0 && password.length > 0) {
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token))
        setMessage('User logged in successfully.');
        setTimeout(() => {
          setMessage('')
          window.location = "/"
        }, 300);
      })
      .catch((err) => {
        console.log(err)
        setMessage('Invalid email or password.');
        setTimeout(() => {
          setMessage('')
        }, 5000)
      });
      setEmail('')
      setPassword('')
    } else {
      setMessage("Please fill in all fields.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        Email:{" "}
        <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <button type="submit">Login</button> */}
      <input type="submit" value="Login" />
      <p>New User? <Link to="/register">Register</Link></p>
      <p className="message">{message}</p>
    </form>
  );
}
