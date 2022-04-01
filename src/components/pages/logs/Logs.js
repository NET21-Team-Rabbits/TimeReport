import { Data } from "../../../DataContainer";
import { useContext } from "react";
import { Database } from "../../Database";

export function Logs() {
  const { databases } = useContext(Data);

  if (!databases) return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="title">Logs</h1>
      <Database
        database={databases.logs}
        order={['Project', 'Person', 'Hours', 'Comment', 'Date']}
      />
    </>
  );
};