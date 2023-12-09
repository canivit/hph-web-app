import { useEffect, useState } from "react";
import { Level, Workout } from "./types";
import * as client from "./client";
import { SimpleLink } from "../SimpleLink";
import { Link } from "react-router-dom";
import { TrainerContent } from "../User/TrainerContent";
import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";
import { LevelBadge } from "./LevelBadge";
import { formatDate } from "../util";

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
    setWorkouts(await client.findAllWorkouts());
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div style={{width: "100%"}}>
      <TopBar filter={filter} setFilter={setFilter} />
      <div className="d-flex flex-row flex-wrap">
        {workouts.filter(workoutPred).map((workout) => (
          <WorkoutCard workout={workout} key={workout._id} />
        ))}
      </div>
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

function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <div
      className="card text-bg-light"
      style={{
        width: "350px",
        marginRight: "2%",
        marginBottom: "2%",
      }}
    >
      <div className="card-body">
        <SimpleLink to={`/Workouts/${workout._id}`}>
          <h5 className="card-title">{workout.title}</h5>
        </SimpleLink>
        <p className="card-text">{workout.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div>
              <b>Level:</b>
            </div>
            <div>
              <LevelBadge level={workout.level} />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div>
              <b>Number of Exercises:</b>
            </div>
            <div>
              <span className="badge text-bg-primary">
                {workout.steps.length}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div>
              <b>Posted on:</b>
            </div>
            <div>
              <span className="badge text-bg-primary">
                {formatDate(new Date(workout.post_date))}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div>
              <b>Posted by:</b>
            </div>
            <div>
              <SimpleLink to={`/Profile/${workout.trainer!._id}`}>
                @{workout.trainer!.username}
              </SimpleLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
