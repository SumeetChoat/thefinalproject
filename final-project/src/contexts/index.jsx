/* eslint-disable react/prop-types */
import { useState, useContext, createContext } from "react";

//auth tokens
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [currentAssignment, setCurrentAssignment] = useState();
  return (
    <AuthContext.Provider
      value={{ token, setToken, currentAssignment, setCurrentAssignment }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
