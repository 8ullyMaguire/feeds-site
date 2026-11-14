<script lang="ts">
  import type { GuideBlock } from '$lib/engine';
  let { data } = $props();
  const g = $derived(data?.guide);
</script>

<svelte:head>
  <title>{g?.title ?? 'Guía'}</title>
  <meta name="description" content={g?.lede ?? ''} />
</svelte:head>

{#if g}
  <article class="mx-auto max-w-3xl">
    <h1 class="text-3xl font-semibold tracking-tight">{g.title}</h1>
    <p class="prose-lede mt-3 text-neutral-300">{g.lede}</p>

    <nav class="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
      <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500">{g.toc_title ?? 'Contenido'}</p>
      <ol class="mt-3 space-y-1 text-sm text-neutral-400">
        {#each g.sections as s, i (s.id)}
          <li><a class="hover:text-neutral-100" href="#{s.id}"><span class="mr-2 font-mono text-xs text-neutral-600">{String(i + 1).padStart(2, '0')}</span>{s.h}</a></li>
        {/each}
      </ol>
    </nav>

    {#each g.sections as s (s.id)}
      <section id={s.id} class="mt-12 scroll-mt-8">
        <h2 class="text-xl font-semibold tracking-tight text-neutral-100">{s.h}</h2>
        {#each s.blocks as b}
          {#if b.type === 'p'}
            <p class="mt-3 text-[15px] leading-relaxed text-neutral-300">{b.text}</p>
          {:else if b.type === 'steps'}
            <ol class="mt-4 space-y-2">
              {#each b.items as item, i}
                <li class="flex gap-3 text-sm leading-relaxed text-neutral-300">
                  <span class="mt-0.5 font-mono text-xs text-neutral-600">{i + 1}.</span><span>{item}</span>
                </li>
              {/each}
            </ol>
          {:else if b.type === 'bullets'}
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
              <table class="w-full text-left text-sm">
                <tbody class="divide-y divide-neutral-800">
                  {#each b.rows as row}
                    <tr><th class="w-1/3 align-top p-3 font-medium text-neutral-200">{row[0]}</th><td class="p-3 text-neutral-400">{row[1]}</td></tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        {/each}
      </section>
    {/each}

    {#if g.note}<p class="mt-12 border-t border-neutral-800 pt-4 text-xs text-neutral-500">{g.note}</p>{/if}
  </article>
{:else}
  <p class="text-sm text-neutral-400">La guía no está disponible ahora mismo.</p>
{/if}
