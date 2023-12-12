import { useSelector } from "react-redux";
import { SimpleLink } from "../SimpleLink";
import { formatDate } from "../util";
import { Rating } from "./types";
import { Rating as RatingWidget } from "react-simple-star-rating";
import { GlobalState } from "../Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { RateWorkoutModal } from "./RateWorkoutModal";

export function WorkoutRatings({
  ratings,
  updateRatingHandler,
  deleteRatingHandler,
}: {
  ratings: Rating[];
  updateRatingHandler: (rating: Rating) => void;
  deleteRatingHandler: (ratingId: string) => void;
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating>({
    _id: "",
    value: 0,
    comment: "",
    date: new Date(),
  });

  function closeModal() {
    setModalVisibility(false);
  }

  function showModal() {
    setModalVisibility(true);
  }

  return (
    <>
      <RateWorkoutModal
        visibility={modalVisibility}
        rating={selectedRating}
        closeHandler={closeModal}
        saveHandler={updateRatingHandler}
        ratingChangedHandler={setSelectedRating}
      />
      <h2 className="mb-4">Ratings</h2>
      {ratings.length === 0 ? (
        <span className="text-muted">No ratings yet</span>
      ) : (
        ratings.map((rating) => (
          <RatingCard
            key={rating._id}
            rating={rating}
            showModal={showModal}
            setSelectedRating={setSelectedRating}
            deleteRatingHandler={deleteRatingHandler}
          />
        ))
      )}
    </>
  );
}

function RatingCard({
  rating,
  showModal,
  setSelectedRating,
  deleteRatingHandler,
}: {
  rating: Rating;
  showModal: () => void;
  setSelectedRating: (rating: Rating) => void;
  deleteRatingHandler: (ratingId: string) => void;
}) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <RatingWidget initialValue={rating.value} readonly={true} size={30} />
          <RatingCardControlButtons
            rating={rating}
            showModal={showModal}
            setSelectedRating={setSelectedRating}
            deleteRatingHandler={deleteRatingHandler}
          />
        </div>
        <p className="card-text">{rating.comment}</p>

        <div className="d-flex justify-content-between">
          <span className="text-muted">
            Posted on: {formatDate(new Date(rating.date))}
          </span>
          <span className="text-muted">
            Posted by:{" "}
            <SimpleLink to={`/Profile/${rating.athlete!._id}`}>
              @{rating.athlete!.username}
            </SimpleLink>
          </span>
        </div>
      </div>
    </div>
  );
}

function RatingCardControlButtons({
  rating,
  showModal,
  setSelectedRating,
  deleteRatingHandler,
}: {
  rating: Rating;
  showModal: () => void;
  setSelectedRating: (rating: Rating) => void;
  deleteRatingHandler: (ratingId: string) => void;
}) {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  if (currentUser === false || currentUser._id !== rating.athlete!._id) {
    return <></>;
  }

  return (
    <div>
      <button
        className="btn btn-warning me-2"
        onClick={() => {
          showModal();
          setSelectedRating(rating);
        }}
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <button
        className="btn btn-danger"
        onClick={() => deleteRatingHandler(rating._id)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
}
