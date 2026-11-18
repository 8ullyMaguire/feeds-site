import { BASE } from './engine';

export type Order = 'popular' | 'new' | 'trending';
export type DirectoryItem = {
  kind: 'feed' | 'list' | 'block' | 'starter';
  uri: string; name: string; description: string;
  creator_handle: string; url: string; popularity: number;
  created_at: number; labels: string[];
};

export async function getDirectory(order: Order, kind: string) {
  const q = new URLSearchParams({ order, kind });
  const res = await fetch(`${BASE}/directory.json?${q}`, {
    signal: AbortSignal.timeout(6000)
  });
  if (!res.ok) throw new Error(`/directory.json -> ${res.status}`);
  return await res.json() as {
    generated_at: string; order: Order; count: number; items: DirectoryItem[];
  };
}
