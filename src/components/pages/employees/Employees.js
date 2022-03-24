import { Database } from "../../Database";

export function Employees({ database }) {
  if (!database) return <h1 className="title">Loading...</h1>;

  return (
    <>
      <h1 className="title">Employees worked hours</h1>
      <Database {...{ database, order: ['Person', 'Total hours'] }} />
    </>
  );
}