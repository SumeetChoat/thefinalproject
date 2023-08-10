import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChallengePage, ProtectedRoute, NotFound } from "./pages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/challenge" element={<ChallengePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
