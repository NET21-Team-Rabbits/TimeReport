import { AddLog } from "./AddLog";
import { Database } from "../../Database";

export function Logs({ user, databases }) {
  if (!databases) return <h1>Loading...</h1>;

  return (
    <>
      <AddLog {...{ user, databases }} />
      <Database
        database={databases.logs}
        order={['Project', 'Person', 'Hours', 'Comment', 'Date']}
      />
    </>
  );
};