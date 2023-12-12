import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";
import { Workout } from "../Workout/types";
import { useEffect, useState } from "react";
import * as client from "../Workout/client";
import { WorkoutCards } from "../Workout/WorkoutCards";

const NUM_OF_WORKOUTS = 5;

export function RecentWorkoutsOfUser() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );
  const [workouts, setWorkouts] = useState<Workout[] | "NoRender">("NoRender");

  const fetchWorkouts = async (trainerId: string) => {
    const foundWorkouts = await client.findMostRecentWorkoutsByUserId(
      trainerId,
      NUM_OF_WORKOUTS
    );
    setWorkouts(foundWorkouts);
  };

  useEffect(() => {
    if (currentUser !== false && currentUser.role === "Trainer") {
      fetchWorkouts(currentUser._id);
    }
  }, []);

  if (workouts === "NoRender" || workouts.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-5 text-center">
      <h3 className="mb-4">Recent workouts you posted</h3>
      <WorkoutCards workouts={workouts} />
    </div>
  );
}
