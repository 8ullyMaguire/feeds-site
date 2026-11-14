/**
 * The engine (Python) owns the data: feed definitions, board sizes, top posts and
 * the page copy. This app renders it. One source of truth, two faces.
 */
const BASE = process.env.ENGINE_URL ?? 'http://127.0.0.1:8004';

export type FeedMeta = {
  rkey: string;
  name: string;
  description: string;
  url: string;
  feed_uri: string;
  language: string;
  window_hours: number | null;
  min_likes: number;
  ranking: string;
  personalized: boolean;
  board_size?: number;
  top?: Post[];
};

export type Post = {
  uri: string;
  author: string;
  likes: number;
  reposts: number;
  text: string;
  url: string;
  score: number;
};

export type SitePage = {
  lang?: string;
  title: string;
  tagline?: string;
  how_title?: string;
  how?: string[];
  feeds_title?: string;
  faq_title?: string;
  faq?: { q: string; a: string }[];
  community_title?: string;
  community_feeds?: { name: string; url: string; description?: string }[];
  labels: Record<string, string>;
  repo?: string;
  github?: string;
};

export type Site = {
  service: string;
  did: string;
  owner: { handle: string; did: string };
  page: SitePage;
};

async function getJson<T>(path: string, timeoutMs = 4000): Promise<T> {
  const res = await fetch(BASE + path, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return (await res.json()) as T;
}

export const getSite = () => getJson<Site>('/site.json');
export const getFeeds = (top = 3) =>
  getJson<{ service: string; did: string; count: number; feeds: FeedMeta[] }>(
    `/feeds.json?top=${top}`
  );
export const getFeed = (rkey: string) => getJson<FeedMeta>(`/feed/${rkey}.json`);
