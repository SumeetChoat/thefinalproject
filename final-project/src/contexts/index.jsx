import React, {useState,useContext, createContext} from 'react'

//auth tokens
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState()
    return (
        <AuthContext.Provider value={{token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)
