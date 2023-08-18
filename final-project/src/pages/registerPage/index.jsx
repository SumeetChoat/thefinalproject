import { useState } from "react";
import { RegisterForm } from "../../components";
import "./styles.css";

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
    <div className="register-container">
      <div className="register-inner-container">
        <div className="register-img-section">
          <img src="register-pic.JPG" alt="register-pic" />
        </div>
        <div className="register-form-container">
          <img src="logo.svg" alt="logo" className="register-logo" />
          <h1 className="register-title">Register</h1>
          <RegisterForm
            newUser={newUser}
            setNewUser={setNewUser}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
}
