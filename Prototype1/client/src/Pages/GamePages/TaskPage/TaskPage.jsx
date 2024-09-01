import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTask,
  resetTask,
  setTaskInfo,
} from "../../../lib/Slices/gameSlice";
import QuizGame from "../../../Games/QuizGame/QuizGame";
import PuzzleGame from "../../../Games/PuzzleGame/PuzzleGame";
import ChoiceGame from "../../../Games/ChoiceGame/ChoiceGame";
import { Vortex } from "react-loader-spinner";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";

const gameMap = {
  quiz: QuizGame,
  puzzle: PuzzleGame,
  choice: ChoiceGame,
};

const TaskPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { currentTask, status, error, isTaskRunning } = useSelector(
    (state) => state.game
  );
  const navigate = useNavigate();
  const element = searchParams.get("element");
  const level = searchParams.get("level");
  const type = searchParams.get("type");

  useEffect(() => {
    if (element && level && type) {
      dispatch(
        setTaskInfo({ gameLevel: level, gameElement: element, taskType: type })
      );
      dispatch(fetchTask({ level, element, type }));
    }
  }, [dispatch, element, level, type]);

  if (status === "loading") {
    return (
      <ContentWrapper>
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["#00A9E0", "#00B2A9", "#007A7A", "#E0F7FA", "#00A859"]}
        />
      </ContentWrapper>
    );
  }

  if (status === "error") {
    return (
      <ContentWrapper>
        <h1 className="text-xl font-semibold">Error: {error}</h1>
      </ContentWrapper>
    );
  }

  const GameComponent = gameMap[type];

  return (
    <ContentWrapper>
      {currentTask && currentTask.name ? (
        <>
          <button
            className="absolute top-40 left-10 bg-red-400 p-2"
            onClick={() => {
              if (!isTaskRunning) {
                dispatch(resetTask());
                navigate(`/element/${element}/level/${level}-level`);
              }
            }}
          >
            Go back
          </button>
          <GameComponent></GameComponent>
        </>
      ) : (
        <div className="text-gray-500">No Task Found</div>
      )}
    </ContentWrapper>
  );
};

export default TaskPage;
