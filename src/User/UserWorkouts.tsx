import { useEffect, useState } from "react";
import { Workout } from "../Workout/types";
import { User } from "./types";
import * as client from "../Workout/client";
import { SimpleLink } from "../SimpleLink";
import { LevelBadge } from "../Workout/LevelBadge";
import { formatDate } from "../util";

export function UserWorkouts({ user }: { user: User }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  async function fetchWorkouts() {
    try {
      const foundWorkouts = await client.findWorkoutsByUserId(user._id);
      setWorkouts(foundWorkouts);
    } catch {
      setWorkouts([]);
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, [user._id]);

  return (
    <div className="mt-4">
      <h4 className="mb-4">Workouts posted by {user.firstName}</h4>
      {workouts.length === 0 ? (
        <span className="text-muted">
          {user.firstName} did not post any workouts yet
        </span>
      ) : (
        workouts.map((workout) => (
          <WorkoutCard key={workout._id} workout={workout} />
        ))
      )}
    </div>
  );
}

function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <div
      className="card text-bg-light mb-4"
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
      </ul>
    </div>
  );
}
