import { useEffect, useState } from "react";
import { Level, Workout } from "./types";
import * as client from "./client";
import { Link } from "react-router-dom";
import { TrainerContent } from "../User/TrainerContent";
import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";
import { WorkoutCards } from "./WorkoutCards";

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    level: "All",
    showOnlyMyWorkouts: false,
  });

  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  const workoutPred = createWorkoutPredicate(
    filter,
    currentUser ? currentUser._id : false
  );

  async function fetchWorkouts() {
    const foundWorkouts = await client.findAllWorkouts();
    setWorkouts(foundWorkouts);
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <TopBar filter={filter} setFilter={setFilter} />
      <WorkoutCards workouts={workouts.filter(workoutPred)} />
    </div>
  );
}

function TopBar({
  filter,
  setFilter,
}: {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
}) {
  return (
    <>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-baseline me-5">
          <label className="form-label me-2" htmlFor="levelInput">
            Level
          </label>
          <select
            className="form-select"
            id="levelInput"
            value={filter.level}
            onChange={(e) =>
              setFilter({
                ...filter,
                level: e.target.value as Level,
              })
            }
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <TrainerContent>
          <div className="form-check me-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="showOnlyMyWorkoutsCheckboxForTrainers"
              checked={filter.showOnlyMyWorkouts}
              onChange={(e) =>
                setFilter({ ...filter, showOnlyMyWorkouts: e.target.checked })
              }
            />
            <label
              className="form-check-label"
              htmlFor="showOnlyMyWorkoutsCheckboxForTrainers"
            >
              Show only workouts I created
            </label>
          </div>
        </TrainerContent>
        <TrainerContent>
          <Link to="/CreateWorkout" className="btn btn-primary ms-auto">
            Create Workout
          </Link>
        </TrainerContent>
      </div>
      <hr />
    </>
  );
}

function createWorkoutPredicate(
  filterState: FilterState,
  currentTrainerId: string | false
) {
  return (workout: Workout) => {
    if (filterState.level !== "All" && workout.level !== filterState.level) {
      return false;
    }

    if (
      filterState.showOnlyMyWorkouts &&
      workout.trainer!._id !== currentTrainerId
    ) {
      return false;
    }

    return true;
  };
}

type FilterState = {
  level: Level | "All";
  showOnlyMyWorkouts: boolean;
};
