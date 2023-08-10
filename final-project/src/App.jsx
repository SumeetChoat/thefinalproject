import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChallengePage, ProtectedRoute, NotFound, LoginPage, RegisterPage } from "./pages";

import { AuthProvider } from "./contexts";

import {socket} from './socket';
import { useEffect } from "react";


function App() {
  socket.connect();
  useEffect(() => {
    console.log('Socket connected')
    return () => {
      socket.disconnect();
      socket.off();
    }
  })
  return (
    <>
    <AuthProvider>
      <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/challenge" element={<ChallengePage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </>
  );
}


export default App;



       {/* homepage commented out for now. pathway must change too after anthony finishes  */}
      {/* <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          path="/"
        /> */}
