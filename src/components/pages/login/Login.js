import { Data } from '../../../DataContainer';
import { useContext } from 'react';
import { UserInput } from "./UserInput";

export function Login() {
  const { users } = useContext(Data);

  return (
    <main>
      {
        users ? (
          <UserInput />
        ) : (
          <h1 className="title">Loading...</h1>
        )
      }
    </main>
  );
};