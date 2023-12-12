import { useEffect, useState } from "react";
import { Rating } from "./types";
import * as client from "./client";
import { User } from "../User/types";
import { formatDate } from "../util";
import { Rating as RatingWidget } from "react-simple-star-rating";
import { SimpleLink } from "../SimpleLink";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export function UserRatings({ user }: { user: User }) {
  const [ratings, setRatings] = useState<Rating[]>([]);

  async function fetchRatings() {
    try {
      const foundRatings = await client.findRatingsByUserId(user._id);
      setRatings(foundRatings);
    } catch {
      setRatings([]);
    }
  }

  useEffect(() => {
    fetchRatings();
  }, [user._id]);

  return (
    <div className="mt-4">
      <h4 className="mb-4">Ratings posted by {user.firstName}</h4>
      {ratings.length === 0 ? (
        <span className="text-muted">
          {user.firstName} did not post any ratings yet
        </span>
      ) : (
        ratings.map((rating) => <RatingCard key={rating._id} rating={rating} />)
      )}
    </div>
  );
}

function RatingCard({ rating }: { rating: Rating }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <SimpleLink to={`/Workouts/${rating.workout!._id}`}>
            <h5>Workout: {rating.workout!.title}</h5>
          </SimpleLink>
          <RatingWidget initialValue={rating.value} readonly={true} size={30} />
        </div>
        <p className="card-text">{rating.comment}</p>

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
