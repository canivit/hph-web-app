import { Workout, WorkoutStep, Exercise } from "./types";
import * as client from "./client";

export async function updateGifUrlsOfWorkout(
  workout: Workout
): Promise<Workout> {
  return {
    ...workout,
    steps: await updateGifUrlsOfSteps(workout.steps),
  };
}

async function updateGifUrlsOfSteps(
  steps: WorkoutStep[]
): Promise<WorkoutStep[]> {
  return await Promise.all(steps.map(updateGifUrlOfStep));
}

async function updateGifUrlOfStep(step: WorkoutStep): Promise<WorkoutStep> {
  return {
    ...step,
    exercise: await updateGifUrl(step.exercise),
  };
}

async function updateGifUrl(exercise: Exercise): Promise<Exercise> {
  return await client.findExerciseById(exercise.id);
}
