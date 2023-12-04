import { useNavigate } from "react-router";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Store/userReducer";
import { useEffect } from "react";

export function Signout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signout() {
    await client.signout();
    dispatch(setCurrentUser(false));
    navigate("/");
  }

  useEffect(() => {
    signout();
  });
  return <></>;
}
