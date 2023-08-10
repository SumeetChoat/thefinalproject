import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./style.css";
function ProtextedRoute() {
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
            <NavLink to="/setting">Setting</NavLink>
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

export default ProtextedRoute;
