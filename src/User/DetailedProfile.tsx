import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import { User } from "./types";
import { ageInYears } from "../util";
import { SpecificUserContent } from "./SpecificUserContent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { UserRatings } from "./UserRatings";

export function DetailedProfile() {
  const [user, setUser] = useState<User | "Loading" | "NotFound">("Loading");
  const params = useParams();
  const userId = params.userId ? params.userId : "";

  async function fetchUser() {
    try {
      const foundUser = await client.findUserById(userId);
      setUser(foundUser);
    } catch {
      setUser("NotFound");
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (user === "Loading") {
    return <></>;
  }

  if (user === "NotFound") {
    return (
      <div className="alert alert-danger" role="alert">
        User not found!
      </div>
    );
  }

  return (
    <div className="row w-100">
      <div className="col-6">
        <Profile user={user} />
      </div>
      <div className="col-1"></div>
      <div className="col-5">
        {user.role === "Athlete" ? <UserRatings user={user} /> : <></>}
      </div>
    </div>
  );
}

function Profile({ user }: { user: User }) {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">
          @{user.username}{" "}
          <span className="badge text-bg-secondary">{user.role}</span>
        </h2>
        <SpecificUserContent userId={user._id}>
          <Link to="/EditProfile">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPencil} className="me-2" />
              Edit Profile
            </button>
          </Link>
        </SpecificUserContent>
      </div>
      <h2 className="mb-5">
        {user.firstName} {user.lastName}
      </h2>

      <div className="p-3 border border-3 rounded-3">
        <SpecificUserContent userId={user._id}>
          <div className="row">
            <div className="col-3">
              <h4>Birthday:</h4>
            </div>
            <div className="col">
              <h4>{new Date(user.dob).toLocaleDateString()}</h4>
            </div>
          </div>
        </SpecificUserContent>

        <div className="row mt-3">
          <div className="col-3">
            <h4>Age:</h4>
          </div>
          <div className="col">
            <h4>{ageInYears(new Date(user.dob))}</h4>
          </div>
        </div>

        <DisplayIfAthlete role={user.role}>
          <SpecificUserContent userId={user._id}>
            <div className="row mt-3">
              <div className="col-3">
                <h4>Height:</h4>
              </div>
              <div className="col">
                <h4>{user.height}</h4>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-3">
                <h4>Weight:</h4>
              </div>
              <div className="col">
                <h4>{user.weight}</h4>
              </div>
            </div>
          </SpecificUserContent>

          <div className="row mt-3 mb-0">
            <div className="col-3">
              <h4>Level:</h4>
            </div>
            <div className="col">
              <h4>{user.level}</h4>
            </div>
          </div>
        </DisplayIfAthlete>

        <DisplayIfTrainer role={user.role}>
          <div className="row mt-3">
            <div className="col-3">
              <h4>Speiciality:</h4>
            </div>
            <div className="col">
              <h4>{user.speciality}</h4>
            </div>
          </div>

          <h4 className="mt-3">Background:</h4>
          <p className="mb-0">{user.background}</p>
        </DisplayIfTrainer>
      </div>
    </div>
  );
}

function DisplayIfAthlete({
  role,
  children,
}: {
  role: "Trainer" | "Athlete";
  children: React.ReactNode;
}) {
  if (role === "Athlete") {
    return <>{children}</>;
  }
  return <></>;
}

function DisplayIfTrainer({
  role,
  children,
}: {
  role: "Trainer" | "Athlete";
  children: React.ReactNode;
}) {
  if (role === "Trainer") {
    return <>{children}</>;
  }
  return <></>;
}
