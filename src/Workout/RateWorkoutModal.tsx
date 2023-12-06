import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Rating } from "./types";
import { Rating as RatingWidget } from "react-simple-star-rating";

export function RateWorkoutModal({
  show,
  closeHandler,
  saveHandler,
}: {
  show: boolean;
  closeHandler: () => void;
  saveHandler: (rating: Rating) => void;
}) {
  const [rating, setRating] = useState<Rating>({
    _id: "",
    value: 0,
    comment: "",
    date: new Date(),
  });

  function resetRating() {
    setRating({
      _id: "",
      value: 0,
      comment: "",
      date: new Date(),
    });
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        resetRating();
        closeHandler();
      }}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Rate Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="form-label me-2">Rating:</label>
          <RatingWidget
            onClick={(val: number) => {
              setRating({ ...rating, value: val });
            }}
          />
        </div>
        <label className="form-label" htmlFor="commentsInput">
          Comments
        </label>
        <textarea
          className="form-control"
          id="commentsInput"
          placeholder="Your review for this workout"
          rows={5}
          value={rating.comment}
          onChange={(e) => {
            setRating({ ...rating, comment: e.target.value });
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            resetRating();
            saveHandler(rating);
          }}
        >
          Save Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
