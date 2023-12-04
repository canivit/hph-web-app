import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../Store/store";
import { useEffect, useState } from "react";
import { User } from "./types";
import { useNavigate } from "react-router";
import * as client from "./client";
import { setCurrentUser } from "../Store/userReducer";
import { TrainerContent } from "./TrainerContent";
import { AthleteContent } from "./AthleteContent";

export function EditProfile() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );
  const dispatch = useDispatch();

  const [attempt, setAttempt] = useState<Attempt>("NoAttempt");
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    role: "Trainer",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === false) {
      navigate("/Signin");
    } else {
      setUser(currentUser);
    }
  }, []);

  async function updateProfile() {
    try {
      await client.updateProfile(user);
      setAttempt("ValidAttempt");
      dispatch(setCurrentUser(user));
    } catch (e) {
      if (e instanceof Error) {
        setAttempt({ error: e.message });
      }
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
          readOnly={true}
          disabled={true}
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
            setAttempt("NoAttempt");
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
            setAttempt("NoAttempt");
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
            setAttempt("NoAttempt");
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
            setAttempt("NoAttempt");
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="roleInput">
          Role
        </label>
        <input
          type="text"
          value={user.role}
          className="form-control"
          id="roleInput"
          placeholder="Role"
          readOnly={true}
          disabled={true}
        />
      </div>
      <TrainerContent>
        <div className="mb-3">
          <label className="form-label" htmlFor="specialityInput">
            Speciality
          </label>
          <select
            id="specialityInput"
            value={user.speciality}
            className="form-select"
            onChange={(e) => {
              if (
                e.target.value === "Bodybuilding" ||
                e.target.value === "Powerlifting" ||
                e.target.value === "Crossfit" ||
                e.target.value === "Endurance" ||
                e.target.value === "Calisthenics"
              ) {
                setUser({
                  ...user,
                  speciality: e.target.value,
                });
              }
            }}
          >
            <option value="Bodybuilding">Bodybuilding</option>
            <option value="Powerlifting">Powerlifting</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Endurance">Endurance</option>
            <option value="Calisthenics">Calisthenics</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="backgroundInput">
            Background
          </label>
          <textarea
            value={user.background}
            className="form-control"
            id="backgroundInput"
            placeholder="Explain your background here"
            rows={5}
            onChange={(e) => {
              setUser({
                ...user,
                background: e.target.value,
              });
              setAttempt("NoAttempt");
            }}
          />
        </div>
      </TrainerContent>
      <AthleteContent>
        <div className="mb-3">
          <label className="form-label" htmlFor="levelInput">
            Level
          </label>
          <select
            id="levelInput"
            value={user.level}
            className="form-select"
            onChange={(e) => {
              if (
                e.target.value === "Beginner" ||
                e.target.value === "Intermediate" ||
                e.target.value === "Advanced"
              ) {
                setUser({
                  ...user,
                  level: e.target.value,
                });
              }
            }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label className="form-label" htmlFor="heightInput">
                Height
              </label>
              <div className="input-group">
                <input
                  id="heightInput"
                  type="number"
                  className="form-control"
                  value={user.height}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      height: e.target.valueAsNumber,
                    });
                    setAttempt("NoAttempt");
                  }}
                />
                <span className="input-group-text">Centimeters</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label className="form-label" htmlFor="weightInput">
                Weight
              </label>
              <div className="input-group">
                <input
                  id="weightInput"
                  type="number"
                  className="form-control"
                  value={user.weight}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      weight: e.target.valueAsNumber,
                    });
                    setAttempt("NoAttempt");
                  }}
                />
                <span className="input-group-text">Kilograms</span>
              </div>
            </div>
          </div>
        </div>
      </AthleteContent>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={(e) => {
          e.preventDefault();
          updateProfile();
        }}
      >
        Save Profile
      </button>
      <Alert attempt={attempt} />
    </form>
  );
}

function Alert({ attempt }: { attempt: Attempt }) {
  switch (attempt) {
    case "NoAttempt":
      return null;
    case "ValidAttempt":
      return (
        <div className="alert alert-success" role="alert">
          Profile updated successfully
        </div>
      );
    default:
      return (
        <div className="alert alert-danger" role="alert">
          {attempt.error}
        </div>
      );
  }
}

type Attempt = "NoAttempt" | "ValidAttempt" | { error: string };
