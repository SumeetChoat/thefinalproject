import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { useEffect } from "react";
import { socket } from "../../socket";
import {
  useAuth,
  useAssignmentList,
  useFriends,
  useRequests,
  useMessages,
  useNotifications,
} from "../../contexts";

function ProtectedRoute() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const { friends, setFriends } = useFriends();
  const { sentRequests, setSentRequests } = useRequests();
  const { messages, setMessages } = useMessages();
  const { notifications, setNotifications } = useNotifications();
  const { assignmentList, setAssignmentList } = useAssignmentList();

  useEffect(() => {
    async function getUserDataWithToken() {
      const token = localStorage.getItem("token");

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

  useEffect(() => {
    try {
      socket.connect();
      socket.emit("username", { username: user.username, role: user.role });

      socket.on("username", (data) => {
        console.log(data);
        // Update context here with...

        // Friends
        setFriends(data["friends"]);
        // Friend_Requests
        setSentRequests(data["friend_requests"]);
        // Messages
        setMessages(data["messages"]);
        // Notifications
        setNotifications(data["notifications"]);
        // Assignments
        setAssignmentList(data["assignments"]);
      });

      socket.on("message", (msg) => {
        // Update message context here
      });

      socket.on("friend_req", (req) => {
        // Update friend request context here
      });

      socket.on("add_friend", (friend) => {
        // Update friends context here
      });

      socket.on("notification", (noti) => {
        // Update notifications list
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);
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
