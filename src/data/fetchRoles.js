export async function fetchRoles() {
  const rolesParentID = 'cf2972c2-176f-4c46-9f69-43dbffd81356';
  const output = {};

  const roles = await (
    fetch(`/get-block/${rolesParentID}`)
      .then(response => response.json())
      .catch(error => console.log(error))
  );

  for (let i = 0; i < roles.length; i++) {
    const title = Object.values(roles)[i].toggle.rich_text[0].text.content;
    const property = title.toLowerCase().replace(/ ./, title.charAt(title.indexOf(' ') + 1).toUpperCase());

    output[property] = { title: title, id: roles[i].id };
    output[property].users = await (
      fetch(`/get-block/${roles[i].id}`)
        .then(response => response.json())
        .then(response => response.map(user => user.paragraph.rich_text[0].mention.user.id))
        .catch(error => console.log(error))
    );
  }

  return output;
}