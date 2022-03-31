import { post } from "../../../data/post";
import { fetchRoles } from "../../../data/fetchRoles";

export function saveRoleChanges({ add, remove }, setRoles) {
  if (!add || !remove) return;

  const validator = [];

  Object.keys(add).forEach(role => {
    validator.push(
      fetch(`/add-children`, post({
        parentID: add[role].id,
        children: add[role].users
      }))
    );
  });

  Object.keys(remove).forEach(role => {
    validator.push(
      fetch(`/remove-children`, post({
        children: remove[role].users
      }))
    );
  });

  Promise.all(validator).then(() =>
    fetchRoles().then(response => {
      setRoles(response);
    })
  );
}