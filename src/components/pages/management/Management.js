import "../../database.scss";
import { Data } from "../../../DataContainer";
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { getRoleInput } from "./getRoleInput";
import { saveRoleChanges } from "./saveRoleChanges";

export function Management() {
  const { user, users, roles, setRoles, isMobile } = useContext(Data);

  if (!roles) return <h1>Loading...</h1>;

  if (!roles?.administrators?.users?.some(_user => _user?.id === user?.id)) return <Navigate to="/" />;

  if (isMobile) return (
    <>
      <h1 className="title">Manage Roles</h1>
      <section className="database-mobile center">
        {
          users.map(_user =>
            <div className="database-mobile-row" key={_user.id}>
              <h2 className="database-mobile-row-title">{_user.name}</h2>
              <div className="database-mobile-row-content">
                {
                  Object.keys(roles).map((role, index) =>
                    <div className="database-mobile-cell" key={`${_user.name} ${Object.values(roles).at(index).title}`.replace(' ', '-').toLowerCase()}>
                      <input
                        id={`${_user?.id}:${role}`}
                        type="checkbox"
                        name={`${_user?.id}:${role}`}
                        defaultChecked={roles[Object.keys(roles).at(index)]?.users?.some(__user => __user?.id === _user.id)}
                      />
                      <label htmlFor={`${_user?.id}:${role}`} className="checkbox-label">
                        {Object.values(roles).at(index).title}
                      </label>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
        <button className="submit-button" onClick={() => saveRoleChanges(getRoleInput(roles, users), setRoles)} children="Save Changes" />
      </section>
    </>
  );

  return (
    <>
      <h1 className="title">Manage Roles</h1>
      <table className="database center">
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
      <button className="submit-button" onClick={() => saveRoleChanges(getRoleInput(roles, users), setRoles)} children="Save Changes" />
    </>
  );

}
//  ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️