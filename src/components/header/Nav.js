import { Data } from "../../DataContainer";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { getIsRole } from "../../data/getIsRole";

export function Nav({ setNav }) {
  const { user, roles, isMobile } = useContext(Data);

  return (
    <>
      <button tabIndex={-1} className={`primary-navigation-close-background${!isMobile ? " hidden" : ""}`} onClick={() => setNav(null)} />
      <nav className="primary-navigation">
        <ul onClick={isMobile ? () => setNav(null) : null}>
          <li>
            <NavLink to="/" tabIndex={2} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/logs" tabIndex={2} className={({ isActive }) => isActive ? 'active' : ''}>Logs</NavLink>
          </li>
          <li>
            <NavLink to="/example" tabIndex={2} className={({ isActive }) => isActive ? 'active' : ''}>Example</NavLink>
          </li>
          <li>
            <NavLink to="/projects" tabIndex={2} className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          </li>
          {
            getIsRole(roles, 'boss', user.id) ? (
              <li>
                <NavLink to="/employees" tabIndex={2} className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink>
              </li>
            ) : null
          }
        </ul>
      </nav>
    </>
  );
}