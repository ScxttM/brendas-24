import { useState, useEffect } from "react";

const WS_URL: string = import.meta.env.VITE_WS_URL || "ws://localhost:8080";
// const API_URL: string =
//   process.env.REACT_APP_API_URL || "http://localhost:3000";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    connectWs();
  }, []);

  const connectWs = () => {
    const socket = new WebSocket(WS_URL);

    // Event listener for WebSocket connection open
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server.");
    });

    // Event listener for incoming messages
    socket.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      if (response.leaderboard) {
        console.log(response.leaderboard);
        setLeaderboard(response.leaderboard);
      }
    });
  };

  return (
    <div>
      <h1>Leaderboard</h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y-2">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left">Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-right">Score</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map(
              (player: { id: number; name: string; score: number }) => {
                return (
                  <tr key={player.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-left">
                      {player.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right">
                      {player.score}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
