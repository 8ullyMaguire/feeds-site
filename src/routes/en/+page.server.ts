import { getSite, getFeeds } from '$lib/engine';

export async function load() {
  try {
    const [site, feeds] = await Promise.all([getSite(), getFeeds(0)]);
    return { page: site.page, guides: site.page, feeds: feeds.feeds };
  } catch {
    return { page: null, guides: null, feeds: [] };
  }
}
