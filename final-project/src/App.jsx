import "./App.css";
import StaveComponent from "./components/Stave";

function App() {
  const note = [72, 74];

  return (
    <>
      <StaveComponent note={note} />
    </>
  );
}

export default App;
