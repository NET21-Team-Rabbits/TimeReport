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
import { getCachedUser } from "./data/getCachedUser";

export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [roles, setRoles] = useState(null);
  const [databases, setDatabases] = useState(null);

  useEffect(() => {
    fetchData({ setUsers, setRoles, setDatabases });
  }, []);

  useEffect(() => {
    getCachedUser(setUser, users);
  }, [users]);

  useEffect(() => {
    if (user === undefined) return localStorage.removeItem('user');
    if (user) return localStorage.setItem('user', user.id);
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page {...{ user, setUser, users, roles }} />} >
          <Route index element={<Home />} />
          <Route path="dev" element={<Development {...{ user, databases }} />} />
          <Route path="example" element={<Example {...{ user, databases }} />} />
          <Route path="projects" element={
            <Projects
              database={databases?.find(database => database.title[0].text.content === 'Projects')}
              order={['Projectname', 'Status', 'Hours', 'Worked hours', 'Hours left', 'Timespan']}
            />} />
          <Route path="management" element={<Management {...{ user, users, roles }} />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️