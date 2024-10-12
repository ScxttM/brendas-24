import { useState, useEffect } from "react";
import FormPlayer from "./FormPlayer";
import { FaEdit, FaPlus } from "react-icons/fa";
import PlayerScore from "./PlayerScore";
import Modal from "react-modal";
import LeaderboardRow from "./LeaderboardRow";
Modal.setAppElement("#root");

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

  return (
    <div className="w-3/4">
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
          },
        }}
      >
        <FormPlayer player={player} closeModal={closeModal} />
      </Modal>

      <h1>Leaderboard</h1>

      <div className="flex flex-col h-full">
        <div className="w-full flex justify-center">
          {leaderboard.map(
            (player: { id: number; name: string; score: number }, index) => {
              return (
                index == 0 && (
                  <LeaderboardRow
                    key={player.id}
                    player={player}
                    index={index}
                    style={"bg-gold w-1/2"}
                    setPlayer={setPlayer}
                    setShowModal={setShowModal}
                    viewMode={props.viewMode}
                    setShowScoreModal={setShowScoreModal}
                    playersCount={leaderboard.length}
                  />
                )
              );
            }
          )}
        </div>
        <div className="flex gap-4 justify-around">
          {leaderboard.map(
            (player: { id: number; name: string; score: number }, index) => {
              return (
                index >= 1 &&
                index <= 2 && (
                  <LeaderboardRow
                    key={player.id}
                    player={player}
                    index={index}
                    style={index == 1 ? "bg-silver gap-10" : "bg-bronze gap-10"}
                    setPlayer={setPlayer}
                    setShowModal={setShowModal}
                    viewMode={props.viewMode}
                    setShowScoreModal={setShowScoreModal}
                    playersCount={leaderboard.length}
                  />
                )
              );
            }
          )}
        </div>
        <div className="flex gap-2 w-full">
          <div className="grow">
            {leaderboard.map(
              (player: { id: number; name: string; score: number }, index) => {
                return (
                  index >= 3 &&
                  index <= 7 && (
                    <LeaderboardRow
                      key={player.id}
                      player={player}
                      index={index}
                      style={""}
                      setPlayer={setPlayer}
                      setShowModal={setShowModal}
                      viewMode={props.viewMode}
                      setShowScoreModal={setShowScoreModal}
                      playersCount={leaderboard.length}
                    />
                  )
                );
              }
            )}
          </div>
          <div className="grow">
            {leaderboard.map(
              (player: { id: number; name: string; score: number }, index) => {
                return (
                  index >= 8 &&
                  index <= 11 && (
                    <LeaderboardRow
                      key={player.id}
                      player={player}
                      index={index}
                      style={""}
                      setPlayer={setPlayer}
                      setShowModal={setShowModal}
                      viewMode={props.viewMode}
                      setShowScoreModal={setShowScoreModal}
                      playersCount={leaderboard.length}
                    />
                  )
                );
              }
            )}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Leaderboard;
