<script>
  import { CATALOG } from '../data.js';
  import { furniture } from '../lib/svg.js';

  const TICKER = 'NESTING INSTINCT · KHAKIS · SINGLE-SERVING FRIENDS · DUVET · CLEVER SHELVING · CLEAN FOR ITS OWN SAKE · THE THINGS YOU OWN END UP OWNING YOU · ';

  // Stats to display in the indictment panel
  const STATS = [
    { val: '$2.4T', label: 'spent on furniture · US · 1999' },
    { val: '47%',  label: 'of identity tied to possessions' },
    { val: '0',    label: 'of it matters in the end' },
  ];

  const INDICTMENT = [
    'You are not your job.',
    'You are not how much money you have in the bank.',
    'You are not the car you drive.',
    'You are not the contents of your wallet.',
    'You are not your fucking khakis.',
  ];
</script>

<section class="consume sec" id="consume">
  <!-- Full-bleed background: own-you poster -->
  <div class="cs-backdrop">
    <img class="cs-bg" src="img/own-you.jpg" alt="" aria-hidden="true" />
    <div class="cs-bg-overlay"></div>
    <!-- Halftone texture layer -->
    <div class="cs-halftone" aria-hidden="true"></div>
  </div>

  <!-- Header band -->
  <div class="cs-header rev">
    <span class="cs-eyebrow mono">// ADVERTISING HAS US CHASING CARS AND CLOTHES</span>
    <div class="cs-rule"></div>
    <span class="cs-issue mono">ISSUE 01 · CONSUMERISM</span>
  </div>

  <!-- Hero title -->
  <div class="cs-hero rev">
    <div class="cs-title-block">
      <h2 class="cs-title">
        <span class="cs-we">WE ARE</span>
        <span class="cs-all">ALL</span>
        <span class="cs-consumers">CONSUMERS</span>
      </h2>
      <p class="cs-lede">
        What kind of dining set defines me as a person?<br/>
        We used to read pornography. Now it was the Horchow Collection.
      </p>
    </div>

    <!-- Stats column -->
    <div class="cs-stats">
      {#each STATS as s, i}
        <div class="cs-stat" style="animation-delay:{i * 0.1}s">
          <div class="cs-stat-val">{s.val}</div>
          <div class="cs-stat-label mono">{s.label}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Running ticker -->
  <div class="ticker cs-ticker rev">
    <span class="run">{TICKER + TICKER + TICKER}</span>
  </div>

  <!-- Main body: poster + catalog + indictment -->
  <div class="cs-body rev">

    <!-- Poster image panel -->
    <div class="cs-poster-wrap">
      <div class="cs-poster">
        <img src="img/poster-redwhite.jpg" alt="Fight Club 1999 poster — Brad Pitt" />
        <div class="cs-poster-overlay"></div>
        <div class="cs-poster-label mono">
          <span>FIGHT CLUB</span>
          <span>DAVID FINCHER · 1999</span>
        </div>
      </div>
      <div class="cs-coasters">
        <img src="img/jacks-coasters.jpg" alt="I am Jack's wasted life" />
        <div class="cs-coasters-caption mono">
          I AM JACK'S COMPLETE<br/>LACK OF SURPRISE
        </div>
      </div>
    </div>

    <!-- Catalog grid (furniture assembly diagrams) -->
    <div class="cs-catalog-wrap">
      <div class="cs-catalog-head mono">
        <span>// IKEA CATALOG · REF 1999 · THINGS YOU DON'T NEED</span>
      </div>
      <div class="catalog">
        {#each CATALOG as c (c.code)}
          <div class="cat">
            <div class="draw">{@html furniture(c.draw)}</div>
            <div class="info">
              <div class="code">{c.code}</div>
              <div class="nm">{c.nm}</div>
              <div class="ds">{c.ds}</div>
              <div class="pr">{c.pr}</div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Indictment list -->
    <div class="cs-indictment">
      <div class="cs-ind-head mono">// YOU ARE NOT —</div>
      {#each INDICTMENT as line, i}
        <div class="cs-ind-line" style="animation-delay:{i * 0.07}s">
          <span class="cs-ind-num mono">{String(i + 1).padStart(2,'0')}</span>
          <span class="cs-ind-text">{line}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Screencap strip -->
  <div class="cs-screencap-wrap rev">
    <img class="cs-screencap" src="img/screencaps.jpg" alt="Fight Club scenes — Tyler, Narrator, Marla" />
    <div class="cs-screencap-tint"></div>
    <div class="cs-screencap-label mono">FOUR FRAMES · ONE TRUTH</div>
  </div>

  <!-- Closing statement -->
  <div class="cs-coda rev">
    <div class="cs-coda-rule"></div>
    <blockquote class="cs-coda-quote">
      &ldquo;The things you own end up owning you.&rdquo;
    </blockquote>
    <div class="cs-coda-attr mono">— TYLER DURDEN · FIGHT CLUB · 1999</div>
  </div>
</section>

<style>
  .consume {
    position: relative;
    overflow: hidden;
    background: #080706;
    border-top: 1px solid #1a1714;
    padding: 0 0 80px;
  }

  /* ── Backdrop ── */
  .cs-backdrop {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .cs-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 60% center;
    opacity: 0.1;
    filter: grayscale(0.4) contrast(1.35) sepia(0.15);
  }
  .cs-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(8,7,6,0.97) 0%,
      rgba(8,7,6,0.75) 50%,
      rgba(8,7,6,0.92) 100%
    );
  }
  .cs-halftone {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(200,35,42,0.04) 1px, transparent 1px);
    background-size: 18px 18px;
    mix-blend-mode: screen;
  }

  /* All content above z=0 */
  .cs-header, .cs-hero, .cs-ticker, .cs-body, .cs-screencap-wrap, .cs-coda {
    position: relative;
    z-index: 1;
  }

  /* ── Header band ── */
  .cs-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 44px var(--gutter) 0;
    flex-wrap: wrap;
  }
  .cs-eyebrow { font-size: 9px; letter-spacing: .22em; color: var(--ash); white-space: nowrap; }
  .cs-rule { flex: 1; height: 1px; background: #2a2520; min-width: 20px; }
  .cs-issue { font-size: 9px; letter-spacing: .2em; color: var(--red); white-space: nowrap; }

  /* ── Hero ── */
  .cs-hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    padding: 32px var(--gutter) 0;
    flex-wrap: wrap;
  }
  .cs-title-block { flex: 1; min-width: 280px; }
  .cs-title {
    display: flex;
    flex-direction: column;
    margin: 0 0 20px;
    line-height: 0.86;
  }
  .cs-we {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(28px, 5.5vw, 62px);
    color: var(--ash);
    letter-spacing: -.01em;
  }
  .cs-all {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(80px, 18vw, 200px);
    color: var(--red);
    letter-spacing: -.03em;
    line-height: 0.82;
    /* outline text */
    -webkit-text-stroke: 2px var(--red);
    color: transparent;
    text-shadow: none;
  }
  .cs-consumers {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(28px, 5.5vw, 62px);
    color: var(--cream);
    letter-spacing: -.01em;
  }
  .cs-lede {
    font-family: 'Special Elite', serif;
    font-size: 14px;
    line-height: 1.7;
    color: var(--ash);
    max-width: 480px;
    margin: 0;
  }

  /* Stats column */
  .cs-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-left: 3px solid var(--red);
    padding-left: 20px;
    flex-shrink: 0;
  }
  .cs-stat {}
  .cs-stat-val {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    color: var(--cream);
    line-height: 1;
    letter-spacing: -.02em;
  }
  .cs-stat-label {
    font-size: 9px;
    letter-spacing: .18em;
    color: var(--ash);
    margin-top: 2px;
    max-width: 180px;
  }

  /* ── Ticker ── */
  .cs-ticker {
    margin-top: 32px;
  }

  /* ── Body ── */
  .cs-body {
    display: grid;
    grid-template-columns: 340px 1fr 260px;
    gap: 32px;
    padding: 40px var(--gutter) 0;
    align-items: start;
  }
  @media (max-width: 1080px) { .cs-body { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 680px) { .cs-body { grid-template-columns: 1fr; } }

  /* Poster + coasters */
  .cs-poster-wrap { display: flex; flex-direction: column; gap: 12px; }
  .cs-poster {
    position: relative;
    overflow: hidden;
    background: #0d0b09;
    border: 1px solid #2a2520;
  }
  .cs-poster img {
    width: 100%;
    height: 360px;
    object-fit: cover;
    object-position: center 10%;
    display: block;
    filter: contrast(1.05) saturate(0.85);
    transition: transform 8s ease;
  }
  .cs-poster:hover img { transform: scale(1.05); }
  .cs-poster-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,7,6,0.75) 0%, transparent 45%);
    pointer-events: none;
  }
  .cs-poster-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    font-size: 8px;
    letter-spacing: .18em;
    color: rgba(236,231,218,.65);
  }
  .cs-coasters {
    position: relative;
    overflow: hidden;
    background: #0d0b09;
    border: 1px solid #2a2520;
  }
  .cs-coasters img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    filter: contrast(1.1) saturate(0.7);
  }
  .cs-coasters-caption {
    position: absolute;
    bottom: 10px;
    left: 12px;
    font-size: 8px;
    letter-spacing: .18em;
    color: rgba(236,231,218,.6);
    line-height: 1.5;
  }

  /* Catalog */
  .cs-catalog-wrap {}
  .cs-catalog-head {
    font-size: 9px;
    letter-spacing: .18em;
    color: var(--ash);
    border-bottom: 1px solid #2a2520;
    padding-bottom: 10px;
    margin-bottom: 0;
  }

  /* Indictment list */
  .cs-indictment {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .cs-ind-head {
    font-size: 9px;
    letter-spacing: .22em;
    color: var(--red);
    border-bottom: 1px solid #2a2520;
    padding-bottom: 10px;
    margin-bottom: 0;
  }
  .cs-ind-line {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #141210;
    align-items: baseline;
  }
  .cs-ind-num { font-size: 9px; letter-spacing: .16em; color: var(--red); flex-shrink: 0; }
  .cs-ind-text {
    font-family: 'Special Elite', serif;
    font-size: 13px;
    line-height: 1.5;
    color: var(--cream);
  }

  /* ── Screencap strip ── */
  .cs-screencap-wrap {
    position: relative;
    overflow: hidden;
    margin: 48px var(--gutter) 0;
    background: #0d0b09;
    border: 1px solid #2a2520;
  }
  .cs-screencap {
    width: 100%;
    max-height: 380px;
    object-fit: cover;
    object-position: center;
    display: block;
    filter: contrast(1.1) saturate(0.7) brightness(0.85);
  }
  .cs-screencap-tint {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(8,7,6,0.5) 0%,
      transparent 30%,
      transparent 70%,
      rgba(8,7,6,0.5) 100%
    );
    pointer-events: none;
  }
  .cs-screencap-label {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    letter-spacing: .24em;
    color: rgba(236,231,218,.55);
    white-space: nowrap;
  }

  /* ── Coda ── */
  .cs-coda {
    padding: 48px var(--gutter) 0;
    text-align: center;
  }
  .cs-coda-rule {
    height: 1px;
    background: linear-gradient(to right, transparent, #2a2520 20%, #2a2520 80%, transparent);
    margin-bottom: 32px;
  }
  .cs-coda-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(20px, 4vw, 34px);
    line-height: 1.4;
    color: var(--cream);
    margin: 0 0 16px;
    padding: 0;
    border: none;
    letter-spacing: -.01em;
  }
  .cs-coda-attr {
    font-size: 9px;
    letter-spacing: .22em;
    color: var(--ash);
  }
</style>
