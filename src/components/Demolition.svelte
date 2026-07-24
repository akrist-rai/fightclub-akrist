<script>
  import { onDestroy, getContext } from 'svelte';
  import { END_QUOTES } from '../data.js';

  // Final-sequence control: arm the cue, start the countdown, then cut the
  // final film frame to black.
  const fx = getContext('fx');

  let armed = $state(false);
  let boomed = $state(false);
  let counting = $state(false);
  let readout = $state('T—:——');
  let q = $state('You met me at a very strange time in my life.');
  let qOn = $state(true);
  let cap = $state('');

  const timers = [];
  onDestroy(() => { timers.forEach(clearInterval); });

  function toggleSafety() {
    if (boomed) return;
    armed = !armed;
    readout = armed ? 'T-00:03' : 'T—:——';
  }

  function fire() {
    if (boomed || counting) return;
    if (!armed) {
      readout = 'ARM 1ST';
      fx.triggerGlitch();
      setTimeout(() => { readout = 'T—:——'; }, 700);
      return;
    }
    counting = true;
    let n = 3;
    readout = 'T-00:0' + n;
    const cd = setInterval(() => {
      n -= 1;
      if (n >= 0) readout = 'T-00:0' + n;
      if (n <= 0) { clearInterval(cd); detonate(); }
    }, 700);
    timers.push(cd);
  }

  function detonate() {
    boomed = true;
    readout = '00:00';
    fx.triggerGlitch();
    fx.flash('∅');
    cap = '— REEL 03 · FINAL FRAME · WHERE IS MY MIND? —';
    let i = 0;
    const t = setInterval(() => {
      qOn = false;
      setTimeout(() => { q = END_QUOTES[i % END_QUOTES.length]; qOn = true; i += 1; }, 600);
      if (i >= END_QUOTES.length) clearInterval(t);
    }, 2600);
    timers.push(t);
  }
</script>

<section class={'demo sec' + (boomed ? ' boom' : '')} id="demo">
  <span class="eyebrow rev">// the end of the world · 08:14 pm</span>
  <p class="demo-q rev" style="opacity:{qOn ? 1 : 0}">&ldquo;{q}&rdquo;</p>
  <div class="final-frame rev">
    <img src="img/ending-art.jpg" alt="The final scene from Fight Club" loading="lazy" />
    <div class="final-frame-mask"></div>
    <div class="final-frame-meta mono"><span>REEL 03 / FINAL FRAME</span><span>35MM / 2.39:1</span></div>
  </div>
  <div class="detonator rev">
    <div class="det-top">
      <div class="det-label">PROJECT MAYHEM // <b>DEMOLITIONS COMMITTEE</b><br />DET-9 · TEN-BUILDING BLAST SEQUENCE</div>
      <div class="det-readout">{readout}</div>
    </div>
    <div class="det-actions">
      <button class={'det-toggle' + (armed ? ' on' : '')} onclick={toggleSafety}>SAFETY: {armed ? 'OFF' : 'ON'}</button>
      <button class="det-fire" onclick={fire}>{boomed ? 'SEQUENCE COMPLETE' : 'BEGIN SEQUENCE'}</button>
    </div>
  </div>
  <div class="demo-q" style="min-height:1em;margin-top:14px">{cap}</div>
</section>
