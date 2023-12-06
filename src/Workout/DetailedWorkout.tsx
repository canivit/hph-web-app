import { useEffect, useState } from "react";
import { Workout, WorkoutStep } from "./types";
import { useParams } from "react-router";
import * as client from "./client";
import { LevelBadge } from "./LevelBadge";
import { formatDate } from "../util";
import { updateGifUrlsOfWorkout } from "./util";
import { Accordion } from "react-bootstrap";

export function DetailedWorkout() {
  const [workout, setWorkout] = useState<Workout | "Loading" | "NotFound">(
    "Loading"
  );
  const params = useParams();
  const workoutId = params.workoutId ? params.workoutId : "";

  async function fetchWorkout() {
    try {
      let workout = await client.findWorkoutById(workoutId);
      workout = await updateGifUrlsOfWorkout(workout);
      setWorkout(workout);
    } catch {
      setWorkout("NotFound");
    }
  }

  useEffect(() => {
    fetchWorkout();
  }, [workoutId]);

  if (workout === "Loading") {
    return <></>;
  }

  if (workout === "NotFound") {
    return (
      <div className="alert alert-danger" role="alert">
        Workout not found!
      </div>
    );
  }

  return (
    <div className="w-100 row">
      <div className="col-6">
        <WorkoutDetails workout={workout} />
      </div>
      <div className="col-6"></div>
    </div>
  );
}

function WorkoutDetails({ workout }: { workout: Workout }) {
  return (
    <>
      <h2>{workout.title}</h2>
      <div className="d-flex mb-4">
        <h5 className="me-5">
          Level: <LevelBadge level={workout.level} />
        </h5>
        <h5>
          Posted on:{" "}
          <span className="badge bg-primary">
            {formatDate(new Date(workout.post_date))}
          </span>
        </h5>
      </div>
      <h5>Description</h5>
      <p className="mb-4">{workout.description}</p>
      <h5>Exercises</h5>
      <WorkoutStepList steps={workout.steps} />
    </>
  );
}

function WorkoutStepList({ steps }: { steps: WorkoutStep[] }) {
  return (
    <Accordion>
      {steps.map((step, idx) => (
        <WorkoutStepItem workoutStep={step} stepIdx={idx} />
      ))}
    </Accordion>
  );
}

function WorkoutStepItem({
  workoutStep,
  stepIdx,
}: {
  workoutStep: WorkoutStep;
  stepIdx: number;
}) {
  return (
    <Accordion.Item eventKey={stepIdx.toString()}>
      <Accordion.Header>
        <div className="d-flex">
          <div className="me-5">{workoutStep.exercise.name}</div>
            <span className="badge rounded-pill text-bg-info me-2">{workoutStep.sets} sets</span>
            <span className="badge rounded-pill text-bg-info me-2">{workoutStep.reps} reps</span>
            <span className="badge rounded-pill text-bg-info me-2">{workoutStep.rest} seconds rest</span>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Target Muscle:</strong> {workoutStep.exercise.targetMuscle}
        </p>
        <p>
          <strong>Equipment:</strong> {workoutStep.exercise.equipment}
        </p>
        <img src={workoutStep.exercise.gifUrl} />
      </Accordion.Body>
    </Accordion.Item>
  );
}
