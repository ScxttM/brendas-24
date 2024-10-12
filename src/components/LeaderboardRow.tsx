import { FaEdit, FaPlus } from "react-icons/fa";

const LeaderboardRow = (props: {
  player: {
    id: number;
    name: string;
    score: number;
  };
  index: number;
  style: string;
  playersCount: number;
  setPlayer: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      score: number;
    } | null>
  >;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: boolean;
  setShowScoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={
        "flex flex-row rounded-3xl justify-between bg-almostwhite text-black text-2xl xl:text-8xl p-8 mb-6 " +
        props.style
      }
      key={props.player.id}
    >
      <div className="flex gap-2 items-center">
        <span>
          {props.index + 1}. {props.player.name}
          {props.index == props.playersCount - 1 && props.index > 2 && " 💩"}
        </span>
        {!props.viewMode && (
          <FaEdit
            onClick={() => {
              props.setPlayer(props.player);
              props.setShowModal(true);
            }}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        <span>{props.player.score}</span>
        {!props.viewMode && (
          <FaPlus
            onClick={() => {
              props.setPlayer(props.player);
              props.setShowScoreModal(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LeaderboardRow;
