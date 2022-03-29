import { Header } from './header/Header';
import { Outlet as Content } from 'react-router-dom';
import { Login } from './pages/login/Login';

export function Page({ user, setUser, users, roles, isMobile }) {
  if (!user) return <Login {...{ setUser, users }} />;

  return (
    <>
      <Header {...{ user, setUser, roles, isMobile }} />

      <main>
        <Content />
      </main>
    </>
  );
};