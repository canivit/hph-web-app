import { useSelector } from "react-redux";
import { Workout } from "./types";
import { GlobalState } from "../Store/store";
import { useNavigate, useParams } from "react-router";
import { WorkoutEditor } from "./WorkoutEditor";
import * as client from "./client";
import { useEffect, useState } from "react";

export function EditWorkout() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  const navigate = useNavigate();
  const params = useParams();
  const workoutId = params.workoutId ? params.workoutId : "";

  const [workout, setWorkout] = useState<Workout | "Loading" | "NotFound">(
    "Loading"
  );

  async function fetchWorkout() {
    try {
      const workout = await client.findWorkoutById(workoutId);
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

  if (
    currentUser === false ||
    currentUser.role !== "Trainer" ||
    workout.trainer_id !== currentUser._id
  ) {
    return (
      <div className="alert alert-danger" role="alert">
        You are not the trainer that created this workout!
      </div>
    );
  }

  async function onSaveHandler(w: Workout) {
    await client.updateWorkout(w);
    navigate(`/Workouts/${w._id}`);
  }

  function onCancelHandler() {
    navigate(`/Workouts/${workoutId}`);
  }

  return (
    <WorkoutEditor
      workout={workout}
      onSaveHandler={onSaveHandler}
      onCancelHandler={onCancelHandler}
      title="Edit Workout"
    />
  );
}
