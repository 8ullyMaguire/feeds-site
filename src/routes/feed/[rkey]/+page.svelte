<script lang="ts">
  import { compact, window as win } from '$lib/format';
  let { data } = $props();
  const f = $derived(data.feed);
</script>

<svelte:head>
  <title>{f.name} — feed</title>
  <meta name="description" content={f.description} />
</svelte:head>

<a class="text-xs text-neutral-500 hover:text-neutral-300" href="/feeds">← Catálogo</a>
<h1 class="mt-3 text-2xl font-semibold tracking-tight">{f.name}</h1>
<p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">{f.description}</p>

<div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
  <span class="rounded-full border border-neutral-700 px-2 py-0.5 uppercase">{f.language}</span>
  <span>{win(f, 'es')}</span>
  <span>≥{f.min_likes} ♥</span>
  <span>{f.board_size} posts servidos</span>
  <a class="text-[var(--color-accent)] hover:underline" href={f.url}>Abrir en Bluesky →</a>
  <a class="hover:text-neutral-300" href="/feed/{f.rkey}.json">JSON</a>
</div>

{#if f.top?.length}
  <ol class="mt-8 space-y-3">
    {#each f.top as p, i (p.uri)}
      <li class="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <div class="flex items-baseline gap-3 text-xs text-neutral-500">
          <span class="font-mono">{String(i + 1).padStart(2, '0')}</span>
          <a class="hover:text-neutral-300" href="https://bsky.app/profile/{p.author}">@{p.author}</a>
          <span class="font-mono">{compact(p.likes)}♥ · {compact(p.reposts)}↺</span>
          <a class="ml-auto hover:text-neutral-300" href={p.url}>ver</a>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-neutral-200">{p.text}</p>
      </li>
    {/each}
  </ol>
{:else}
  <p class="mt-8 text-sm text-neutral-500">El feed no ha servido posts todavía.</p>
{/if}
