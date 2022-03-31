import { Data } from "../../../DataContainer";
import { useContext } from "react";
import { Database } from "../../Database";

export function Projects() {
  const { databases } = useContext(Data);

  if (!databases) return <h1 className="title">Loading...</h1>;
  const database = databases.projects;

  return (
    <>
      <h1 className="title">{database.title}</h1>
      <Database {...{ database, order: ['Project', 'Status', 'Hours', 'Hours Worked', 'Hours Left', 'Timespan'], title: 'Project' }} />
    </>
  );
}

































// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️