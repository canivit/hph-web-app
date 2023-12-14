import { useState } from "react";
import { SearchExercise } from "./SearchExercise";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Exercise, Level, Workout, WorkoutStep } from "./types";

export function WorkoutEditor({
  workout,
  onSaveHandler,
  onCancelHandler,
  title,
}: {
  workout: Workout;
  onSaveHandler: (workout: Workout) => void;
  onCancelHandler: () => void;
  title: string;
}) {
  const [currentWorkout, setCurrentWorkout] = useState(workout);
  const [error, setError] = useState<FormError>("");

  function saveWorkout() {
    if (currentWorkout.title === "") {
      setError("Title is required");
      return;
    }

    if (currentWorkout.description === "") {
      setError("Description is required");
      return;
    }

    onSaveHandler(currentWorkout);
  }

  function onAddExercise(exercise: Exercise) {
    setCurrentWorkout({
      ...currentWorkout,
      steps: [
        ...currentWorkout.steps,
        {
          exercise,
          sets: 3,
          reps: 8,
          rest: 60,
        },
      ],
    });
  }

  function onRemoveStep(stepIdx: number) {
    setCurrentWorkout({
      ...currentWorkout,
      steps: currentWorkout.steps.filter((_, idx) => idx !== stepIdx),
    });
  }

  function onSetsChange(stepIdx: number, sets: number) {
    changeStep(stepIdx, { ...currentWorkout.steps[stepIdx], sets });
  }

  function onRepsChange(stepIdx: number, reps: number) {
    changeStep(stepIdx, { ...currentWorkout.steps[stepIdx], reps });
  }

  function onRestChange(stepIdx: number, rest: number) {
    changeStep(stepIdx, { ...currentWorkout.steps[stepIdx], rest });
  }

  function changeStep(stepIdx: number, step: WorkoutStep) {
    setCurrentWorkout({
      ...currentWorkout,
      steps: currentWorkout.steps.map((s, idx) => (idx === stepIdx ? step : s)),
    });
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className="row">
        <div className="col-7">
          <WorkoutForm
            workout={currentWorkout}
            setWorkout={setCurrentWorkout}
          />
          <WorkoutStepList
            workoutSteps={currentWorkout.steps}
            removeStepHandler={onRemoveStep}
            setsChangeHandler={onSetsChange}
            repsChangeHandler={onRepsChange}
            restChangeHandler={onRestChange}
          />
          <button
            className="btn btn-primary mt-3 me-2"
            onClick={() => saveWorkout()}
          >
            Save Workout
          </button>
          <button
            className="btn btn-danger mt-3"
            onClick={() => onCancelHandler()}
          >
            Cancel
          </button>

          {error !== "" && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
        <div className="col-5">
          <SearchExercise addExerciseHandler={onAddExercise} />
        </div>
      </div>
    </div>
  );
}

function WorkoutForm({
  workout,
  setWorkout,
}: {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
}) {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="titleInput" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="titleInput"
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="descriptionInput"
          rows={5}
          value={workout.description}
          onChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="levelInput">
          Level
        </label>
        <select
          className="form-select"
          id="levelInput"
          value={workout.level}
          onChange={(e) => {
            setWorkout({ ...workout, level: e.target.value as Level });
          }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </form>
  );
}

function WorkoutStepList({
  workoutSteps,
  removeStepHandler,
  setsChangeHandler,
  repsChangeHandler,
  restChangeHandler,
}: {
  workoutSteps: WorkoutStep[];
  removeStepHandler: (stepIdx: number) => void;
  setsChangeHandler: (stepIdx: number, sets: number) => void;
  repsChangeHandler: (stepIdx: number, reps: number) => void;
  restChangeHandler: (stepIdx: number, rest: number) => void;
}) {
  return (
    <div className="mt-4">
      <label className="form-label">Exercises</label>
      {workoutSteps.length === 0 ? (
        <div className="alert alert-warning">
          This workout currently has no exercise. You can search for an exercise
          and add it to workout from the right.
        </div>
      ) : (
        <Accordion defaultActiveKey="-1">
          {workoutSteps.map((workoutStep, idx) => (
            <WorkoutStepItem
              key={idx}
              workoutStep={workoutStep}
              stepIdx={idx}
              removeStepHandler={removeStepHandler}
              setsChangeHandler={setsChangeHandler}
              repsChangeHandler={repsChangeHandler}
              restChangeHandler={restChangeHandler}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}

function WorkoutStepItem({
  workoutStep,
  stepIdx,
  removeStepHandler,
  setsChangeHandler,
  repsChangeHandler,
  restChangeHandler,
}: {
  workoutStep: WorkoutStep;
  stepIdx: number;
  removeStepHandler: (stepIdx: number) => void;
  setsChangeHandler: (stepIdx: number, sets: number) => void;
  repsChangeHandler: (stepIdx: number, reps: number) => void;
  restChangeHandler: (stepIdx: number, rest: number) => void;
}) {
  return (
    <Accordion.Item eventKey={stepIdx.toString()}>
      <Accordion.Header>
        <div className="d-grid">
          <div className="mb-3">
            <button
              className="btn btn-outline-danger me-3"
              onClick={(e) => {
                e.stopPropagation();
                removeStepHandler(stepIdx);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            {workoutStep.exercise.name}
          </div>
          <div className="d-flex me-5">
            <div className="input-group me-2">
              <input
                type="number"
                className="form-control"
                value={workoutStep.sets}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setsChangeHandler(stepIdx, e.target.valueAsNumber)
                }
              />
              <span
                className="input-group-text"
                onClick={(e) => e.stopPropagation()}
              >
                sets
              </span>
            </div>

            <div className="input-group me-2">
              <input
                type="number"
                className="form-control"
                value={workoutStep.reps}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  repsChangeHandler(stepIdx, e.target.valueAsNumber)
                }
              />
              <span
                className="input-group-text"
                onClick={(e) => e.stopPropagation()}
              >
                reps
              </span>
            </div>

            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={workoutStep.rest}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  restChangeHandler(stepIdx, e.target.valueAsNumber)
                }
              />
              <span
                className="input-group-text"
                onClick={(e) => e.stopPropagation()}
              >
                seconds rest
              </span>
            </div>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Target Muscle:</strong> {workoutStep.exercise.targetMuscle}
        </p>
        <p>
          <strong>Equipment:</strong> {workoutStep.exercise.equipment}
        </p>
        <img src={workoutStep.exercise.gifUrl} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

type FormError = "Title is required" | "Description is required" | "";
