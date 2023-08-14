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
} from "./pages";

import { AuthProvider } from "./contexts";

import {socket} from './socket';
import { useEffect } from "react";
import eventListeners from "./eventListeners";

const username = "Oliver";

function App() {
  socket.connect();

  useEffect(() => {

    // Adds socket event listeners.
    eventListeners();

    return () => {
      socket.disconnect();
      socket.off();
    }
  })
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/assignments" element={<Assignments />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
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
