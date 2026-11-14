import { spawn } from 'node:child_process';
import { getFeed } from '$lib/engine';

/**
 * Share cards, one per feed, rendered by the Rust binary.
 *
 * A link to a feed used to unfurl as a grey rectangle. The card carries the feed's
 * name and its current top post, which is the only thing that makes someone click.
 * Cached for fifteen minutes: the board changes on a ten-minute cycle, and a crawler
 * should not be able to make us rasterise anything.
 */
const BIN = process.env.OG_BIN ?? '/mnt/disk-important/personal/documents/code/rust/feed-og/target/release/feed-og';
const HOST = process.env.SITE_HOST ?? 'leftist.polarisocial.xyz';
const TTL = 15 * 60 * 1000;
const cache = new Map<string, { at: number; png: Buffer }>();

function render(json: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const child = spawn(BIN, [], { stdio: ['pipe', 'pipe', 'pipe'] });
    const chunks: Buffer[] = [];
    let err = '';
    child.stdout.on('data', (c) => chunks.push(c as Buffer));
    child.stderr.on('data', (c) => (err += String(c)));
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(`feed-og exited ${code}: ${err}`))
    );
    child.stdin.end(json);
  });
}

export async function GET({ params, setHeaders }) {
  const rkey = params.rkey.replace(/\.png$/, '');
  const hit = cache.get(rkey);
  if (hit && Date.now() - hit.at < TTL) {
    setHeaders({ 'content-type': 'image/png', 'cache-control': 'public, max-age=900' });
    return new Response(hit.png);
  }
  try {
    const feed = await getFeed(rkey);
    const png = await render(
      JSON.stringify({
        name: feed.name,
        description: feed.description,
        host: HOST,
        post: feed.top?.[0] ?? null
      })
    );
    cache.set(rkey, { at: Date.now(), png });
    setHeaders({ 'content-type': 'image/png', 'cache-control': 'public, max-age=900' });
    return new Response(png);
  } catch {
    return new Response('no card', { status: 404 });
  }
}
