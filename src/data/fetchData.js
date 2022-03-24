import { fetchRoles } from "./fetchRoles";

export function fetchData({ setUsers, setRoles, setDatabases }) {
  fetchRoles()
    .then(response => setRoles(response))
    .catch(error => console.log(error));

  fetch('/get-users')
    .then(users => users.json())
    .then(users => setUsers(users))
    .catch(error => console.log(error));

  const databasesContainerID = 'dfe065d4-d803-4ebe-bbe6-bbd723156fc9';

  fetch('/get-databases')
    .then(databases => databases.json())
    .then(databases => {
      const output = {};
      const validator = [];

      databases.filter(database => database.parent.page_id === databasesContainerID).forEach(database => {
        validator.push(fetch(`/get-database/${database.id}`)
          .then(response => response.json())
          .then(data => {
            database.content = data;
            database.title = database.title[0].text.content;
            output[database.title.toLowerCase()] = database;
          }));
      });

      Promise.all(validator).then(response => setDatabases(output));
    })
    .catch(error => console.log(error));
}