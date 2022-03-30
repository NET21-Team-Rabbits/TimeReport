import { NavLink } from "react-router-dom";
import { getIsRole } from "../../data/getIsRole";

export function Nav({ user, roles, isMobile, setNav }) {
  return (
    <>
      <button className={`primary-navigation-close-background${!isMobile ? " hidden" : ""}`} onClick={() => setNav(null)} />
      <nav className="primary-navigation">
        <ul onClick={isMobile ? () => setNav(null) : null}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/log" className={({ isActive }) => isActive ? 'active' : ''}>Log</NavLink>
          </li>
          <li>
            <NavLink to="/example" className={({ isActive }) => isActive ? 'active' : ''}>Example</NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          </li>
          {
            getIsRole(roles, 'boss', user.id) ? (
              <li>
                <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink>
              </li>
            ) : null
          }
        </ul>
      </nav>
    </>
  );
}