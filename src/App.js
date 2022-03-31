import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataContainer } from "./DataContainer";
import { Page } from './components/Page';
import { Home } from './components/pages/home/Home';
import { Logs } from "./components/pages/logs/Logs";
import { Example } from "./components/pages/example/Example";
import { Projects } from "./components/pages/projects/Projects";
import { Employees } from "./components/pages/employees/Employees";
import { Management } from "./components/pages/management/Management";
import { Error } from "./components/pages/error/Error";

export default function App() {
  return (
    <DataContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Home />} />
            <Route path="logs" element={<Logs />} />
            <Route path="example" element={<Example />} />
            <Route path="projects" element={<Projects />} />
            <Route path="employees" element={<Employees />} />
            <Route path="management" element={<Management />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </DataContainer>
  );
}

// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️