<script>
  import { SUPPORT } from '../data.js';
  import { icon } from '../lib/svg.js';
</script>

<section class="support sec" id="support">
  <span class="eyebrow ash rev">// when people think you're dying, they really listen</span>
  <h2 class="disp rev" style="font-size: clamp(34px,7vw,80px); margin: 0 0 4px; line-height: .86">Support Groups</h2>
  <p class="rev type" style="color: var(--ash); font-size: 13px; max-width: 560px; line-height: 1.7">
    Slide into the warm center where everyone hugs. This — for a while — was better than sleeping.
  </p>
  <div class="sg-grid rev">
    {#each SUPPORT as s (s.h)}
      <div class="sg-card">
        <div class="ic">{@html icon(s.ic)}</div>
        <h3>{s.h}</h3>
        <p>{s.p}</p>
        <div class="when">{s.w}</div>
      </div>
    {/each}
  </div>
  <div class="reel-band rev">
    <div class="filmstrip"><img src="img/screencaps.jpg" alt="Fight Club scenes contact sheet" loading="lazy" /></div>
    <div class="reel-txt">
      <p>&ldquo;Her lie reflected my lie. Suddenly I felt nothing. I couldn&rsquo;t cry, so once again, I couldn&rsquo;t sleep.&rdquo;</p>
      <div class="by">CONTACT SHEET · REEL 01 · FRAMES 014–017 — THE TOURIST &amp; MARLA SINGER</div>
    </div>
  </div>
</section>
