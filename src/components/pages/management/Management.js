import "../../../styles/table.scss";
import { Navigate } from 'react-router-dom';
import { getRoleInput } from "./getRoleInput";
import { saveRoleChanges } from "./saveRoleChanges";

export function Management({ user, users, roles, setRoles }) {
  if (!roles) return <h1>Loading...</h1>;

  if (!roles?.administrators?.users?.some(_user => _user?.id === user?.id)) return <Navigate to="/" />;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Person</th>
            {
              Object.keys(roles)?.map(role =>
                <th key={role}>{roles[role]?.title}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            users?.map(user => (
              <tr key={user?.id}>
                <td>{user?.name}</td>
                {
                  Object.keys(roles)?.map(role =>
                    <td key={`${user?.id}-${role}`}>
                      <label htmlFor={`${user?.id}:${role}`} className="checkbox-container">
                        <input
                          id={`${user?.id}:${role}`}
                          type="checkbox"
                          name={`${user?.id}:${role}`}
                          defaultChecked={roles[role]?.users?.some(_user => _user?.id === user.id)}
                        />
                      </label>
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <button className="submit-roles" onClick={() => saveRoleChanges(getRoleInput(roles, users), setRoles)} children="Save Changes" />
    </>
  );

}
//  ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️