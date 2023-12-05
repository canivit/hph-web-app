import { User } from "../User/types";

export type Workout = {
  _id: string;
  title: string;
  description: string;
  level: Level;
  post_date: string;
  steps: WorkoutStep[];
  trainer?: User;
};

export type WorkoutStep = {
  exercise: Exercise;
  sets: number;
  reps: number;
  rest: number;
};

export type Exercise = {
  name: string;
  targetMuscle: string;
  equipment: string;
  gifUrl: string;
};

export type Level = "Beginner" | "Intermediate" | "Advanced";
