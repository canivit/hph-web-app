import axios from "axios";
import { API_BASE } from "../environment";
import { Rating } from "./types";

export const RATINGS_API = `${API_BASE}/ratings`;

const request = axios.create({
  withCredentials: true,
});

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