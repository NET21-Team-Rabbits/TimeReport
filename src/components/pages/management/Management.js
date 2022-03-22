import { Navigate } from 'react-router-dom';

export function Management({ user, users, roles }) {
  function getChanges() {
    const newRoles = JSON.parse(JSON.stringify(roles));
    Object.values(newRoles).forEach((role, i) => newRoles[Object.keys(newRoles)[i]].users = []);
    const changes = { add: {}, remove: {} };
    Object.keys(roles).forEach(role => {
      changes.add[role] = [];
      changes.remove[role] = [];
    });

    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checked => {
      const [user, role] = checked.name.split(':');
      newRoles[role].users.push(user);
    });

    Object.keys(newRoles).forEach(role => {
      if (JSON.stringify(roles[role].users) === JSON.stringify(newRoles[role].users)) return;

      newRoles[role].users.forEach(user => {
        if (roles[role].users.includes(user)) return;

        if (changes.add[role].includes(user)) return;

        changes.add[role].push(user);
      });

      roles[role].users.forEach(user => {
        if (newRoles[role].users.includes(user)) return;

        if (changes.remove[role].includes(user)) return;

        changes.remove[role].push(user);
      });
    });

    console.log(changes);
  }

  if (!roles) return <h1>Loading...</h1>;

  if (!roles?.administrators?.users?.includes(user.id)) return <Navigate to="/" />;

  return (
    <form id='roles'>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            {
              Object.keys(roles).map(role =>
                <th key={role}>{roles[role].title}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                {
                  Object.keys(roles).map(role =>
                    <td key={`${user.id}-${role}`}>
                      <input type="checkbox" name={`${user.id}:${role}`} defaultChecked={roles[role].users.includes(user.id)} />
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <span onClick={() => { getChanges(); }} >Save Changes</span>
    </form>
  );
}

//  ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️