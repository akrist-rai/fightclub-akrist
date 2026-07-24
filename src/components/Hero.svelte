<script>
  import { getContext } from 'svelte';

  const fx = getContext('fx');

  let bruises = $state(0);

  function hit() {
    bruises += 1;
    fx.flash(['PAIN', 'ALIVE', 'WAKE UP', 'TYLER'][Math.floor(Math.random() * 4)]);
    fx.triggerGlitch();
  }

  const s = $derived(String(bruises).padStart(2, '0'));
  const msg = $derived(
    bruises < 4 ? `BRUISES: ${s}` :
    bruises < 8 ? `BRUISES: ${s} · you're starting to feel something` :
    `BRUISES: ${s} · you've never been more alive`
  );
</script>

<header class="hero">
  <div class="hero-grid" aria-hidden="true" />
  <div class="hero-serial mono" aria-hidden="true">FC / 1999 / 01—01</div>
  <div class="hero-cnt">
    <span class="eyebrow flick">RULE 01 / YOU DO NOT TALK ABOUT FIGHT CLUB</span>
    <p class="hero-kicker mono">A FILM BY DAVID FINCHER <span>·</span> 1999</p>
    <h1 class="glitch" data-text="FIGHT CLUB"><span>FIGHT</span> <span>CLUB</span></h1>
    <p class="tag">
      An insomniac and a devil-may-care soap maker. A purposeless terminal for Project Mayhem —
      no login, no newsletter, no reason. You met me at a very strange time in my life.
    </p>
    <div class="hit-wrap">
      <span class="hit-line">&ldquo;I want you to hit me as hard as you can.&rdquo;</span>
      <button class="hit-btn" onclick={hit}>HIT ME</button>
      <span class="bruise-ctr">{msg}</span>
    </div>
  </div>
  <div class="hero-poster">
    <div class="poster-tab mono">CASE FILE / 01</div>
    <div class="poster-frame">
      <img src="img/hero-poster.jpg" alt="Fight Club one-sheet, 1999" />
      <div class="poster-wash" />
    </div>
    <div class="pin">03:42 AM · DELAWARE HOTEL BASEMENT</div>
  </div>
  <div class="hero-bottom mono"><span>SCROLL TO ENTER</span><i /><span>NO. 0001</span></div>
</header>
