import { Data } from '../DataContainer';
import { useContext } from 'react';
import { Header } from './header/Header';
import { Outlet as Content } from 'react-router-dom';
import { Login } from './pages/login/Login';

export function Page() {
  const { user } = useContext(Data);

  if (!user) return <Login />;

  return (
    <>
      <Header />

      <main>
        <Content />
      </main>
    </>
  );
};