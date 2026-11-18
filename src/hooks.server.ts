import { langFor } from '$lib/lang.js';

/** app.html ships lang="es" because most of the site is Spanish. Override per route. */
export const handle = async ({ event, resolve }) => {
  const lang = langFor(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('<html lang="es">', `<html lang="${lang}">`)
  });
};
