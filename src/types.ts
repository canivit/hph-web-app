export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: "Trainer" | "Athlete";

  // Trainer properties
  background?: string;
  speciality?:
    | "Bodybuilding"
    | "Powerlifting"
    | "Crossfit"
    | "Endurance"
    | "Calisthenics";

  // Athlete properties
  height?: number;
  weight?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
}

export type Credentials = {
  username: string;
  password: string;
};
