import { Database } from "../../Database";

export function Projects({ database, order }) {
  if (!database) return <h1 className="title">Loading...</h1>;

  return (
    <>
      <h1 className="title">{database.title[0].text.content}</h1>
      <Database {...{ database, order }} />
    </>
  );
}

































// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️