import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ out: 'build' }),
    // The engine owns /xrpc, /.well-known and the machine endpoints; nginx routes
    // those to port 8004 and everything else here.
    paths: { relative: false }
  }
};

export default config;
