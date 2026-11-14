<script lang="ts">
  import { compact } from '$lib/format';
  let { data } = $props();
  const r = $derived(data?.rising);
</script>

<svelte:head>
  <title>Subiendo esta semana — lo que más creció</title>
  <meta name="description" content="Los posts y las cuentas que más engagement ganaron en los últimos 7 días, medido con nuestras propias capturas." />
</svelte:head>

<h1 class="text-2xl font-semibold tracking-tight">Subiendo esta semana</h1>
<p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
  Lo que más creció en los últimos siete días. Medimos con nuestras propias capturas de
  engagement, así que el número es <span class="text-neutral-200">lo que el post ganó mientras lo
  estábamos mirando</span>, no su total: un post puede entrar a la lista ya con miles de likes y
  nosotros no lo apuntamos como mérito nuestro. Solo aparecen posts vistos por primera vez hace
  más de 48 horas.
</p>
{#if r?.generated_at}
  <p class="mt-2 text-xs text-neutral-500">
    Calculado {new Date(r.generated_at).toLocaleString('es-ES')} · ventana de {Math.round((r.window_hours / 24))} días ·
    <a class="hover:text-neutral-300" href="/rising.json">datos</a>
  </p>
{/if}

{#if r?.status === 'computing' && !r.count}
  <p class="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-400">
    Calculando el primer corte. Vuelve en un minuto.
  </p>
{:else if r}
  <section class="mt-10">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">Posts</h2>
    <ol class="mt-3 space-y-3">
      {#each r.posts as p, i (p.uri)}
        <li class="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div class="flex flex-wrap items-baseline gap-3 text-xs text-neutral-500">
            <span class="font-mono">{String(i + 1).padStart(2, '0')}</span>
            <span class="rounded-full bg-[var(--color-accent)]/15 px-2 py-0.5 font-mono text-[var(--color-accent)]">+{compact(p.delta_likes)}♥</span>
            <a class="hover:text-neutral-300" href="https://bsky.app/profile/{p.author}">@{p.author}</a>
            <span>{compact(p.likes)}♥ total</span>
            {#if p.board}<a class="font-mono hover:text-neutral-300" href="/feed/{p.board}">{p.board}</a>{/if}
            <a class="ml-auto hover:text-neutral-300" href={p.url}>ver</a>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-neutral-200">{p.text}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section class="mt-12">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">Cuentas</h2>
    <div class="mt-3 overflow-x-auto rounded-xl border border-neutral-800">
      <table class="w-full text-left text-sm">
        <thead class="bg-neutral-900/60 text-xs uppercase tracking-wide text-neutral-500">
          <tr><th class="p-3 font-medium">Cuenta</th><th class="p-3 font-medium">Posts en la lista</th><th class="p-3 font-medium">Likes ganados</th></tr>
        </thead>
        <tbody class="divide-y divide-neutral-800">
          {#each r.authors as a}
            <tr>
              <td class="p-3"><a class="hover:underline" href={a.url}>@{a.handle}</a></td>
              <td class="p-3 font-mono text-neutral-400">{a.posts}</td>
              <td class="p-3 font-mono text-[var(--color-accent)]">+{compact(a.delta_likes)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{/if}
