import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GlobalState } from "../Store/store";

export function Profile() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );
  if (currentUser === false) {
    return <Navigate to="/Signin" />;
  }

  return <Link to="/EditProfile" className="btn btn-primary">Edit Profile</Link>;
}
