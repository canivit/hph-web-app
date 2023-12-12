import { useEffect, useState } from "react";
import { Rating } from "./types";
import * as client from "./client";
import { User } from "../User/types";
import { RatingCard } from "./RatingCard";

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
