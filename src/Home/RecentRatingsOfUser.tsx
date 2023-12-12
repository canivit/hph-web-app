import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";
import { useEffect, useState } from "react";
import * as client from "../Rating/client";
import { Rating } from "../Rating/types";
import { RatingCard } from "../Rating/RatingCard";

const NUM_OF_RATINGS = 6;

export function RecentRatingsOfUser() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );
  const [ratings, setRatings] = useState<Rating[] | "NoRender">("NoRender");

  const fetchRatings = async (trainerId: string) => {
    const foundRatings = await client.findMostRecentRatingsByUserId(
      trainerId,
      NUM_OF_RATINGS
    );
    setRatings(foundRatings);
  };

  useEffect(() => {
    if (currentUser !== false && currentUser.role === "Athlete") {
      fetchRatings(currentUser._id);
    }
  }, []);

  if (ratings === "NoRender" || ratings.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-5 text-center">
      <hr />
      <h3 className="mb-4">Recent ratings you posted</h3>
      <RatingCards ratings={ratings} />
    </div>
  );
}

function RatingCards({ ratings }: { ratings: Rating[] }) {
  return (
    <div className="d-flex flex-row flex-wrap">
      {ratings.map((rating) => (
        <div
          className="text-start"
          key={rating._id}
          style={{
            width: "600px",
            marginRight: "2%",
            marginBottom: "2%",
          }}
        >
          <RatingCard rating={rating} />
        </div>
      ))}
    </div>
  );
}
