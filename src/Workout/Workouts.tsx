import { useEffect, useState } from "react";
import { Level, Workout } from "./types";
import * as client from "./client";
import { SimpleLink } from "../SimpleLink";

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  async function fetchWorkouts() {
    setWorkouts(await client.findAllWorkouts());
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

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
              <SimpleLink to={`/Users/${workout.trainer!._id}`}>
                @{workout.trainer!.username}
              </SimpleLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

function LevelBadge({ level }: { level: Level }) {
  switch (level) {
    case "Beginner":
      return <span className="badge bg-success text-bg-light">Beginner</span>;
    case "Intermediate":
      return (
        <span className="badge bg-warning text-bg-light">Intermediate</span>
      );
    case "Advanced":
      return <span className="badge bg-danger text-bg-light">Advanced</span>;
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
