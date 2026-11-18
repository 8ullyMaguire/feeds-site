import { getDirectory, type Order } from '$lib/directory';

export async function load({ url }) {
  const order = (url.searchParams.get('order') ?? 'popular') as Order;
  const kind = url.searchParams.get('kind') ?? 'all';
  try {
    const data = await getDirectory(order, kind);
    return { items: data.items, order: data.order, count: data.count, kind };
  } catch {
    return { items: [], order, kind, count: 0, engineDown: true };
  }
}
