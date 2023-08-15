import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  AuthProvider,
  RoleProvider,
  AssignmentsProvider,
  FriendsProvider,
  StudentsProvider,
  RequestsProvider,
  MessagesProvider,
  NotificationsProvider,
  AssignmentListProvider
} from "./contexts";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
    <RoleProvider>
    <AssignmentsProvider>
    <FriendsProvider>
    <StudentsProvider>
    <RequestsProvider>
    <MessagesProvider>
    <NotificationsProvider>
    <AssignmentListProvider>
      <App />
    </AssignmentListProvider>
    </NotificationsProvider>
    </MessagesProvider>
    </RequestsProvider>
    </StudentsProvider>
    </FriendsProvider>
    </AssignmentsProvider>
    </RoleProvider>
    </AuthProvider>
  </BrowserRouter>
);
