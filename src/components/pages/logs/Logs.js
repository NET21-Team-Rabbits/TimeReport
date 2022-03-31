import { Data } from "../../../DataContainer";
import { useContext } from "react";
import { AddLog } from "./AddLog";
import { Database } from "../../Database";

export function Logs() {
  const { databases } = useContext(Data);

  if (!databases) return <h1>Loading...</h1>;

  return (
    <>
      <AddLog />
      <Database
        database={databases.logs}
        order={['Project', 'Person', 'Hours', 'Comment', 'Date']}
      />
    </>
  );
};