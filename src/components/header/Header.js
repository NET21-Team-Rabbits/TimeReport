import '../../styles/header.scss';
import { useEffect, useState } from 'react';
import { Nav } from './Nav';
import { Link } from 'react-router-dom';
import { getIsRole } from '../../data/getIsRole';

export function Header({ user, setUser, roles, isMobile }) {
  const [nav, setNav] = useState(!isMobile);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setNav(!isMobile);
    });

    setNav(!isMobile);
  }, [isMobile]);

  return (
    <header className='primary-header'>
      <img src={user && user.avatar_url ? user.avatar_url : 'profile-picture.png'} alt="Profile" />
      <h1 className={isMobile ? nav ? "hidden" : "" : ""}>{user && user.name ? user.name : null}</h1>
      {
        nav ? (
          <>
            <div>
              <Link to="/management" style={!getIsRole(roles, 'admin', user.id) ? { display: 'none' } : { display: 'flex' }}>
                <button>♣</button>
              </Link>
              <Link to="/">
                <button onClick={() => { localStorage.removeItem('user'); setUser(null); }} >↩</button>
              </Link>
            </div>
            <Nav {...{ user, setUser, roles, isMobile }} />
          </>
        ) : null
      }
      <button className={`primary-navigation-toggle${nav ? " close-button" : ""}${!isMobile ? " hidden" : ""}`} onClick={() => setNav(!nav)} children={<span />} />
    </header>
  );
};