export type Workout = {
  _id: string;
  title: string;
  description: string;
  level: Level;
  post_date: Date;
  steps: WorkoutStep[];
  trainer_id: string;
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
