<script>
  import { onMount, setContext } from 'svelte';
  import { createFx } from './context/fx.svelte.js';

  import Hud from './components/Hud.svelte';
  import Ambient from './components/Ambient.svelte';
  import NavBar from './components/NavBar.svelte';
  import Boot from './components/Boot.svelte';
  import Hero from './components/Hero.svelte';
  import GunMonologue from './components/GunMonologue.svelte';
  import Manifesto from './components/Manifesto.svelte';
  import Support from './components/Support.svelte';
  import Insomnia from './components/Insomnia.svelte';
  import Marla from './components/Marla.svelte';
  import Rules from './components/Rules.svelte';
  import ChemicalBurn from './components/ChemicalBurn.svelte';
  import IdCard from './components/IdCard.svelte';
  import Jack from './components/Jack.svelte';
  import CopyInsomnia from './components/CopyInsomnia.svelte';
  import TylerPhilosophy from './components/TylerPhilosophy.svelte';
  import Consume from './components/Consume.svelte';
  import Newspaper from './components/Newspaper.svelte';
  import Homework from './components/Homework.svelte';
  import Raymond from './components/Raymond.svelte';
  import Soap from './components/Soap.svelte';
  import SpaceMonkey from './components/SpaceMonkey.svelte';
  import Committees from './components/Committees.svelte';
  import Reveal from './components/Reveal.svelte';
  import Demolition from './components/Demolition.svelte';
  import Footer from './components/Footer.svelte';

  const fx = createFx();
  setContext('fx', fx);

  let booting = $state(true);
  let currentPage = $state(window.location.hash || '#/');

  onMount(() => {
    const handleHashChange = () => {
      currentPage = window.location.hash || '#/';
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });

  $effect(() => {
    currentPage;
    let obs;
    const timeoutId = setTimeout(() => {
      obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.rev').forEach((el) => obs.observe(el));
    }, 50);
    return () => { clearTimeout(timeoutId); if (obs) obs.disconnect(); };
  });

  $effect(() => { document.body.classList.toggle('lockscroll', booting); });
  $effect(() => { if (!booting) return fx.startSubliminals(); });
</script>

<Hud />
<Ambient />
<NavBar {currentPage} />

<main class={fx.glitching ? 'glitching' : undefined}>
  {#if currentPage === '#/rules'}
    <Rules />

  {:else if currentPage === '#/identity'}
    <ChemicalBurn />
    <IdCard />
    <Jack />
    <CopyInsomnia />
    <TylerPhilosophy />

  {:else if currentPage === '#/mayhem'}
    <Consume />
    <Newspaper />
    <Homework />
    <Raymond />
    <Soap />
    <SpaceMonkey />
    <Committees />

  {:else if currentPage === '#/demolition'}
    <Reveal />
    <Demolition />

  {:else}
    <Hero />
    <GunMonologue />
    <Manifesto />
    <Support />
    <Insomnia />
    <Marla />
  {/if}
  <Footer />
</main>

{#if booting}
  <Boot ondone={() => { booting = false; }} />
{/if}
