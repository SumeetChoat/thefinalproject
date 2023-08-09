import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChallengePage, ProtectedRoute, NotFound } 
from "./pages";
import { AuthProvider } from "./contexts";

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
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
