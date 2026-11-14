import { getFeeds } from '$lib/engine';

export async function load() {
  try {
    const feeds = await getFeeds(3);
    return { feeds: feeds.feeds, count: feeds.count };
  } catch {
    return { feeds: [], count: 0 };
  }
}
