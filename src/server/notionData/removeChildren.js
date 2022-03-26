export function removeChildren(client, { children }) {
  if (!client || !children) return;

  children.forEach(async child => {
    await client.blocks.delete({
      block_id: child.block_id
    });
  });
}