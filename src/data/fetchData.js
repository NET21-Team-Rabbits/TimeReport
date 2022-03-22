import { fetchRoles } from "./fetchRoles";

export function fetchData({ setUsers, setRoles, setDatabases }) {
  fetchRoles()
    .then(response => setRoles(response))
    .catch(error => console.log(error));

  fetch('/users')
    .then(users => users.json())
    .then(users => setUsers(users))
    .catch(error => console.log(error));

  fetch('/databases')
    .then(databases => databases.json())
    .then(databases => setDatabases(databases.filter(database => database.parent.page_id === 'dfe065d4-d803-4ebe-bbe6-bbd723156fc9')))
    .catch(error => console.log(error));
}