import { Modal, Button } from "react-bootstrap";
import { Rating } from "./types";
import { Rating as RatingWidget } from "react-simple-star-rating";

export function RateWorkoutModal({
  visibility,
  rating,
  closeHandler,
  ratingChangedHandler,
  saveHandler,
}: {
  visibility: boolean;
  rating: Rating;
  closeHandler: () => void;
  ratingChangedHandler: (rating: Rating) => void;
  saveHandler: (rating: Rating) => void;
}) {

  return (
    <Modal
      show={visibility}
      onHide={() => {
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
            initialValue={rating.value}
            onClick={(val: number) => {
              ratingChangedHandler({ ...rating, value: val });
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
            ratingChangedHandler({ ...rating, comment: e.target.value });
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            closeHandler();
            saveHandler(rating);
          }}
        >
          Save Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
