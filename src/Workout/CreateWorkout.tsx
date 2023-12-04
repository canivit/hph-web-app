import { useSelector } from "react-redux";
import { Workout } from "./types";
import { GlobalState } from "../Store/store";
import { useNavigate } from "react-router";
import { WorkoutEditor } from "./WorkoutEditor";
import * as client from "./client";

export function CreateWorkout() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  const navigate = useNavigate();

  if (currentUser === false || currentUser.role !== "Trainer") {
    return (
      <div className="alert alert-danger" role="alert">
        Only trainers can create workouts!
      </div>
    );
  }

  const workout: Workout = {
    _id: "",
    title: "",
    description: "",
    level: "Beginner",
    post_date: new Date(),
    steps: [],
    trainer_id: currentUser._id,
  };

  async function onSaveHandler(w: Workout) {
    await client.createWorkout(w);
    navigate("/Workouts");
  }

  function onCancelHandler() {
    navigate("/Workouts");
  }

  return (
    <WorkoutEditor
      workout={workout}
      onSaveHandler={onSaveHandler}
      onCancelHandler={onCancelHandler}
      title="Create Workout"
    />
  );
}
