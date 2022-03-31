export function addChildren(client, { parentID, children }) {
  if (!client || !parentID || !children) return null;

  client.blocks.children.append({
    block_id: parentID,
    children: children.map(child => {
      return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "mention",
              "mention": {
                "type": "user",
                "user": {
                  "id": child.id,
                }
              },
              "plain_text": `@${child._name}`
            }
          ]
        }
      };
    })
  });
}