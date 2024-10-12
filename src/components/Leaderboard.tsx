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
    <div className="w-3/4">
      <h1>Leaderboard</h1>

      <div className="flex flex-col gap-1 h-full  overflow-y-scroll ">
        {leaderboard.map(
          (player: { id: number; name: string; score: number }, index) => {
            if (index == 0) {
              return (
                <div className="flex flex-row gap-2 bg-gold rounded-lg p-2 text-black justify-between">
                  <div>{player.name}</div>
                  <div>{player.score}</div>
                </div>
              );
            } else if (index == 1) {
              return (
                <div className="flex flex-row gap-2 bg-silver rounded-lg p-2 text-black justify-between">
                  <div>{player.name}</div>
                  <div>{player.score}</div>
                </div>
              );
            } else if (index == 2) {
              return (
                <div className="flex flex-row gap-2 bg-bronze rounded-lg p-2 text-black justify-between">
                  <div>{player.name}</div>
                  <div>{player.score}</div>
                </div>
              );
            } else {
              return (
                <div className="flex flex-row gap-2 rounded-lg p-2 text-black justify-between">
                  <div className="flex">
                    <div>
                      {index + 1} {player.name}
                    </div>
                  </div>
                  <div>{player.score}</div>
                </div>
              );
            }
          }
        )}
        <div className="flex flex-row gap-2 rounded-lg p-2 text-black justify-center bg-silver-light">
          <span>Agregar Jugador</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
