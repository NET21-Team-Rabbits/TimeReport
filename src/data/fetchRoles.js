export async function fetchRoles() {
  const output = {};

  const roles = await (
    fetch('/roles')
      .then(response => response.json())
      .catch(error => console.log(error))
  );

  for (let i = 0; i < roles.length; i++) {
    const title = Object.values(roles)[i].toggle.rich_text[0].text.content;
    const property = title.toLowerCase().replace(/ ./, title.charAt(title.indexOf(' ') + 1).toUpperCase());

    output[property] = { title: title };
    output[property].users = await (
      fetch(`/role/${roles[i].id}`)
        .then(response => response.json())
        .then(response => response.map(user => user.paragraph.rich_text[0].mention.user.id))
        .catch(error => console.log(error))
    );
  }

  return output;
}