import { Data } from "../../../DataContainer";
import { useContext } from "react";
import "./input.scss";

export function UserInput() {
  const { setUser, users } = useContext(Data);

  return (
    <section className="input">
      <h1 className="title">Select User</h1>
      <ul>
        {
          users.map(user =>
            <li key={user.id} onClick={() => setUser(user)} children={user.name} />
          )
        }
      </ul>
    </section>

  );
};
