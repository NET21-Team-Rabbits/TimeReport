import { Data } from "../../../DataContainer";
import { useContext } from "react";
import { Database } from "../../Database";

export function Employees() {
  const { databases } = useContext(Data);

  if (!databases) return <h1 className="title">Loading...</h1>;

  const database = databases.people;

  return (
    <>
      <h1 className="title">Employees worked hours</h1>
      <Database {...{ database, order: ['Person', 'Total hours'] }} />
    </>
  );
}