import { redirect } from '@sveltejs/kit';

/** The English directory is now the default at /directory. */
export function load({ url }) {
  redirect(308, '/directory' + url.search);
}
