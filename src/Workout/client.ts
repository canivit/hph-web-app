import axios from "axios";
import { API_BASE } from "../environment";
import { Exercise, Workout } from "./types";

const WORKOUTS_API = `${API_BASE}/workouts`;
export const RATINGS_API = `${API_BASE}/ratings`;

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

export async function findAllWorkouts(): Promise<Workout[]> {
  const response = await request.get(WORKOUTS_API);
  return response.data;
}

export async function deleteWorkout(workoutId: string): Promise<void> {
  await request.delete(`${WORKOUTS_API}/${workoutId}`);
}

export async function findWorkoutsByUserId(userId: string): Promise<Workout[]> {
  const response = await request.get(`${WORKOUTS_API}/user/${userId}`);
  return response.data;
}

export async function findMostRecentWorkoutsByUserId(
  userId: string,
  limit: number
): Promise<Workout[]> {
  const response = await request.get(
    `${WORKOUTS_API}/user/${userId}/recent/${limit}`
  );
  return response.data;
}

const exerciseRequest = axios.create({
  params: {
    limit: 100,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_EXERCISE_API_KEY!,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});

const acceptedEquipment = ["barbell", "dumbbell", "body weight"];

export async function searchExercise(name: string): Promise<Exercise[]> {
  const param = encodeURIComponent(name);
  const response = await exerciseRequest.get(
    `https://exercisedb.p.rapidapi.com/exercises/name/${param}`
  );
  return response.data
    .map(responseDataToExercise)
    .filter((e: Exercise) => acceptedEquipment.includes(e.equipment));
}

export async function findExerciseById(exerciseId: string): Promise<Exercise> {
  const response = await exerciseRequest.get(
    `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`
  );
  return responseDataToExercise(response.data);
}

function responseDataToExercise(data: any): Exercise {
  return {
    id: data.id,
    name: data.name,
    targetMuscle: data.target,
    equipment: data.equipment,
    gifUrl: data.gifUrl,
  };
}
