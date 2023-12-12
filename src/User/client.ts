import axios from "axios";
import { Credentials, User } from "./types";
import { API_BASE } from "../environment";

export const USERS_API = `${API_BASE}/users`;

const request = axios.create({
  withCredentials: true,
});

export async function signup(user: User): Promise<User> {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response.data;
}

export async function signout(): Promise<void> {
  await request.get(`${USERS_API}/signout`);
}

export async function getSignedInUser(): Promise<User> {
  const response = await request.get(`${USERS_API}/signed_in`);
  return response.data;
}

export async function signin(credentials: Credentials): Promise<User> {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
}

export async function updateProfile(user: User): Promise<User> {
  const response = await request.post(`${USERS_API}/${user._id}`, user);
  return response.data;
}

export async function findUserById(userId: string): Promise<User> {
  const response = await request.get(`${USERS_API}/${userId}`);
  return response.data;
}

export async function findMostRecentlyJoinedUsers(limit: number): Promise<{
  trainers: User[];
  athletes: User[];
}> {
  const response = await request.get(`${USERS_API}/recent/${limit}`);
  return response.data;
}
