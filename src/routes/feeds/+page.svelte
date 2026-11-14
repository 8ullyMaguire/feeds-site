<script lang="ts">
  import type { FeedMeta } from '$lib/engine';
  import { compact, window as win } from '$lib/format';

  let { data } = $props();
  const feeds = $derived<FeedMeta[]>(data?.feeds ?? []);
  const groups = $derived.by(() => {
    const by: Record<string, FeedMeta[]> = {};
    for (const f of feeds) (by[f.language] ??= []).push(f);
    return by;
  });
</script>

<svelte:head><title>Feeds — catálogo</title></svelte:head>

<h1 class="text-2xl font-semibold tracking-tight">Catálogo</h1>
<p class="mt-2 text-sm text-neutral-400">
  {data?.count} feeds. Cada uno responde a una pregunta distinta; la ventana y el listón están a la vista.
  Datos en <a class="text-[var(--color-accent)] hover:underline" href="/feeds.json">/feeds.json</a>.
</p>

{#each Object.entries(groups) as [lang, list]}
  <section class="mt-8">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">{lang === 'es' ? 'En español' : lang}</h2>
    <div class="mt-3 divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
      {#each list as f (f.rkey)}
        <article class="flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
          <a class="font-medium text-neutral-100 hover:underline" href="/feed/{f.rkey}">{f.name}</a>
          <span class="font-mono text-xs text-neutral-500">{f.rkey}</span>
          <span class="text-xs text-neutral-500">{win(f, 'es')} · ≥{f.min_likes} ♥ · {f.board_size ?? 0} posts</span>
          <a class="ml-auto text-xs text-[var(--color-accent)] hover:underline" href={f.url}>Abrir →</a>
          <p class="w-full text-sm text-neutral-400">{f.description.split('Todos los feeds')[0]}</p>
        </article>
      {/each}
    </div>
  </section>
{/each}
