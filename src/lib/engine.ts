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
  community_feeds?: { name: string; handle: string; rkey: string; why: string; lang: string }[];
  community_note?: string;
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

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'steps'; items: string[] }
  | { type: 'bullets'; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'table'; rows: string[][] };

export type GuideSection = { id: string; h: string; blocks: GuideBlock[] };
export type Guide = {
  title: string;
  lede: string;
  toc_title?: string;
  sections: GuideSection[];
  note?: string;
  back?: string;
};

export type RisingPost = {
  uri: string;
  author: string;
  text: string;
  likes: number;
  reposts: number;
  delta_likes: number;
  delta_reposts: number;
  board: string | null;
  url: string;
};
export type Rising = {
  generated_at: string;
  window_hours: number;
  min_span_hours: number;
  status?: string;
  count: number;
  posts: RisingPost[];
  authors: { handle: string; delta_likes: number; posts: number; url: string }[];
};

export const getGuide = () => getJson<{ page: { guide: Guide } }>('/site.json').then((d) => d.page.guide);
export const getRising = () => getJson<Rising>('/rising.json', 8000);

export type SuggestionBox = {
  count: number;
  accepted: { handle: string; why: string; lang: string }[];
  pending: number;
  bar: string[];
};

export const suggestionBox = () =>
  getJson<SuggestionBox>('/suggestions.json').catch(
    () => ({ count: 0, accepted: [], pending: 0, bar: [] }) as SuggestionBox
  );
