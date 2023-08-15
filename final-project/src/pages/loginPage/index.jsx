import React from 'react';
import { useState } from "react";
import { LoginForm } from "../../components";
import "./styles.css";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login-img-section">
          <img src="login-pic.JPG" alt="login-pic" />
        </div>
        <div className="form-container">
          <img src="logo.svg" alt="logo" className="login-logo" />
          <h1 className="login-title">Login</h1>

          <LoginForm
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
}
