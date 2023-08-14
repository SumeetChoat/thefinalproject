/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";

export default function LoginForm({
  loginForm,
  setLoginForm,
  message,
  setMessage,
}) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  // const {}
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear(); //?

    if (loginForm.username.length > 0 && loginForm.password.length > 0) {
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
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
          localStorage.setItem("token", data.token);
          setUser(data.user);
          console.log(data.user);
          setMessage("User logged in successfully.");
          setTimeout(() => {
            setMessage("");
            navigate("/challenge");
          }, 300);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Invalid email or password.");
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
      setLoginForm({
        username: "",
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
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        Username:{" "}
        <input
          value={loginForm.username}
          className="login-text-input"
          type="text"
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
        />
      </div>
      <div>
        Password:{" "}
        <input
          value={loginForm.password}
          className="login-text-input"
          type="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
      </div>

      <input type="submit" value="Login" className="login-submit" />
      <p className="login-register-switch">
        New User? <Link to="/register">Register</Link>
      </p>
      <p className="message">{message}</p>
    </form>
  );
}
