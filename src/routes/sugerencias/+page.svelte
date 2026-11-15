<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  const box = $derived(data?.box);
</script>

<svelte:head>
  <title>Proponer una cuenta</title>
  <meta name="description" content="Sugiere una cuenta de Bluesky para la lista de fuentes. Requisitos públicos y revisión a mano." />
</svelte:head>

<div class="max-w-2xl">
  <h1 class="text-2xl font-semibold tracking-tight">Proponer una cuenta</h1>
  <p class="mt-2 text-sm leading-relaxed text-neutral-400">
    La lista de fuentes es corta a propósito: catorce feeds construidos sobre un conjunto de
    cuentas que mantenemos a mano. Si crees que falta alguien, dilo aquí. Lo lee una persona,
    no un formulario.
  </p>

  <section class="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">El listón</h2>
    <ul class="mt-3 space-y-2 text-sm text-neutral-300">
      {#each box?.bar ?? [] as line}
        <li class="flex gap-3"><span class="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-600"></span><span>{line}</span></li>
      {/each}
    </ul>
    <p class="mt-3 text-xs text-neutral-500">
      Si no encaja, no pasa nada: no discutimos rechazos ni damos explicaciones caso por caso.
      Lo aceptado aparece abajo y en el <a class="hover:text-neutral-300" href="/suggestions.json">registro público</a>.
    </p>
  </section>

  {#if form?.sent}
    <p class="mt-6 rounded-xl border border-emerald-900 bg-emerald-950/40 p-4 text-sm text-emerald-300">
      Recibido: {form.handle}. Si encaja, aparecerá en la lista; si no, no recibirás respuesta.
    </p>
  {:else}
    <form method="POST" use:enhance class="mt-6 space-y-4">
      <div>
        <label class="text-xs font-semibold uppercase tracking-widest text-neutral-500" for="handle">Cuenta de Bluesky</label>
        <input id="handle" name="handle" value={form?.handle ?? ''} placeholder="alguien.bsky.social"
               class="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-600" />
      </div>
      <div>
        <label class="text-xs font-semibold uppercase tracking-widest text-neutral-500" for="reason">Por qué encaja</label>
        <textarea id="reason" name="reason" rows="4" value={form?.reason ?? ''}
                  placeholder="Qué publica, con qué frecuencia, y por qué aporta algo que la lista no tiene."
                  class="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-600"></textarea>
        <p class="mt-1 text-xs text-neutral-600">Una frase basta. Sin esto no se revisa.</p>
      </div>
      <div class="flex items-center gap-3">
        <select aria-label="Language" name="lang" class="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300">
          <option value="es">Escribe en español</option>
          <option value="en">Writes in English</option>
        </select>
        <button class="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-white">Enviar</button>
      </div>
      {#if form?.error}<p class="text-sm text-red-400">{form.error}</p>{/if}
    </form>
  {/if}

  <section class="mt-10">
    <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500">Aceptadas</h2>
    {#if box?.accepted?.length}
      <ul class="mt-3 divide-y divide-neutral-800 rounded-xl border border-neutral-800">
        {#each box.accepted as a}
          <li class="p-3 text-sm">
            <a class="text-neutral-200 hover:underline" href="https://bsky.app/profile/{a.handle}">@{a.handle}</a>
            <span class="ml-2 text-neutral-500">{a.why}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="mt-2 text-sm text-neutral-500">Todavía no hay propuestas aceptadas por esta vía.</p>
    {/if}
    <p class="mt-3 text-xs text-neutral-600">{box?.pending ?? 0} pendientes de revisar.</p>
  </section>
</div>
