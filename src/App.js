import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from './components/Page';
import { Home } from './components/pages/home/Home';
import { Development } from "./components/pages/dev/Development";
import { Example } from "./components/pages/example/Example";
import { Projects } from "./components/pages/projects/Projects";
import { Management } from "./components/pages/management/Management";
import { Error } from "./components/pages/error/Error";
import { useEffect, useState } from "react";
import { fetchData } from "./data/fetchData";

export default function App() {
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState(false);
  const [roles, setRoles] = useState(false);
  const [databases, setDatabases] = useState(false);

  useEffect(() => {
    fetchData({ setUsers, setRoles, setDatabases });
  }, []);

  useEffect(() => {
    if (!users) return;

    if (localStorage['user']) setUser(users.find(user => user.id === localStorage['user']));

  }, [users]);

  useEffect(() => {
    if (user === false) return;

    if (user === undefined) return localStorage.removeItem('user');

    localStorage['user'] = user.id;
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page {...{ user, setUser, users, roles }} />}>
          <Route index element={<Home />} />
          <Route path="dev" element={<Development {...{ user, databases }} />} />
          <Route path="example" element={<Example />} />
          <Route path="projects" element={<Projects {...{ user }} database={databases && databases.find(database => database.title[0].text.content === 'Projects')} />} />
          <Route path="management" element={<Management {...{ user, users, roles }} />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️