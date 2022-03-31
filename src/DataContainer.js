import { createContext, useEffect, useState } from "react";
import { fetchData } from "./data/fetchData";
import { getCachedUser } from "./data/getCachedUser";
import { getIsMobile } from "./data/getIsMobile";

export const Data = createContext();

export function DataContainer({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [roles, setRoles] = useState(null);
  const [databases, setDatabases] = useState(null);
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    fetchData({ setUsers, setRoles, setDatabases });

    window.addEventListener('resize', () => {
      setIsMobile(getIsMobile());
    });
  }, []);

  useEffect(() => {
    getCachedUser(setUser, users);
  }, [users]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('user', user.id);
  }, [user]);

  return (
    <Data.Provider value={{ user, setUser, users, setUsers, roles, setRoles, databases, setDatabases, isMobile, setIsMobile }}>
      {children}
    </Data.Provider>
  );
}