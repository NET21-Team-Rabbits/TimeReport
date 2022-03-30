import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from './components/Page';
import { Home } from './components/pages/home/Home';
import { Logs } from "./components/pages/logs/Logs";
import { Example } from "./components/pages/example/Example";
import { Projects } from "./components/pages/projects/Projects";
import { Employees } from "./components/pages/employees/Employees";
import { Management } from "./components/pages/management/Management";
import { Error } from "./components/pages/error/Error";
import { useEffect, useState } from "react";
import { fetchData } from "./data/fetchData";
import { getCachedUser } from "./data/getCachedUser";
import { getIsMobile } from "./data/getIsMobile";

export default function App() {
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
    <Router>
      <Routes>
        <Route path="/" element={<Page {...{ user, setUser, users, roles, isMobile }} />} >
          <Route index element={<Home />} />
          <Route path="logs" element={<Logs {...{ user, databases }} />} />
          <Route path="example" element={<Example {...{ user, databases }} />} />
          <Route path="projects" element={<Projects database={databases?.projects ?? null} />} />
          <Route path="employees" element={<Employees database={databases?.people ?? null} />} />
          <Route path="management" element={<Management {...{ user, users, roles, setRoles }} />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️