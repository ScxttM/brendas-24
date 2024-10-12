import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:3000";

const FormPlayer = (props: {
  player: {
    id: number;
    name: string;
    score: number;
  } | null;
  closeModal: () => void;
}) => {
  const [name, setName] = useState<string>(props?.player?.name || "");

  useEffect(() => {
    console.log("props", props);
  }, [props]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (props?.player?.id) updatePlayer(props?.player.id);
    else addPlayer();
  };

  const addPlayer = () => {
    axios
      .post(API_URL + "/leaderboard/player", { name })
      .then((res) => {
        props.closeModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  const updatePlayer = (id: number) => {
    axios
      .put(API_URL + "/leaderboard/player/" + id, { name })
      .then((res) => {
        props.closeModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-5">
        <label className="block mb-2">Nombre</label>
        <input
          type="text"
          id="name"
          className="border rounded-lg block w-full p-2.5"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormPlayer;
