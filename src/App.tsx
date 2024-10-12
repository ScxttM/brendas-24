import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import { ToastContainer } from "react-toastify";

function App() {
  const [viewMode, setViewMode] = useState<boolean>(false);

  return (
    <>
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />
      <main className="flex justify-center">
        <Leaderboard viewMode={viewMode} />
      </main>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
