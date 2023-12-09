import {
  faPencil,
  faTrashCan,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SpecificUserContent } from "../User/SpecificUserContent";
import { formatDate } from "../util";
import { LevelBadge } from "./LevelBadge";
import { Rating, Workout, WorkoutStep } from "./types";
import { RateWorkoutModal } from "./RateWorkoutModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";

export function WorkoutDetails({
  workout,
  ratings,
  deleteWorkoutHandler,
  createRatingHandler,
}: {
  workout: Workout;
  ratings: Rating[];
  deleteWorkoutHandler: () => void;
  createRatingHandler: (rating: Rating) => void;
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [rating, setRating] = useState<Rating>({
    _id: "",
    value: 0,
    comment: "",
    date: new Date(),
  });

  function onCloseModal() {
    setModalVisibility(false);
    setRating({ ...rating, value: 0, comment: "" });
  }

  function onShowModal() {
    setModalVisibility(true);
  }

  return (
    <div className="border p-4 rounded">
      <RateWorkoutModal
        rating={rating}
        visibility={modalVisibility}
        closeHandler={onCloseModal}
        ratingChangedHandler={setRating}
        saveHandler={createRatingHandler}
      />
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
          <RateWorkoutButton ratings={ratings} onClick={onShowModal} />
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
    </div>
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

function RateWorkoutButton({
  ratings,
  onClick,
}: {
  ratings: Rating[];
  onClick: () => void;
}) {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  if (currentUser === false || currentUser.role !== "Athlete") {
    return <></>;
  }

  const ratingExists = ratings.some((r) => r.athlete!._id === currentUser._id);
  if (ratingExists) {
    return <></>;
  }

  return (
    <button className="btn btn-success" onClick={onClick}>
      <FontAwesomeIcon icon={faStarHalfStroke} className="me-2" />
      Rate this workout
    </button>
  );
}
