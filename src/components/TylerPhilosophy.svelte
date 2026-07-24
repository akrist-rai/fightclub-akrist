<script>
  import { TYLER_PHILOSOPHY } from '../data.js';

  let active = $state(0);

  // Images that rotate with each philosophy pillar
  const PILLAR_IMGS = [
    'img/nobody-cares.jpg',
    'img/tyler-dollar.jpg',
    'img/in-tyler-we-trust.jpg',
    'img/tyler-smoke.jpg',
    'img/nobody-cares.jpg',
    'img/tyler-dollar.jpg',
  ];

  function cycleImg(i) {
    return PILLAR_IMGS[i % PILLAR_IMGS.length];
  }
</script>

<section class="tyler sec" id="tyler">
  <!-- Full-bleed ambient image layer -->
  <div class="ty-backdrop">
    <img class="ty-bg" src="img/in-tyler-we-trust.jpg" alt="" aria-hidden="true" />
    <div class="ty-bg-grad"></div>
  </div>

  <!-- Ghost watermark -->
  <div class="ty-ghost" aria-hidden="true">TYLER</div>

  <!-- Section header -->
  <div class="ty-header rev">
    <div class="ty-header-left">
      <span class="eyebrow ash">// durden, tyler · 1999 · b.f.a. soap rendering</span>
      <h2 class="ty-title">The Durden<br/>Doctrine</h2>
    </div>
    <div class="ty-header-right">
      <div class="ty-counter-display mono">
        <span class="ty-cd-cur">{String(active + 1).padStart(2,'0')}</span>
        <span class="ty-cd-sep">/</span>
        <span class="ty-cd-tot">{TYLER_PHILOSOPHY.length}</span>
      </div>
    </div>
  </div>

  <!-- Main content: tabs + quote card + image -->
  <div class="ty-body rev">

    <!-- Tab list -->
    <nav class="ty-tabs" aria-label="Tyler's philosophies">
      {#each TYLER_PHILOSOPHY as p, i (p.heading)}
        <button
          class="ty-tab"
          class:ty-tab-on={active === i}
          onclick={() => { active = i; }}
          aria-pressed={active === i}
        >
          <span class="tt-num mono">{String(i + 1).padStart(2, '0')}</span>
          <span class="tt-label">{p.heading}</span>
          {#if active === i}<span class="tt-arrow">→</span>{/if}
        </button>
      {/each}
    </nav>

    <!-- Right: quote + image stack -->
    <div class="ty-right">
      {#key active}
        <div class="ty-quote-card">
          <!-- Red accent bar -->
          <div class="tqc-accent"></div>
          <div class="tqc-inner">
            <div class="tqc-head mono">// {TYLER_PHILOSOPHY[active].heading.toUpperCase()}</div>
            <blockquote class="tqc-quote">
              &ldquo;{TYLER_PHILOSOPHY[active].quote}&rdquo;
            </blockquote>
            <div class="tqc-attr mono">— TYLER DURDEN · PROJECT MAYHEM · 1999</div>
            <div class="tqc-bar"></div>
          </div>
        </div>
      {/key}

      <!-- Rotating image panel -->
      {#key active}
        <div class="ty-img-wrap">
          <img
            src={cycleImg(active)}
            alt="Tyler Durden — {TYLER_PHILOSOPHY[active].heading}"
            class="ty-img"
          />
          <div class="ty-img-overlay"></div>
          <div class="ty-img-tag mono">
            DOCTRINE {String(active + 1).padStart(2,'0')} · TYLER DURDEN
          </div>
        </div>
      {/key}

      <!-- Thumbnail strip -->
      <div class="ty-strip">
        {#each TYLER_PHILOSOPHY as p, i (p.heading)}
          <button
            class="ty-strip-btn"
            class:ty-strip-on={active === i}
            onclick={() => { active = i; }}
            title={p.heading}
          >
            <img src={cycleImg(i)} alt={p.heading} />
            <div class="ty-strip-num mono">{String(i+1).padStart(2,'0')}</div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .tyler {
    position: relative;
    overflow: hidden;
    padding: 0;
    background: #060505;
    border-top: 1px solid #1a1714;
  }

  /* ── Backdrop ── */
  .ty-backdrop {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .ty-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    opacity: 0.12;
    filter: grayscale(0.5) contrast(1.3) sepia(0.2);
  }
  .ty-bg-grad {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(6,5,5,0.97) 0%, rgba(6,5,5,0.65) 55%, rgba(6,5,5,0.95) 100%);
  }

  /* ── Ghost ── */
  .ty-ghost {
    position: absolute;
    top: 50%;
    right: -60px;
    transform: translateY(-50%);
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(220px, 44vw, 640px);
    color: rgba(200,35,42,.022);
    pointer-events: none;
    user-select: none;
    letter-spacing: -.07em;
    white-space: nowrap;
    z-index: 0;
  }

  /* ── Header ── */
  .ty-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding: 64px var(--gutter) 0;
    flex-wrap: wrap;
  }
  .ty-title {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(44px, 9vw, 108px);
    line-height: 0.86;
    color: var(--cream);
    letter-spacing: -.02em;
    margin: 10px 0 0;
  }
  .ty-counter-display {
    font-size: clamp(40px, 7vw, 72px);
    line-height: 1;
    letter-spacing: -.04em;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }
  .ty-cd-cur { color: var(--cream); }
  .ty-cd-sep { color: #2a2520; font-size: .5em; }
  .ty-cd-tot { color: var(--ash); font-size: .4em; }

  /* ── Body grid ── */
  .ty-body {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    padding: 40px var(--gutter) 72px;
    align-items: start;
  }
  @media (max-width: 780px) {
    .ty-body { grid-template-columns: 1fr; }
    .ty-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  }

  /* ── Tabs ── */
  .ty-tabs {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid #1e1b17;
  }
  .ty-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 14px;
    background: transparent;
    border: none;
    border-left: 3px solid transparent;
    border-bottom: 1px solid #141210;
    cursor: pointer;
    text-align: left;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    letter-spacing: .1em;
    color: var(--ash);
    transition: color .18s, border-color .18s, background .18s;
    position: relative;
  }
  .ty-tab:last-child { border-bottom: none; }
  .ty-tab:hover { color: var(--cream); background: rgba(200,35,42,.05); }
  .ty-tab-on {
    border-left-color: var(--red);
    color: var(--cream);
    background: rgba(200,35,42,.08);
  }
  .tt-num { font-size: 9px; letter-spacing: .2em; color: var(--red); width: 22px; flex-shrink: 0; }
  .tt-label { flex: 1; }
  .tt-arrow { font-size: 12px; color: var(--red); margin-left: auto; }

  /* ── Right panel ── */
  .ty-right { display: flex; flex-direction: column; gap: 20px; }

  /* Quote card */
  .ty-quote-card {
    position: relative;
    overflow: hidden;
    background: rgba(8,7,6,0.85);
    border: 1px solid #2a2520;
    animation: tqSlide .32s ease;
  }
  @keyframes tqSlide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  .tqc-accent {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: var(--red);
  }
  .tqc-inner { padding: 32px 32px 26px 36px; }
  .tqc-head {
    font-size: 9px;
    letter-spacing: .24em;
    color: var(--red);
    margin-bottom: 22px;
  }
  .tqc-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(16px, 2.4vw, 22px);
    line-height: 1.62;
    color: var(--cream);
    margin: 0 0 24px;
    padding: 0;
    border: none;
  }
  .tqc-attr { font-size: 9px; letter-spacing: .2em; color: var(--ash); }
  .tqc-bar { height: 2px; background: linear-gradient(to right, var(--red), transparent); margin-top: 20px; }

  /* Rotating image panel */
  .ty-img-wrap {
    position: relative;
    overflow: hidden;
    background: #0d0b09;
    animation: tqSlide .38s ease;
  }
  .ty-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center 20%;
    display: block;
    filter: contrast(1.1) saturate(0.75);
    transition: transform 8s ease;
  }
  .ty-img-wrap:hover .ty-img { transform: scale(1.05); }
  .ty-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(6,5,5,0.85) 0%, rgba(6,5,5,0.1) 50%, transparent 100%);
    pointer-events: none;
  }
  .ty-img-tag {
    position: absolute;
    bottom: 12px;
    left: 16px;
    font-size: 9px;
    letter-spacing: .2em;
    color: rgba(236,231,218,.6);
  }

  /* Thumbnail strip */
  .ty-strip {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .ty-strip::-webkit-scrollbar { display: none; }
  .ty-strip-btn {
    position: relative;
    flex-shrink: 0;
    width: 64px;
    height: 48px;
    overflow: hidden;
    border: 2px solid transparent;
    background: none;
    cursor: pointer;
    padding: 0;
    transition: border-color .2s, transform .15s;
  }
  .ty-strip-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.6);
    transition: filter .2s;
  }
  .ty-strip-btn:hover img { filter: grayscale(0); }
  .ty-strip-on { border-color: var(--red); }
  .ty-strip-on img { filter: grayscale(0); }
  .ty-strip-num {
    position: absolute;
    bottom: 2px;
    right: 4px;
    font-size: 7px;
    color: rgba(236,231,218,.8);
    letter-spacing: .1em;
    text-shadow: 0 1px 3px rgba(0,0,0,.8);
  }
</style>
