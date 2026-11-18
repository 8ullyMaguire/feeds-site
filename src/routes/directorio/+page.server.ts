import { redirect } from '@sveltejs/kit';

/** The Spanish directory moved to /es/directorio. Keep old links working. */
export function load({ url }) {
  redirect(308, '/es/directorio' + url.search);
}
