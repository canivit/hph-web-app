import { useEffect, useState } from "react";
import { Rating, Workout, WorkoutStep } from "./types";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { LevelBadge } from "./LevelBadge";
import { formatDate } from "../util";
import { updateGifUrlsOfWorkout } from "./util";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faStarHalfStroke,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { SpecificUserContent } from "../User/SpecificUserContent";
import { Link } from "react-router-dom";
import { AthleteContent } from "../User/AthleteContent";
import { RateWorkoutModal } from "./RateWorkoutModal";

export function DetailedWorkout() {
  const [workout, setWorkout] = useState<Workout | "Loading" | "NotFound">(
    "Loading"
  );
  const [rateModalVisibility, setRateModalVisibility] = useState(false);
  const params = useParams();
  const workoutId = params.workoutId ? params.workoutId : "";
  const navigate = useNavigate();

  async function fetchWorkout() {
    try {
      let workout = await client.findWorkoutById(workoutId);
      workout = await updateGifUrlsOfWorkout(workout);
      setWorkout(workout);
    } catch {
      setWorkout("NotFound");
    }
  }

  async function deleteWorkout() {
    await client.deleteWorkout(workoutId);
    navigate("/Workouts");
  }

  async function createRating(rating: Rating) {
    const response = await client.createRating(rating, workoutId);
    console.log(response);
    onCloseModal();
  }

  function onCloseModal() {
    setRateModalVisibility(false);
  }

  function onShowModal() {
    setRateModalVisibility(true);
  }

  useEffect(() => {
    fetchWorkout();
  }, [workoutId]);

  if (workout === "Loading") {
    return <></>;
  }

  if (workout === "NotFound") {
    return (
      <div className="alert alert-danger" role="alert">
        Workout not found!
      </div>
    );
  }

  return (
    <>
      <RateWorkoutModal
        show={rateModalVisibility}
        closeHandler={onCloseModal}
        saveHandler={createRating}
      />
      <div className="w-100 row">
        <div className="col-6">
          <WorkoutDetails
            workout={workout}
            deleteWorkoutHandler={deleteWorkout}
            rateModalHandler={onShowModal}
          />
        </div>
        <div className="col-6"></div>
      </div>
    </>
  );
}

function WorkoutDetails({
  workout,
  deleteWorkoutHandler,
  rateModalHandler,
}: {
  workout: Workout;
  deleteWorkoutHandler: () => void;
  rateModalHandler: () => void;
}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">{workout.title}</h2>
        <div>
          <SpecificUserContent userId={workout.trainer!._id}>
            <Link
              to={`/EditWorkout/${workout._id}`}
              className="btn btn-warning me-2"
            >
              <FontAwesomeIcon icon={faPencil} className="me-2" />
              Edit
            </Link>
            <button
              className="btn btn-danger me-2"
              onClick={deleteWorkoutHandler}
            >
              <FontAwesomeIcon icon={faTrashCan} className="me-2" />
              Remove
            </button>
          </SpecificUserContent>
          <AthleteContent>
            <button className="btn btn-success" onClick={rateModalHandler}>
              <FontAwesomeIcon icon={faStarHalfStroke} className="me-2" />
              Rate this workout
            </button>
          </AthleteContent>
        </div>
      </div>
      <h5 className="mb-4">
        Level: <LevelBadge level={workout.level} />
      </h5>
      <div className="d-flex mb-4">
        <h5 className="me-4">
          Posted on:{" "}
          <span className="badge bg-primary">
            {formatDate(new Date(workout.post_date))}
          </span>
        </h5>
        <h5>
          Posted by:{" "}
          <span className="badge bg-primary">@{workout.trainer!.username}</span>
        </h5>
      </div>
      <h5>Description</h5>
      <p className="mb-4">{workout.description}</p>
      <h5>Exercises</h5>
      <WorkoutStepList steps={workout.steps} />
    </>
  );
}

function WorkoutStepList({ steps }: { steps: WorkoutStep[] }) {
  return (
    <Accordion>
      {steps.map((step, idx) => (
        <WorkoutStepItem workoutStep={step} stepIdx={idx} key={idx} />
      ))}
    </Accordion>
  );
}

function WorkoutStepItem({
  workoutStep,
  stepIdx,
}: {
  workoutStep: WorkoutStep;
  stepIdx: number;
}) {
  return (
    <Accordion.Item eventKey={stepIdx.toString()}>
      <Accordion.Header>
        <div className="d-flex">
          <div className="me-5">{workoutStep.exercise.name}</div>
          <span className="badge rounded-pill text-bg-info me-2">
            {workoutStep.sets} sets
          </span>
          <span className="badge rounded-pill text-bg-info me-2">
            {workoutStep.reps} reps
          </span>
          <span className="badge rounded-pill text-bg-info me-2">
            {workoutStep.rest} seconds rest
          </span>
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
