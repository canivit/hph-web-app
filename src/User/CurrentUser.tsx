import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "../Store/userReducer";
import { useEffect, useState } from "react";

export function CurrentUser({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser() {
    try {
      const currentUser = await client.getSignedInUser();
      dispatch(setCurrentUser(currentUser));
    } catch (error) {}
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{!loading && children}</>;
}
