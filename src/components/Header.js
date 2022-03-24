import { NavLink, Link } from 'react-router-dom';

export function Header({ user, setUser, roles }) {
  return (
    <header id='primary-header'>
      <div>
        <img src={user && user.avatar_url ? user.avatar_url : 'profile-picture.png'} alt="Profile" />
        <h1>{user && user.name ? user.name : null}</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/example" className={({ isActive }) => isActive ? 'active' : ''}>Example</NavLink>
          </li>
          <li>
            <NavLink to="/dev" className={({ isActive }) => isActive ? 'active' : ''}>Development</NavLink>
          </li>
          {
            roles?.administrators?.users?.includes(user?.id) ? (
              <li>
                <NavLink to="/management" className={({ isActive }) => isActive ? 'active' : ''}>Management</NavLink>
              </li>
            ) : null
          }
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          </li>
          {
            roles?.boss?.users?.includes(user?.id) ? (
              <li>
                <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink>
              </li>
            ) : null
          }
        </ul>
      </nav>
      <button onClick={() => setUser(undefined)}><Link to="/" children="Log out" /></button>
    </header>
  );
};