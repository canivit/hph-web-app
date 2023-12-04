import axios from "axios";
import { Credentials, User } from "./types";

export const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const request = axios.create({
  withCredentials: true,
});

export async function signup(user: User): Promise<User> {
  const response = await request.post(`${USERS_API}/signup`, removeId(user));
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
  const response = await request.post(
    `${USERS_API}/${user._id}`,
    removeId(user)
  );
  return response.data;
}

function removeId(obj: { _id: string; [key: string]: any }) {
  const { _id, ...rest } = obj;
  return rest;
}
