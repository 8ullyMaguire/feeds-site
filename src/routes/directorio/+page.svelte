<script lang="ts">
  import { group, KIND_LABELS, ORDER_LABELS } from '$lib/directory_view.js';
  import type { DirectoryItem } from '$lib/directory';

  let { data } = $props();
  const items = $derived<DirectoryItem[]>(data?.items ?? []);
  const groups = $derived(group(items));
  const orders = ['popular', 'new', 'trending'] as const;
  const kinds = ['all', 'feed', 'list', 'block', 'starter'] as const;
  const labels: Record<string, string> = KIND_LABELS;
</script>

<svelte:head><title>Directorio — recursos de Bluesky</title>
  <meta name="description" content="Feeds, listas, bloqueos y packs de inicio de Bluesky: ordenados por popularidad, novedad y tendencia." />
</svelte:head>

<h1 class="text-2xl font-semibold tracking-tight">Directorio</h1>
<p class="mt-2 text-sm text-neutral-400">
  {data?.count ?? 0} recursos. Datos abiertos en
  <a class="text-[var(--color-accent)] hover:underline" href="/directory.json">/directory.json</a>.
</p>

<nav class="mt-5 flex flex-wrap gap-2 text-sm" aria-label="Orden">
  {#each orders as o}
    <a class="rounded-full border border-neutral-700 px-3 py-1.5"
       class:border-[var(--color-accent)]={data?.order === o}
       href="/directorio?order={o}&kind={data?.kind ?? 'all'}">{ORDER_LABELS[o]}</a>
  {/each}
</nav>
<nav class="mt-2 flex flex-wrap gap-2 text-xs text-neutral-400" aria-label="Tipo">
  {#each kinds as k}
    <a class="rounded-full border border-neutral-800 px-3 py-1.5 hover:text-neutral-100"
       href="/directorio?order={data?.order ?? 'popular'}&kind={k}">
      {k === 'all' ? 'Todos' : labels[k]}
    </a>
  {/each}
</nav>

{#if data?.engineDown}
  <p class="mt-6 text-sm text-neutral-400">El motor no está disponible ahora mismo.</p>
{/if}

{#each Object.entries(groups) as [kind, list]}
  {#if list.length}
    <section class="mt-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {labels[kind]} · {list.length}
      </h2>
      <div class="mt-3 divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
        {#each list as item (item.uri)}
          <article class="flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
            <a class="font-medium text-neutral-100 hover:underline" href={item.url || item.uri}
               rel="noopener noreferrer">{item.name}</a>
            <span class="font-mono text-xs text-neutral-500">@{item.creator_handle}</span>
            <span class="text-xs text-neutral-500">{item.popularity}</span>
            <a class="ml-auto text-xs text-[var(--color-accent)] hover:underline" href={item.url}>Abrir →</a>
            {#if item.description}<p class="w-full text-sm text-neutral-400">{item.description}</p>{/if}
          </article>
        {/each}
      </div>
    </section>
  {/if}
{/each}
