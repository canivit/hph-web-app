import { useEffect, useState } from "react";
import { User } from "../User/types";
import * as client from "../User/client";
import { SimpleLink } from "../SimpleLink";

const NUM_OF_USERS = 5;

export function RecentlyJoinedUsers() {
  const [users, setUsers] = useState<{ trainers: User[]; athletes: User[] }>({
    trainers: [],
    athletes: [],
  });

  const fetchUsers = async () => {
    setUsers(await client.findMostRecentlyJoinedUsers(NUM_OF_USERS));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-5 text-center">
      <hr />
      <h3 className="mb-4">Recently joined users</h3>
      <div className="row mb-5">
        <div className="col-6">
          <TrainerList trainers={users.trainers} />
        </div>
        <div className="col-6">
          <AthleteList athletes={users.athletes} />
        </div>
      </div>
    </div>
  );
}

function TrainerList({ trainers }: { trainers: User[] }) {
  return (
    <div>
      <h4>Trainers</h4>
      <ul className="list-group">
        {trainers.map((trainer) => (
          <li className="list-group-item" key={trainer._id}>
            <SimpleLink to={`/Profile/${trainer._id}`}>
              <div className="d-flex justify-content-between">
                <div>
                  {trainer.firstName} {trainer.lastName}
                </div>
                {trainer.speciality && (
                  <div>Speciality: {trainer.speciality}</div>
                )}
              </div>
            </SimpleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AthleteList({ athletes }: { athletes: User[] }) {
  return (
    <div>
      <h4>Athletes</h4>
      <ul className="list-group">
        {athletes.map((athlete) => (
          <li className="list-group-item" key={athlete._id}>
            <SimpleLink to={`/Profile/${athlete._id}`}>
              <div className="d-flex justify-content-between">
                <div>
                  {athlete.firstName} {athlete.lastName}
                </div>
                {athlete.level && <div>Level: {athlete.level}</div>}
              </div>
            </SimpleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
