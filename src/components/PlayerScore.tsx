import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:3000";

const PlayerScore = (props: {
  player: {
    id: number;
    name: string;
    score: number;
  };
  closeScoreModal: () => void;
}) => {
  const [score, setScore] = useState<number>(props?.player?.score);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateScore(props?.player?.id, score);
  };

  const updateScore = (id: number, score: number) => {
    axios
      .put(API_URL + "/leaderboard/player/score/" + id, { score })
      .then((res) => {
        props.closeScoreModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <h1>{props.player.name} score</h1>
      <form
        id="formPlayerScore"
        className="mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => setScore(score - 1)}
        >
          -1
        </button>
        <input
          type="number"
          className="text-center"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
        ></input>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => setScore(score + 1)}
        >
          +1
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => setScore(score + 5)}
        >
          +5
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => setScore(score + 10)}
        >
          +10
        </button>
      </form>
      <button
        type="submit"
        form="formPlayerScore"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      >
        Guardar
      </button>
    </>
  );
};

export default PlayerScore;
