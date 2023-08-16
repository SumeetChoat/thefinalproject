import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import {
  useAuth,
  useAssignmentList,
  useFriends,
  useRequests,
  useMessages,
  useNotifications,
} from "../../contexts";
import { Notifications } from "../../components";

function ProtectedRoute() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { friends, setFriends } = useFriends();
  const { sentRequests, setSentRequests } = useRequests();
  const { messages, setMessages } = useMessages();
  const { notifications, setNotifications } = useNotifications();
  const { assignmentList, setAssignmentList } = useAssignmentList();

  const [notifModal, setNotifModal] = useState(false)

  const bell = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>'

  async function logout() {
    const options = {
      method: "DELETE",
      headers: {
        token: token || localStorage.getItem("token"),
      },
    };
    const resp = await fetch("http://localhost:3000/users/logout", options);
    const data = await resp.json();
    if (resp.ok) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.log(data);
    }
  }

  function openNotifications() {
    setNotifModal(true)
  }

  function closeNotifications() {
    setNotifModal(false)
  }

  const notif_class = notifModal && user ? "notification-modal display:block": "notification-modal display:none"

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
        setMessages((messages) => [...messages, msg]);
      });

      socket.on("friend_req", (req) => {
        // Update friend request context here
        setSentRequests((sentRequests) => [...sentRequests, req]);
      });

      socket.on("add_friend", (friend) => {
        // Update friends context here
        setFriends((friends) => [...friends, friend]);
      });

      socket.on("delete_req", id => {
        console.log("TEST: ", id);
        setSentRequests((sentRequests) => sentRequests.filter(req => id !== req.request_id));
      })

      socket.on("notification", (noti) => {
        // Update notifications list
        setNotifications((notifications) => [...notifications, noti]);
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


  useEffect(() => {
    console.log("MESSAGES: ", messages)
  }, [messages])

  useEffect(() => {
    console.log("Friend_REQ: ", sentRequests)
  }, [sentRequests])

  useEffect(() => {
    console.log("FRIENDS: ", friends)
  }, [friends])

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
            <NavLink to="/account">Account</NavLink>
          </li>
          {user ? <li><NavLink onClick={() => logout()}>Logout</NavLink></li> : <p></p>}
          <li>
            <NavLink onClick={() => {
              notifModal ? closeNotifications() : openNotifications()
            }}>
              <div className="btn-icon" dangerouslySetInnerHTML={{__html: bell}}/>
            </NavLink>
          </li>
        </ul>
      </nav>
      {notifModal ?
        <div className={notif_class}>
          {<Notifications handleClose={closeNotifications}/>}
        </div>
      : "" }
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
