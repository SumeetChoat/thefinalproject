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
  const { token } = useAuth()

  const { friends, setFriends } = useFriends();
  const { sentRequests, setSentRequests } = useRequests();
  const { messages, setMessages } = useMessages();
  const { notifications, setNotifications } = useNotifications();
  const { assignmentList, setAssignmentList } = useAssignmentList();

  async function logout() {
    const options = {
      method: "DELETE",
      headers: {
        token: token || localStorage.getItem('token')
      }
    }
    const resp = await fetch('http://localhost:3000/users/logout',options)
    const data = await resp.json()
    if (resp.ok) {
      localStorage.removeItem('token')

      socket.disconnect();
      socket.off();

      navigate('/login')
    } else {
      console.log(data)
    }
  }

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
        const userResp = await res.json();
        setUser({
          firstName: userResp.first_name,
          lastName: userResp.last_name,
          role: userResp.role,
          username: userResp.username,
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
        setMessages((messages) => [...messages, msg])
      });

      socket.on("friend_req", (req) => {
        // Update friend request context here
        setSentRequests((sentRequests) => [...sentRequests, req])
      });

      socket.on("add_friend", (friend) => {
        // Update friends context here
        setFriends((friends) => [...friends, friend])
      });

      socket.on("notification", (noti) => {
        // Update notifications list
        setNotifications((notifications) => [...notifications, noti])
      });

      socket.on("delete_friend", id => {
        setFriends((friends) => friends.filter(f => f.friend_id !== id));
      })

      socket.on("add_assignment", obj => {
        setAssignmentList(assignmentList => [...assignmentList, obj]);
      })

      socket.on("delet_noti", username => {
        setNotifications([]);
      })

    } catch (error) {
      console.log(error);
    }
  }, [user]);

  // for testing purposes
  useEffect(() => {
    const obj = {
      "messages":messages,
      "friend_requests":sentRequests,
      "friends":friends,
      "notification":notifications
    }
    console.log("Contexts:", obj)
  }, [messages, sentRequests, friends, notifications]);







  return (
    <div className="body-container">
      <nav className="app-nav">
        <h1>
          <NavLink to="/">
            <img src="logo.svg" alt="logo" className="nav-logo" />
          </NavLink>
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
          {user ? <NavLink onClick={()=>logout()}>Logout</NavLink>
          : <p></p>}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
