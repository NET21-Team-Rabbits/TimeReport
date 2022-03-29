export function getIsRole(roles, role, userID) {
  if (!roles || !role || !userID) return null;

  if (/admin/.test(role)) role = 'administrators';
  if (/boss/.test(role)) role = 'boss';
  if (/productowner/.test(role)) role = 'productOwners';

  return roles[role]?.users?.some(user => user.id === userID);
}