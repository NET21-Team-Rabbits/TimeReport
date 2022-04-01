import './header.scss';
import { Data } from '../../DataContainer';
import { useContext, useEffect, useState } from 'react';
import { Nav } from './Nav';
import { Link } from 'react-router-dom';
import { getIsRole } from '../../data/getIsRole';

export function Header() {
  const { user, setUser, roles, isMobile } = useContext(Data);
  const [nav, setNav] = useState(!isMobile);
  const [tab, setTab] = useState(false);
  const mobileNavTabOrder = () => {
    if (nav && tab) {
      setTab(false);
      document.querySelector('[tabindex="1"]').focus();
    }
  };

  useEffect(() => {
    setNav(!isMobile);
  }, [isMobile]);

  return (
    <header className='primary-header'>
      <div className="profile-wrapper">
        <img src={user && user.avatar_url ? user.avatar_url : 'profile-picture.png'} alt="Profile" />
        <h1 className={isMobile ? nav ? "hidden" : "" : ""}>{user && user.name ? user.name : null}</h1>
      </div>
      {
        nav ? (
          <>
            <Nav {...{ setNav }} />
            <div className='buttons'>
              <Link tabIndex={-1} to="/management" style={!getIsRole(roles, 'admin', user.id) ? { display: 'none' } : { display: 'flex' }}>
                <button tabIndex={3} >♣</button>
              </Link>
              <Link tabIndex={-1} to="/">
                <button tabIndex={3} onClick={() => { localStorage.removeItem('user'); setUser(null); }} >↩</button>
              </Link>
            </div>
          </>
        ) : null
      }
      <button
        tabIndex={isMobile ? 1 : -1}
        className={`primary-navigation-toggle${nav ? " close-button" : ""}${!isMobile ? " hidden" : ""}`}
        onClick={() => { setNav(!nav); setTab(true); }}
        onBlur={mobileNavTabOrder}
        children={<span />}
      />
    </header>
  );
};