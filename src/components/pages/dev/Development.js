import { useEffect, useState } from "react";
import { Database } from "../../Database";

export function Development({ user, databases }) {
  if (!databases?.logs) return <h1 className="title">Loading...</h1>;

  console.log(databases.logs);
  return (
    <>
      <Database database={databases?.logs ?? null} />
    </>
  );
};