import { getGuide } from '$lib/engine';

export async function load() {
  try {
    return { guide: await getGuide() };
  } catch {
    return { guide: null };
  }
}
