import { getRising } from '$lib/engine';

export async function load() {
  try {
    return { rising: await getRising() };
  } catch {
    return { rising: null };
  }
}
