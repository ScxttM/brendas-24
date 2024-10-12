import { useState, useEffect } from "react";
import FormPlayer from "./FormPlayer";
import { FaEdit, FaPlus } from "react-icons/fa";
import PlayerScore from "./PlayerScore";
import Modal from "react-modal";

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

  const closeModal = () => setShowModal(false);
  const closeScoreModal = () => setShowScoreModal(false);

  return (
    <div className="w-3/4">
      <h1>Leaderboard</h1>

      <div className="flex flex-col gap-1 h-full">
        {leaderboard.map(
          (player: { id: number; name: string; score: number }, index) => {
            let style;

            switch (index) {
              case 0:
                style = "bg-gold ";
                break;
              case 1:
                style = "bg-silver ";
                break;
              case 2:
                style = "bg-bronze ";
                break;
              default:
                style = "bg-almostwhite text-xl py-1 ";

                break;
            }
            return (
              <div
                className={
                  "flex flex-row gap-2 rounded-lg text-black font-bold"
                }
                key={player.id}
              >
                <div
                  className={
                    "flex flex-row items-center justify-start gap-2 grow rounded-lg text-4xl p-2 " +
                    style
                  }
                >
                  <span className=" ">
                    {index + 1}. {player.name}{" "}
                    {index == leaderboard.length - 1 && index > 2 && "💩"}
                  </span>
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
                <div
                  className={
                    "flex flex-row items-center justify-end gap-2 w-1/4 rounded-lg px-2 text-4xl " +
                    style
                  }
                >
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

        {/* {showModal && !props.viewMode && (
          <FormPlayer player={player} setShowModal={setShowModal} />
        )}

        {showScoreModal && !props.viewMode && (
          <PlayerScore player={player} setShowScoreModal={setShowScoreModal} />
        )} */}

        {showModal && !props.viewMode && (
          <Modal isOpen={showModal} onRequestClose={closeModal}>
            <FormPlayer player={player} closeModal={closeModal} />
          </Modal>
        )}

        {showScoreModal && !props.viewMode && player && (
          <Modal isOpen={showScoreModal} onRequestClose={closeScoreModal}>
            <PlayerScore player={player} closeScoreModal={closeScoreModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
