import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimpleLink } from "../SimpleLink";
import { formatDate } from "../util";
import { Rating } from "./types";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Rating as RatingWidget } from "react-simple-star-rating";

export function RatingCard({ rating }: { rating: Rating }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <SimpleLink to={`/Workouts/${rating.workout!._id}`}>
          <h5>Workout: {rating.workout!.title}</h5>
        </SimpleLink>
        <div className="mb-3">
          <RatingWidget initialValue={rating.value} readonly={true} size={30} />
        </div>
        <p className="card-text mb-2">{rating.comment}</p>

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">
            Posted on: {formatDate(new Date(rating.date))}
          </span>
          <Link to={`/Workouts/${rating.workout!._id}`}>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faEye} /> View workout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
