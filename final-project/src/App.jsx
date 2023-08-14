import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  ChallengePage,
  ProtectedRoute,
  NotFound,
  LoginPage,
  RegisterPage,
  Home,
  Assignments,
  Profile
} from "./pages";


import {socket} from './socket';
import { useEffect } from "react";
import { useAssignmentList, useFriends, useRequests, useMessages, useNotifications } from './contexts';
import eventListeners from "./eventListeners";

const username = "Oliver"; // Just for testing purposes whilst log in isn't working.

function App() {
  // socket.connect(); // can this be here? Do I just need to send username event after logging in?

  // const {friends, setFriends} = useFriends();
  // const {sentRequests, setSentRequests} = useRequests();
  // const {messages, setMessages} = useMessages();
  // const {notifications, setNotifications} = useNotifications();
  // const {assignmentList, setAssignmentList} = useAssignmentList();
  // console.log(useFriends)

    

  // useEffect(() => {

  //   socket.on("username", data => {
  //     console.log(data);
  //     // Update context here with...

  //     // Friends
  //     setFriends(data["friends"])
  //     // Friend_Requests
  //     setSentRequests(data["friend_requests"])
  //     // Messages
  //     setMessages(data["messages"])
  //     // Notifications
  //     setNotifications(data["notifications"])
  //     // Assignments
  //     setAssignmentList(data["assignments"])

  // })
  //   return () => {
  //     socket.disconnect();
  //     socket.off();
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("messages:" , messages);
  //   console.log("friends:", friends);
  //   console.log("assignments:", assignmentList);
  // }, [messages, friends, sentRequests, notifications, assignmentList])



  return (
    <>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path ="/account" element={<Profile/>}/>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;

{
  /* homepage commented out for now. pathway must change too after anthony finishes  */
}
{
  /* <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          path="/"
        /> */
}
