import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../../contexts";
import { useEffect } from "react";

function ProtectedRoute() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserDataWithToken() {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await fetch("http://localhost:3000/users/getUserByToken", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      if (res.ok) {
        const user = await res.json();

        setUser({
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          username: user.username,
        });
        return;
      } else {
        navigate("/login");
      }
    }
    if (!user && !localStorage.getItem("token")) {
      navigate("/login");
    } else if (!user && localStorage.getItem("token")) {
      getUserDataWithToken();
    }
  }, []);
  return (
    <div className="body-container">
      <nav>
        <h1>
          <NavLink to="/">LOGO</NavLink>
        </h1>
        <ul>
          <li>
            <NavLink to="/challenge">Challenge</NavLink>
          </li>
          <li>
            <NavLink to="/assignments">Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/learn">Learn more</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
