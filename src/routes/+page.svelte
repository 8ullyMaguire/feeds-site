<script lang="ts">
  import type { FeedMeta, Post } from '$lib/engine';
  import { compact, window as win } from '$lib/format';

  let { data } = $props();
  const site = $derived(data?.site);
  const feeds = $derived<FeedMeta[]>(data?.feeds ?? []);
  const page = $derived(site?.page);
  const fy = $derived(feeds.find((f) => f.personalized));
</script>

<svelte:head>
  <title>{page?.title ?? 'Feeds'} — feeds de Bluesky</title>
  <meta name="description" content={page?.tagline ?? 'Feeds curados de la lista Leftist'} />
  <meta property="og:title" content={page?.title ?? 'Feeds'} />
  <meta property="og:description" content={page?.tagline ?? ''} />
  <meta property="og:image" content="https://leftist.polarisocial.xyz/og/leftist-24h.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="max-w-3xl">
  <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{page?.title}</h1>
  <p class="prose-lede mt-3 text-neutral-300">{page?.tagline}</p>
  <div class="mt-6 flex flex-wrap gap-3">
    {#if fy}
      <a class="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white"
         href={fy.url}>Abrir {fy.name}</a>
    {/if}
    <a class="rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-200"
       href="/quiz">Di qué te gusta</a>
    <a class="rounded-full border border-neutral-800 px-5 py-2.5 text-sm text-neutral-400"
       href="/feeds.json">Datos abiertos</a>
  </div>
</section>

{#if page?.how?.length}
  <section class="mt-12">
    <h2 class="text-sm font-semibold uppercase tracking-widest text-neutral-500">{page.how_title ?? 'Cómo funciona'}</h2>
    <ol class="mt-4 grid gap-3 sm:grid-cols-2">
      {#each page.how as step, i}
        <li class="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300">
          <span class="mr-2 font-mono text-xs text-neutral-500">{String(i + 1).padStart(2, '0')}</span>{step}
        </li>
      {/each}
    </ol>
  </section>
{/if}

<section class="mt-12">
  <div class="flex items-baseline justify-between">
    <h2 class="text-sm font-semibold uppercase tracking-widest text-neutral-500">{page?.feeds_title ?? 'Los feeds'}</h2>
    <a class="text-xs text-neutral-500 hover:text-neutral-300" href="/feeds">Todos</a>
  </div>
  <div class="mt-4 grid gap-4 sm:grid-cols-2">
    {#each feeds as f (f.rkey)}
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-medium text-neutral-100"><a class="hover:underline" href="/feed/{f.rkey}">{f.name}</a></h3>
          <span class="shrink-0 rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] uppercase tracking-wide text-neutral-400">
            {f.language} · {win(f, 'es')}
          </span>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-neutral-400">{f.description.split('Todos los feeds')[0]}</p>
        {#if f.top?.length}
          <ul class="mt-3 space-y-1.5 text-xs text-neutral-500">
            {#each f.top as p (p.uri)}
              <li class="truncate">
                <span class="font-mono text-neutral-600">{compact(p.likes)}♥</span>
                <a class="hover:text-neutral-300" href={p.url}>{p.text}</a>
              </li>
            {/each}
          </ul>
        {/if}
        <a class="mt-4 inline-block text-sm text-[var(--color-accent)] hover:underline" href={f.url}>Abrir en Bluesky →</a>
      </article>
    {/each}
  </div>
</section>

{#if page?.community_feeds?.length}
  <section class="mt-12">
    <h2 class="text-sm font-semibold uppercase tracking-widest text-neutral-500">{page.community_title ?? 'Otros feeds'}</h2>
    <p class="mt-2 max-w-2xl text-sm text-neutral-500">{page.community_note ?? ''}</p>
    <ul class="mt-4 divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
      {#each page.community_feeds as f (f.handle + f.rkey)}
        <li class="p-4">
          <div class="flex flex-wrap items-baseline gap-x-3">
            <a class="font-medium text-neutral-100 hover:underline"
               href="https://bsky.app/profile/{f.handle}/feed/{f.rkey}">{f.name}</a>
            <span class="font-mono text-xs text-neutral-500">@{f.handle}</span>
            <span class="text-[11px] uppercase tracking-wide text-neutral-600">{f.lang}</span>
          </div>
          <p class="mt-1 text-sm text-neutral-400">{f.why}</p>
        </li>
      {/each}
    </ul>
  </section>
{/if}

{#if page?.faq?.length}
  <section class="mt-12">
    <h2 class="text-sm font-semibold uppercase tracking-widest text-neutral-500">{page.faq_title ?? 'Preguntas'}</h2>
    <div class="mt-4 space-y-2">
      {#each page.faq as item}
        <details class="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
          <summary class="cursor-pointer text-sm font-medium text-neutral-200">{item.q}</summary>
          <p class="mt-2 text-sm leading-relaxed text-neutral-400">{item.a}</p>
        </details>
      {/each}
    </div>
  </section>
{/if}
