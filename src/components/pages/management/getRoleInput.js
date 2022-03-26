export function getRoleInput(roles, users) {
  if (!roles || !users) return;

  const newRoles = JSON.parse(JSON.stringify(roles));
  Object.values(newRoles)?.forEach((role, i) => newRoles[Object.keys(newRoles)[i]].users = []);
  const changes = { add: {}, remove: {} };

  document.querySelectorAll('input[type="checkbox"]:checked')?.forEach(checked => {
    const [_user, role] = checked?.name?.split(':');
    newRoles[role]?.users?.push(_user);
  });

  Object.keys(newRoles)?.forEach(role => {
    newRoles[role]?.users?.forEach(_user => {
      if (roles[role]?.users?.some(__user => __user.id === _user)) return;

      if (!Object.keys(changes?.add)?.includes(role)) changes.add[role] = { id: roles[role].id, users: [] };

      if (changes?.add[role].users?.some(__user => __user.id === _user)) return;

      changes?.add[role].users?.push({ id: _user, _name: users.find(__user => __user.id === _user).name });
    });

    roles[role].users.forEach(_user => {
      if (newRoles[role]?.users?.some(__user => __user === _user.id)) return;

      if (!Object.keys(changes?.remove)?.includes(role)) changes.remove[role] = { id: roles[role].id, users: [] };

      if (changes?.remove[role].users?.some(__user => __user.id === _user.id)) return;

      changes?.remove[role].users?.push({ ..._user, _name: users.find(__users => __users.id === _user.id).name });
    });
  });

  return changes;
}