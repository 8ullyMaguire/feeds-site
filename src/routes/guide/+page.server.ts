import { redirect } from '@sveltejs/kit';

/** `/guide` is the English mirror; `/guia` is the Spanish original. */
export function load() {
  throw redirect(301, '/en');
}
