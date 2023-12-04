import { useState } from "react";
import { useNavigate } from "react-router";
import * as client from "./client";
import { User } from "./types";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser as setGlobalUser } from "../Store/userReducer";
export function Signup() {
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    role: "Trainer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signup() {
    try {
      const currentUser = await client.signup(user);
      dispatch(setGlobalUser(currentUser));
      setError("");
      navigate("/EditProfile");
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setError(e.response?.data ?? "Unknown error occurred");
      }
      setError("Unknown error occurred");
    }
  }

  return (
    <form className="w-50">
      <div className="mb-3">
        <label className="form-label" htmlFor="usernameInput">
          Username
        </label>
        <input
          type="text"
          value={user.username}
          className="form-control"
          id="usernameInput"
          placeholder="Username"
          onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="passwordInput">
          Password
        </label>
        <input
          type="password"
          value={user.password}
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="firstNameInput">
          Firstname
        </label>
        <input
          type="text"
          value={user.firstName}
          className="form-control"
          id="firstNameInput"
          placeholder="Firstname"
          onChange={(e) => {
            setUser({
              ...user,
              firstName: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="lastNameInput">
          Lastname
        </label>
        <input
          type="text"
          value={user.lastName}
          className="form-control"
          id="lastNameInput"
          placeholder="Lastname"
          onChange={(e) => {
            setUser({
              ...user,
              lastName: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="dobInput">
          Date of Birth
        </label>
        <input
          type="date"
          value={user.dob?.split("T")[0]}
          className="form-control"
          id="dobInput"
          placeholder="Date of Birth"
          onChange={(e) => {
            setUser({
              ...user,
              dob: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="roleInput">
          Role
        </label>
        <select
          id="roleInput"
          value={user.role}
          className="form-select"
          onChange={(e) => {
            if (e.target.value === "Trainer" || e.target.value === "Athlete") {
              setUser({
                ...user,
                role: e.target.value,
              });
            }
          }}
        >
          <option value="Trainer">Trainer</option>
          <option value="Athlete">Athlete</option>
        </select>
      </div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        Signup
      </button>
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
