import axios from "axios";
import { API_BASE } from "../environment";
import { Workout } from "./types";

const WORKOUTS_API = `${API_BASE}/workouts`;

const request = axios.create({
  withCredentials: true,
});

export async function createWorkout(workout: Workout): Promise<Workout> {
  const response = await request.put(WORKOUTS_API, workout);
  return response.data;
}

export async function findWorkoutById(workoutId: string): Promise<Workout> {
  const response = await request.get(`${WORKOUTS_API}/${workoutId}`);
  return response.data;
}

export async function updateWorkout(workout: Workout): Promise<Workout> {
  const response = await request.post(
    `${WORKOUTS_API}/${workout._id}`,
    workout
  );
  return response.data;
}
