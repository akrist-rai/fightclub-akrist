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
  <!-- Full-bleed background image, heavily graded into the page -->
  <img class="hero-bg" src="img/tyler-smoke.jpg" alt="" aria-hidden="true" />
  <div class="hero-bg-tint"></div>

  <div class="hero-cnt">
    <span class="eyebrow flick">RULE 01 / YOU DO NOT TALK ABOUT FIGHT CLUB</span>
    <h1>
      <span class="h1-sub mono">A FILM BY DAVID FINCHER · 1999</span>
      FIGHT<br/>CLUB
    </h1>
    <p class="tag">
      An insomniac and a devil-may-care soap maker. A purposeless terminal for Project Mayhem —
      no login, no newsletter, no reason. You met me at a very strange time in my life.
    </p>
    <div class="hit-wrap">
      <button class="hit-btn" onclick={hit}>HIT ME</button>
      <span class="bruise-ctr mono">{msg}</span>
    </div>
  </div>

  <!-- Right half: poster image bleeds out of a dark frame -->
  <div class="hero-poster">
    <img src="img/hero-poster.jpg" alt="Fight Club one-sheet, 1999" />
  </div>

  <div class="scroll-hint mono">↓ SCROLL TO ENTER</div>
</header>
