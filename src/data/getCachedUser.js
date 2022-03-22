export function getCachedUser(setUser, users) {
  if (!users) return;

  let user = null;

  if (localStorage.getItem('user')) user = users.find(user => user.id === localStorage.getItem('user'));

  if (user === undefined) return localStorage.removeItem('user');

  setUser(user);
}