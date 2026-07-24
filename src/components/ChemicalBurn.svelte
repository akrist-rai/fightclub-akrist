<script>
  import { onMount, getContext } from 'svelte';
  import { BURN_STAGES, BURN_LABELS } from '../data.js';

  // Press and hold the induction field: the lye record advances through stages
  // and leaves a permanent mark. The visual stays deliberately abstract.
  const fx = getContext('fx');

  let spot, scar, fill, say, pct, stageV, txt;

  const st = { burning: false, lvl: 0, raf: 0, stage: 0, peaked: false, loop: null };

  onMount(() => {
    st.loop = function loop() {
      if (st.burning && st.lvl < 100) st.lvl = Math.min(100, st.lvl + 1.1);
      else if (!st.burning && st.lvl > 0) st.lvl = Math.max(0, st.lvl - 1.6);

      fill.style.width = st.lvl + '%';
      const sz = st.lvl * 1.5;
      spot.style.width = sz + 'px';
      spot.style.height = sz + 'px';
      spot.style.opacity = st.lvl > 2 ? Math.min(1, st.lvl / 40) : 0;
      pct.textContent = Math.round(st.lvl) + '%';
      txt.textContent = st.burning ? 'DO NOT PULL AWAY' : (st.lvl > 0 ? '…' : 'PRESS & HOLD');

      if (st.lvl >= 96) st.peaked = true;
      if (st.peaked) scar.classList.add('show');

      const ns = Math.min(BURN_STAGES.length - 1, Math.floor(st.lvl / 17));
      if (ns !== st.stage) {
        st.stage = ns;
        say.textContent = BURN_STAGES[ns];
        stageV.textContent = BURN_LABELS[ns];
        if (ns >= 2) fx.flash('PAIN');
      }
      if (st.lvl > 0 || st.burning) st.raf = requestAnimationFrame(st.loop);
      else cancelAnimationFrame(st.raf);
    };

    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);

    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  });

  function start(e) { e.preventDefault(); st.burning = true; cancelAnimationFrame(st.raf); st.loop(); }
  function stop() { st.burning = false; }
</script>

<section class="burn sec" id="burn">
  <span class="eyebrow rev">// the lye kiss · 537 paper street · induction record</span>
  <h2 class="disp rev" style="font-size:clamp(30px,6vw,68px);margin:0 0 6px;line-height:.86">Give Me Your Hand</h2>
  <div class="burn-grid rev">
    <div class="burn-cell" onmousedown={start} ontouchstart={start} onmouseleave={stop} role="button" tabindex="0">
      <div class="lbx t"></div><div class="lbx b"></div>
      <div class="burn-scene" aria-hidden="true">
        <div class="burn-mark mono">NaOH</div>
        <div class="burn-orbit o1"></div><div class="burn-orbit o2"></div><div class="burn-orbit o3"></div>
        <div class="burn-cross"><i></i><i></i></div>
        <div class="burn-spot2" bind:this={spot}></div>
        <div class="burn-scar" bind:this={scar}></div>
      </div>
      <div class="burn-sub type" bind:this={say}>This is the greatest moment of your life.</div>
    </div>
    <div class="burn-form">
      <h4>Chemical Burn<br />Induction Record</h4>
      <div class="sub">PAPER STREET SOAP CO · NaOH · DO NOT RINSE · DO NOT PULL AWAY</div>
      <div class="burn-line"><span class="k">SUBJECT</span><span class="v">SPACE MONKEY</span></div>
      <div class="burn-line"><span class="k">SUBSTANCE</span><span class="v">LYE · NaOH</span></div>
      <div class="burn-line"><span class="k">STAGE</span><span class="v" bind:this={stageV}>— GUILT —</span></div>
      <div class="burn-line"><span class="k">SURRENDER</span><span class="v" bind:this={pct}>0%</span></div>
      <div class="burn-meter2"><i bind:this={fill}></i><span bind:this={txt}>PRESS &amp; HOLD</span></div>
      <p class="burn-hint2">› press &amp; hold the hand · do not pull away ‹</p>
    </div>
  </div>
</section>
