import { User } from "../User/types";
import { Workout } from "../Workout/types";

export type Rating = {
  _id: string;
  value: number;
  comment: string;
  date: Date;
  athlete?: User;
  workout?: Workout;
};