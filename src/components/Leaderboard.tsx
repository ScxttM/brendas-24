import { useState, useEffect } from "react";
import FormPlayer from "./FormPlayer";
import { FaEdit, FaPlus } from "react-icons/fa";
import PlayerScore from "./PlayerScore";

const WS_URL: string = import.meta.env.VITE_WS_URL || "ws://localhost:8080";

const Leaderboard = (props: { viewMode: boolean }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [player, setPlayer] = useState<{
    id: number;
    name: string;
    score: number;
  } | null>(null);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);

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
            let bg;
            switch (index) {
              case 0:
                bg = "bg-gold";
                break;
              case 1:
                bg = "bg-silver";
                break;
              case 2:
                bg = "bg-bronze";
                break;
              default:
                bg = "";
                break;
            }
            return (
              <div
                className={
                  "flex flex-row gap-2 rounded-lg p-2 text-black justify-between " +
                  bg
                }
                key={player.id}
              >
                <div>
                  {index + 1}. {player.name}
                  {!props.viewMode && (
                    <FaEdit
                      onClick={() => {
                        setPlayer(player);
                        setShowModal(true);
                      }}
                    />
                  )}
                  {/* el icono que salga con opacity a la derecha del nombre y centrado verticalmente */}
                </div>
                <div>
                  {player.score}
                  {!props.viewMode && (
                    <FaPlus
                      onClick={() => {
                        setPlayer(player);
                        setShowScoreModal(true);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          }
        )}

        {!props.viewMode && (
          <div
            className="flex flex-row gap-2 rounded-lg p-2 text-black justify-center bg-silver-light"
            onClick={() => {
              setPlayer(null);
              setShowModal(true);
            }}
          >
            <span>Agregar participante</span>
          </div>
        )}

        {showModal && !props.viewMode && (
          <FormPlayer player={player} setShowModal={setShowModal} />
        )}

        {showScoreModal && !props.viewMode && (
          <PlayerScore player={player} setShowScoreModal={setShowScoreModal} />
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
