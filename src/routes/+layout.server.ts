import { getSite } from '$lib/engine';

export async function load() {
  try {
    const site = await getSite();
    return { site };
  } catch (err) {
    return {
      site: null,
      engineDown: err instanceof Error ? err.message : 'engine unavailable'
    };
  }
}
