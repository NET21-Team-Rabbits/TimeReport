import "../../../styles/table.scss";
import { Navigate } from 'react-router-dom';

export function Management({ user, users, roles }) {
  function getRoleChanges() {
    const newRoles = JSON.parse(JSON.stringify(roles));
    Object.values(newRoles)?.forEach((role, i) => newRoles[Object.keys(newRoles)[i]].users = []);
    const changes = { add: {}, remove: {} };

    document.querySelectorAll('input[type="checkbox"]:checked')?.forEach(checked => {
      const [user, role] = checked?.name?.split(':');
      newRoles[role]?.users?.push(user);
    });

    Object.keys(newRoles)?.forEach(role => {
      if (JSON.stringify(roles[role]?.users) === JSON.stringify(newRoles[role]?.users)) return;

      newRoles[role]?.users?.forEach(user => {
        if (roles[role]?.users?.includes(user)) return;

        if (!Object.keys(changes?.add)?.includes(role)) changes.add[role] = [];

        if (changes?.add[role]?.includes(user)) return;

        changes?.add[role]?.push(user);
      });

      roles[role].users.forEach(user => {
        if (newRoles[role]?.users?.includes(user)) return;

        if (!Object.keys(changes?.remove)?.includes(role)) changes.remove[role] = [];

        if (changes?.remove[role]?.includes(user)) return;

        changes?.remove[role]?.push(user);
      });
    });

    return changes;
  }

  function modifyRoles({ add, remove }) {
    const validator = [];

    Object.keys(add).forEach(roleKey => {
      validator.push(
        fetch(`/add`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            block_id: roles[roleKey]?.id,
            children:
              add[roleKey].map(userID => {
                const userName = users.find(user => user.id === userID)?.name;
                if (!userName) return null;

                return (
                  {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                      "rich_text": [
                        {
                          "type": "mention",
                          "mention": {
                            "type": "user",
                            "user": {
                              "id": userID,
                            }
                          },
                          "plain_text": `@${userName}`
                        }
                      ]
                    }
                  }
                );
              })
          })
        })
      );
    });

    Object.keys(remove).forEach(roleKey => {
      validator.push(
        fetch(`/role/${roles[roleKey]?.id}`)
          .then(userBlocks => userBlocks.json())
          .then(userBlocks => {
            userBlocks?.filter(userBlock => remove[roleKey].includes(userBlock?.paragraph?.rich_text[0]?.mention?.user?.id)).forEach(userBlock => {
              validator.push(fetch(`/remove`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  block_id: userBlock?.id
                })
              }));
            });
          })
      );
    });

    Promise.all(validator).then(response => window.location.reload());
  }

  if (!roles) return <h1>Loading...</h1>;

  if (!roles?.administrators?.users?.includes(user.id)) return <Navigate to="/" />;

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
                <td className="cell">{user?.name}</td>
                {
                  Object.keys(roles)?.map(role =>
                    <td key={`${user?.id}-${role}`}>
                      <label htmlFor={`${user?.id}:${role}`} className="checkbox-container"><input id={`${user?.id}:${role}`} type="checkbox" name={`${user?.id}:${role}`} defaultChecked={roles[role]?.users?.includes(user?.id)} /></label>
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <button className="submit-roles" onClick={() => modifyRoles(getRoleChanges())} children="Save Changes" />
    </>
  );

}
//  ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️