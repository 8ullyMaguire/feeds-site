<script lang="ts">
  import '../app.css';
  let { data, children } = $props();
  const site = $derived(data?.site);
  const handle = $derived(site?.owner?.handle ?? 'criticalnexus.bsky.social');
</script>

<div class="mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-6 sm:px-8">
  <header class="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-800 pb-4">
    <a href="/" class="text-lg font-semibold tracking-tight text-neutral-50">
      {site?.page?.title ?? 'Feeds'}
    </a>
    <nav class="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
      <a class="hover:text-neutral-100" href="/feeds">Feeds</a>
      <a class="hover:text-neutral-100" href="/rising">Subiendo</a>
      <a class="hover:text-neutral-100" href="/guia">Guía</a>
      <a class="hover:text-neutral-100" href="/sugerencias">Proponer</a>
      <a class="hover:text-neutral-100" href="/en">English</a>
      <a class="hover:text-neutral-100" rel="me" href="https://bsky.app/profile/{handle}">Bluesky</a>
    </nav>
  </header>

  <main class="flex-1 py-8">
    {@render children()}
  </main>

  <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
    <span>
      {#if site}<a class="hover:text-neutral-300" href="https://{site.service}">{site.service}</a>{/if}
      · datos servidos por el motor de feeds
    </span>
    <span class="flex gap-4">
      {#if site?.page?.repo}<a class="hover:text-neutral-300" href={site.page.repo}>Código (AGPL-3.0)</a>{/if}
      <a class="hover:text-neutral-300" href="/feeds.json">feeds.json</a>
      <a class="hover:text-neutral-300" href="/feeds.opml">OPML</a>
    </span>
  </footer>
</div>
