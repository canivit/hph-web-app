export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: "Trainer" | "Athlete";
}

export interface Trainer extends User {
  background: string;
  speciality: string;
}

export interface Athlete extends User {
  height: number;
  weight: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export type Credentials = {
  username: string;
  password: string;
};