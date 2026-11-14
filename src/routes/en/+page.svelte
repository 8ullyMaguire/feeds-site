<script lang="ts">
  import type { GuideBlock } from '$lib/engine';
  let { data } = $props();
  const page = $derived(data?.page as any);
  const guide = $derived(page?.guide_en as any);
</script>

<svelte:head>
  <title>{guide?.title ?? 'Feeds — English'}</title>
  <meta name="description" content={guide?.lede ?? 'Curated Bluesky feeds built from one hand-maintained list of accounts.'} />
</svelte:head>

{#if guide}
  <article class="mx-auto max-w-3xl">
    <h1 class="text-3xl font-semibold tracking-tight">{guide.title}</h1>
    <p class="prose-lede mt-3 text-neutral-300">{guide.lede}</p>
    <nav class="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">{guide.toc_title ?? 'Contents'}</p>
      <ol class="mt-3 space-y-1 text-sm text-neutral-400">
        {#each guide.sections as s, i (s.id)}
          <li><a class="hover:text-neutral-100" href="#{s.id}"><span class="mr-2 font-mono text-xs text-neutral-600">{String(i + 1).padStart(2, '0')}</span>{s.h}</a></li>
        {/each}
      </ol>
    </nav>
    {#each guide.sections as s (s.id)}
      <section id={s.id} class="mt-12 scroll-mt-8">
        <h2 class="text-xl font-semibold tracking-tight text-neutral-100">{s.h}</h2>
        {#each s.blocks as b: GuideBlock}
          {#if b.type === 'p'}
            <p class="mt-3 text-[15px] leading-relaxed text-neutral-300">{b.text}</p>
          {:else if b.type === 'steps' || b.type === 'bullets'}
            <ul class="mt-4 space-y-2">
              {#each b.items as item}
                <li class="flex gap-3 text-sm leading-relaxed text-neutral-300">
                  <span class="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-600"></span><span>{item}</span>
                </li>
              {/each}
            </ul>
          {:else if b.type === 'code'}
            <pre class="mt-4 overflow-x-auto rounded-xl border border-neutral-800 bg-black/60 p-4 text-xs leading-relaxed text-neutral-300"><code>{b.text}</code></pre>
          {:else if b.type === 'table'}
            <div class="mt-4 overflow-x-auto rounded-xl border border-neutral-800">
              <table class="w-full text-left text-sm"><tbody class="divide-y divide-neutral-800">
                {#each b.rows as row}
                  <tr><th class="w-1/3 align-top p-3 font-medium text-neutral-200">{row[0]}</th><td class="p-3 text-neutral-400">{row[1]}</td></tr>
                {/each}
              </tbody></table>
            </div>
          {/if}
        {/each}
      </section>
    {/each}
    {#if guide.note}<p class="mt-12 border-t border-neutral-800 pt-4 text-xs text-neutral-500">{guide.note}</p>{/if}
  </article>
{:else}
  <article class="mx-auto max-w-3xl">
    <h1 class="text-3xl font-semibold tracking-tight">Curated Bluesky feeds, built from one list</h1>
    <p class="prose-lede mt-3 text-neutral-300">
      This is a small set of custom Bluesky feeds built from a single hand-maintained list of
      accounts, published by <a class="text-[var(--color-accent)] hover:underline" href="https://bsky.app/profile/criticalnexus.bsky.social">@criticalnexus</a>.
      Each feed answers a different question: what is popular right now, what is popular this
      week, what the Spanish-speaking part of the list is reading, and so on.
    </p>
    <p class="mt-3 text-sm text-neutral-400">
      The full guide is written in Spanish — <a class="text-[var(--color-accent)] hover:underline" href="/guia">read it here</a>.
    </p>
    <h2 class="mt-10 text-xs font-semibold uppercase tracking-widest text-neutral-500">The feeds</h2>
    <ul class="mt-3 divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
      {#each data?.feeds ?? [] as f}
        <li class="flex flex-wrap items-baseline gap-x-3 p-4">
          <a class="font-medium text-neutral-100 hover:underline" href="/feed/{f.rkey}">{f.name}</a>
          <span class="font-mono text-xs text-neutral-500">{f.rkey}</span>
          <a class="ml-auto text-xs text-[var(--color-accent)] hover:underline" href="https://bsky.app/profile/{page?.title ? '' : ''}criticalnexus.bsky.social/feed/{f.rkey}">open in Bluesky →</a>
          <p class="w-full text-sm text-neutral-400">{f.description}</p>
        </li>
      {/each}
    </ul>
    <p class="mt-6 text-xs text-neutral-500">
      Everything the site knows is also machine-readable: <a class="hover:text-neutral-300" href="/feeds.json">/feeds.json</a>,
      <a class="hover:text-neutral-300" href="/feeds.opml">/feeds.opml</a>, and one JSON per feed.
    </p>
  </article>
{/if}
