import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Credentials } from "./types";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Store/userReducer";

export function Signin() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [attempt, setAttempt] = useState<Attempt>("NoAttempt");
  const navigate = useNavigate();
  async function signin() {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/");
    } catch {
      setCredentials({ username: "", password: "" });
      setAttempt("InvalidAttempt");
    }
  }

  return (
    <form className="w-50">
      <div className="mb-3">
        <label className="form-label" htmlFor="usernameInput">
          Username
        </label>
        <input
          value={credentials.username}
          type="text"
          className="form-control"
          id="usernameInput"
          placeholder="Username"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              username: e.target.value,
            });
            setAttempt("NoAttempt");
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="passwordInput">
          Password
        </label>
        <input
          value={credentials.password}
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              password: e.target.value,
            });
            setAttempt("NoAttempt");
          }}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={(e) => {
          e.preventDefault();
          signin();
        }}
      >
        Sign in
      </button>
      <Alert attempt={attempt} />
    </form>
  );
}

function Alert({ attempt }: { attempt: Attempt }) {
  if (attempt === "InvalidAttempt") {
    return (
      <div className="alert alert-danger" role="alert">
        Invalid username or password
      </div>
    );
  }
  return <></>;
}

type Attempt = "NoAttempt" | "InvalidAttempt";
