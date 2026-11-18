/**
 * @typedef {import('./directory').DirectoryItem} DirectoryItem
 */

export const KIND_LABELS = {
  feed: 'Feeds', list: 'Listas', block: 'Bloqueos', starter: 'Packs de inicio'
};
export const ORDER_LABELS = {
  popular: 'Popular', new: 'Nuevo', trending: 'En tendencia'
};

/** @param {DirectoryItem[]} items */
export function group(items) {
  /** @type {Record<string, DirectoryItem[]>} */
  const out = { feed: [], list: [], block: [], starter: [] };
  for (const item of items) if (out[item.kind]) out[item.kind].push(item);
  return out;
}
