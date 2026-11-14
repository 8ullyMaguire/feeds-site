import { fail } from '@sveltejs/kit';
import { suggestionBox } from '$lib/engine';

export async function load() {
  return { box: await suggestionBox() };
}

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const handle = String(form.get('handle') ?? '').trim();
    const reason = String(form.get('reason') ?? '').trim();
    const lang = String(form.get('lang') ?? 'es');
    if (!handle || reason.length < 20) {
      return fail(400, { handle, reason, error: 'Hace falta la cuenta y una frase explicando por qué encaja.' });
    }
    try {
      const res = await fetch(`${process.env.ENGINE_URL ?? 'http://127.0.0.1:8004'}/suggest`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ handle, reason, lang }),
        signal: AbortSignal.timeout(8000)
      });
      const body = await res.json();
      if (!res.ok) {
        const map: Record<string, string> = {
          BadHandle: 'Esa cuenta no parece un handle de Bluesky (nombre.bsky.social).',
          ReasonTooShort: 'Cuéntanos en una frase por qué encaja.',
          RateLimited: 'Ya has enviado varias sugerencias hoy. Prueba mañana.'
        };
        return fail(res.status, { handle, reason, error: map[body.error] ?? 'No se pudo enviar.' });
      }
      return { sent: true, handle };
    } catch {
      return fail(503, { handle, reason, error: 'El servicio no respondió. Inténtalo en un rato.' });
    }
  }
};
