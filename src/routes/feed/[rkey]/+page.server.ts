import { getFeed } from '$lib/engine';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const feed = await getFeed(params.rkey);
    return { feed };
  } catch {
    throw error(404, 'Feed desconocido');
  }
}
