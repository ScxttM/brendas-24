import "./App.css";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center">
        <Leaderboard />
      </main>
    </>
  );
}

export default App;
