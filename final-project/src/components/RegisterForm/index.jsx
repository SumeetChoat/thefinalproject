/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm({
  newUser,
  setNewUser,
  message,
  setMessage,
}) {
  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      newUser.firstName.length > 0 &&
      newUser.lastName.length > 0 &&
      newUser.email.length > 0 &&
      newUser.password.length > 0
    ) {
      fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: JSON.stringify({
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.detail);
            });
          }
          return res.json();
        })
        .then((data) => {
          setMessage("User registered successfully.");
          setTimeout(() => {
            setMessage("");
            navigate("/login");
          }, 300);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message === "400") {
            setMessage(
              "Email is already in use. Please use a different email."
            );
          } else {
            setMessage("There was a problem with your registration.");
          }
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
      setNewUser({
        ...newUser,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else {
      setMessage("Please fill in all fields.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div>
        <label>
          Role:{" "}
          <input
            type="radio"
            name="role"
            id="student"
            checked={newUser.role === "student"}
            onChange={() => setNewUser({ ...newUser, role: "student" })}
          />
          <label htmlFor="student">Student</label>
          <input
            type="radio"
            name="role"
            id="teacher"
            checked={newUser.role === "teacher"}
            onChange={() => setNewUser({ ...newUser, role: "teacher" })}
          />
          <label htmlFor="teacher">Teacher</label>
        </label>
      </div>
      <div>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <input type="submit" value="Register" />
      <p>
        Already Registered? <Link to="/login">Login</Link>
      </p>
      <p className="message">{message}</p>
    </form>
  );
}
