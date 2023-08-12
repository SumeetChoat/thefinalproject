import { useState } from "react";
import { RegisterForm } from "../../components";
import "../loginPage/styles.css";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "student",
  });
  return (
    <div className="login-container">
      <h1>Welcome to Pitch Perfect - Music App</h1>
      <h1>Please Register</h1>
      <RegisterForm
        newUser={newUser}
        setNewUser={setNewUser}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
