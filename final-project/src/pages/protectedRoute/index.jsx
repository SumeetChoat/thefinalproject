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

  const [notifModal, setNotifModal] = useState(false);

  // const bell = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>'

  const bell =
    '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>';

  const trash =
    '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>';

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
      socket.off();
      socket.disconnect();
      navigate("/login");
    } else {
      console.log(data);
    }
  }

  function openNotifications() {
    setNotifModal(true);
  }

  function closeNotifications() {
    setNotifModal(false);
  }

  function handleModal() {
    notifModal ? closeNotifications() : openNotifications();
  }

  const notif_class =
    notifModal && user
      ? "notification-modal display:block"
      : "notification-modal display:none";

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
        console.log("ADD FRIEND CALLED");
        setFriends((friends) => [...friends, friend]);
      });

      socket.on("delete_req", (id) => {
        console.log("TEST: ", id);
        setSentRequests((sentRequests) =>
          sentRequests.filter((req) => id !== req.request_id)
        );
      });

      socket.on("notification", (noti) => {
        // Update notifications list
        setNotifications((notifications) => [...notifications, noti]);
      });

      socket.on("delete_friend", (id) => {
        setFriends((friends) => friends.filter((f) => f.friend_id !== id));
      });

      socket.on("add_assignment", (obj) => {
        setAssignmentList((assignmentList) => [...assignmentList, obj]);
      });

      socket.on("delet_noti", (username) => {
        setNotifications([]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    console.log("MESSAGES: ", messages);
  }, [messages]);

  useEffect(() => {
    console.log("Friend_REQ: ", sentRequests);
  }, [sentRequests]);

  useEffect(() => {
    console.log("FRIENDS: ", friends);
  }, [friends]);

  return (
    <div className="body-container">
      <nav className="app-nav">
        <h1>
          <NavLink to="/">
            <img src="logo.svg" alt="logo" className="nav-logo" />
          </NavLink>
        </h1>
        <ul>
          <li className="nav-link">
            <NavLink to="/challenge">Challenge</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/assignments">Assignments</NavLink>
          </li>

          <li className="nav-link">
            <NavLink to="/account">Account</NavLink>
          </li>
          <li>
            <button className="bell-btn" onClick={() => handleModal()}>
              Bulletin
            </button>
            {notifications && notifications.length > 0 && (
              <div className="notification-reminder"></div>
            )}
          </li>
          {user ? (
            <li className="nav-link">
              <NavLink onClick={() => logout()}>Logout</NavLink>
            </li>
          ) : (
            <p></p>
          )}
        </ul>
      </nav>
      {notifModal ? (
        <div className={notif_class}>
          {<Notifications handleClose={closeNotifications} />}
        </div>
      ) : (
        ""
      )}
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
