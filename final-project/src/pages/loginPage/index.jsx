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
      <h1>Welcome to Pitch Perfect - Music App!</h1>
      <div className="form-container">
        <h1 className="login-title">Login</h1>
        <LoginForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
