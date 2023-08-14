import React from 'react';
/* eslint-disable react/prop-types */
import { useState, useContext, createContext } from "react";

//auth tokens
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

//role - student or teacher
export const RoleContext = createContext();
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState();
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
export const useRole = () => useContext(RoleContext);

//assignments
export const AssignmentsContext = createContext();
export const AssignmentsProvider = ({ children }) => {
  const [currentAssignment, setCurrentAssignment] = useState();
  return (
    <AssignmentsContext.Provider
      value={{ currentAssignment, setCurrentAssignment }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
};
export const useAssignments = () => useContext(AssignmentsContext);

//friends
export const FriendsContext = createContext();
export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState();
  return (
    <FriendsContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendsContext.Provider>
  );
};
export const useFriends = () => useContext(FriendsContext);

//teacher's students
export const StudentsContext = createContext();
export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState();
  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};
export const useStudents = () => useContext(StudentsContext);

//pending requests - sent and received
export const RequestsContext = createContext();
export const RequestsProvider = ({ children }) => {
  const [sentRequests, setSentRequests] = useState();
  const [receivedRequests, setReceivedRequests] = useState();
  return (
    <RequestsContext.Provider
      value={{
        sentRequests,
        setSentRequests,
        receivedRequests,
        setReceivedRequests,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
export const useRequests = () => useContext(RequestsContext);

//message history
export const MessagesContext = createContext();
export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState();
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
export const useMessages = () => useContext(MessagesContext);
