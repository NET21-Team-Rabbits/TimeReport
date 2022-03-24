import { Database } from "../../Database";

export function Projects({ database }) {
  if (!database) return <h1 className="title">Loading...</h1>;

  return (
    <>
      <h1 className="title">{database.title}</h1>
      <Database {...{ database, order: ['Project', 'Status', 'Hours', 'Hours Worked', 'Hours Left', 'Timespan'] }} />
    </>
  );
}

































// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️