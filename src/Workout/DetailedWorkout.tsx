import { useEffect, useState } from "react";
import { Rating, Workout } from "./types";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { WorkoutDetails } from "./WorkoutsDetails";
import { updateGifUrlsOfWorkout } from "./util";
import { WorkoutRatings } from "./WorkoutRatings";

export function DetailedWorkout() {
  const [workout, setWorkout] = useState<Workout | "Loading" | "NotFound">(
    "Loading"
  );
  const [ratings, setRatings] = useState<Rating[]>([]);
  const params = useParams();
  const workoutId = params.workoutId ? params.workoutId : "";
  const navigate = useNavigate();

  async function fetchWorkout() {
    try {
      let workout = await client.findWorkoutById(workoutId);
      workout = await updateGifUrlsOfWorkout(workout);
      setWorkout(workout);
    } catch {
      setWorkout("NotFound");
    }
  }

  async function fetchRatings() {
    const ratings = await client.findRatingsByWorkoutId(workoutId);
    setRatings(ratings);
  }

  async function deleteWorkout() {
    await client.deleteWorkout(workoutId);
    navigate("/Workouts");
  }

  async function createRating(rating: Rating) {
    const createdRating = await client.createRating(rating, workoutId);
    setRatings([...ratings, createdRating]);
  }

  async function updateRating(rating: Rating) {
    const updatedRating = await client.updateRating(rating);
    setRatings(
      ratings.map((r) => (r._id === updatedRating._id ? updatedRating : r))
    );
  }

  async function deleteRating(ratingId: string) {
    await client.deleteRating(ratingId);
    setRatings(ratings.filter((r) => r._id !== ratingId));
  }

  useEffect(() => {
    fetchWorkout();
    fetchRatings();
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
    <>
      <div className="w-100 row">
        <div className="col-7">
          <WorkoutDetails
            workout={workout}
            ratings={ratings}
            deleteWorkoutHandler={deleteWorkout}
            createRatingHandler={createRating}
          />
        </div>
        <div className="col-5 ps-5">
          <WorkoutRatings
            ratings={ratings}
            updateRatingHandler={updateRating}
            deleteRatingHandler={deleteRating}
          />
        </div>
      </div>
    </>
  );
}
