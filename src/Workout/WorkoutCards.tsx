import { SimpleLink } from "../SimpleLink";
import { formatDate } from "../util";
import { LevelBadge } from "./LevelBadge";
import { Workout } from "./types";

export function WorkoutCards({ workouts }: { workouts: Workout[] }) {
  return (
    <div className="d-flex flex-row flex-wrap">
      {workouts.map((workout) => (
        <WorkoutCard workout={workout} key={workout._id} />
      ))}
    </div>
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
