import axios from "axios";
import { API_BASE } from "../environment";
import { Exercise, Rating, Workout } from "./types";

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
  userId: string
): Promise<Workout[]> {
  const response = await request.get(`${WORKOUTS_API}/user/${userId}/recent/5`);
  return response.data;
}

export async function createRating(rating: Rating, workoutId: string) {
  const response = await request.put(
    `${RATINGS_API}/workout/${workoutId}`,
    rating
  );
  return response.data;
}

export async function findRatingsByWorkoutId(
  workoutId: string
): Promise<Rating[]> {
  const response = await request.get(`${RATINGS_API}/workout/${workoutId}`);
  return response.data;
}

export async function findRatingsByUserId(userId: string): Promise<Rating[]> {
  const response = await request.get(`${RATINGS_API}/user/${userId}`);
  return response.data;
}

export async function updateRating(rating: Rating): Promise<Rating> {
  const response = await request.post(`${RATINGS_API}/${rating._id}`, rating);
  return response.data;
}

export async function deleteRating(ratingId: string): Promise<Rating> {
  return await request.delete(`${RATINGS_API}/${ratingId}`);
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
