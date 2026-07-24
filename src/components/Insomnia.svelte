<script>
  import { onMount } from 'svelte';
  import { INSOMNIA_LOG, INSOMNIA_QUOTES } from '../data.js';

  const EPOCH = new Date('1999-10-14T03:00:00').getTime();

  let hoursAwake = $state(0);
  let quoteIdx = $state(0);
  let activeLog = $state(0);
  let scanlineOffset = $state(0);

  onMount(() => {
    const tick = setInterval(() => {
      const elapsed = (Date.now() - EPOCH) / 3600000;
      hoursAwake = elapsed % 200;
      activeLog = Math.min(INSOMNIA_LOG.length - 1, Math.floor((hoursAwake / 200) * INSOMNIA_LOG.length));
    }, 1000);

    const qCycle = setInterval(() => {
      quoteIdx = (quoteIdx + 1) % INSOMNIA_QUOTES.length;
    }, 5000);

    const scanline = setInterval(() => {
      scanlineOffset = (scanlineOffset + 1) % 4;
    }, 120);

    return () => { clearInterval(tick); clearInterval(qCycle); clearInterval(scanline); };
  });

  const degradation = $derived(Math.min(1, hoursAwake / 180));
  const blurAmt = $derived((degradation * 2.4).toFixed(2));
  const skewAmt = $derived((degradation * 2.5).toFixed(2));
  const statusLabel = $derived(
    hoursAwake < 48  ? 'FUNCTIONAL — BARELY' :
    hoursAwake < 96  ? 'HALLUCINATING — PROBABLY' :
    hoursAwake < 144 ? 'DISSOCIATING — CONFIRMED' :
                       'TYLER IS HERE'
  );
  const statusColor = $derived(
    hoursAwake < 48  ? '#6b7280' :
    hoursAwake < 96  ? '#f59e0b' :
    hoursAwake < 144 ? '#ef4444' :
                       '#c8232a'
  );
</script>

<section class="insomnia sec" id="insomnia">
  <!-- Full-bleed cinematic backdrop -->
  <div class="ins-backdrop">
    <img class="ins-bg-img" src="img/tyler-smoke.jpg" alt="" aria-hidden="true" />
    <div class="ins-bg-vignette"></div>
    <div class="ins-scanlines" style="background-position: 0 {scanlineOffset * 4}px" aria-hidden="true"></div>
  </div>

  <!-- Top eyebrow rule -->
  <div class="ins-header rev">
    <span class="ins-tag mono">// SLEEP DEPRIVATION LOG · ONSET UNKNOWN</span>
    <div class="ins-rule"></div>
  </div>

  <!-- Hero title block -->
  <div class="ins-hero rev">
    <h2 class="ins-title">
      <span class="ins-title-sub mono">SUBJECT FILE · 1999 · ANONYMOUS</span>
      When Did You<br/>Last Sleep?
    </h2>
    <div class="ins-hours-block" style="filter:blur({blurAmt}px);transform:skewX({skewAmt}deg)">
      <div class="ins-big-num">
        {Math.floor(hoursAwake).toString().padStart(3, '0')}
        <span class="ins-unit">h</span>
      </div>
      <div class="ins-bar-track">
        <div class="ins-bar-fill" style="width:{Math.min(100, hoursAwake / 2)}%">
          <div class="ins-bar-blip"></div>
        </div>
      </div>
      <div class="ins-status mono" style="color:{statusColor}">{statusLabel}</div>
    </div>
  </div>

  <!-- Split grid: quote cycle + log -->
  <div class="ins-grid rev">
    <!-- Quote panel with accent image -->
    <div class="ins-quote-panel">
      <div class="ins-img-wrap">
        <img src="img/losing-hope.jpg" alt="Losing all hope is freedom" />
        <div class="ins-img-overlay"></div>
        <div class="ins-img-caption mono">LOSING ALL HOPE IS FREEDOM</div>
      </div>
      <div class="ins-cycling-quote" style="opacity:{0.55 + degradation * 0.45}">
        <span class="ins-mq">&ldquo;</span>
        <span class="ins-qt">{INSOMNIA_QUOTES[quoteIdx]}</span>
        <span class="ins-mq">&rdquo;</span>
      </div>
    </div>

    <!-- Field log -->
    <div class="ins-log">
      <div class="ins-log-head mono">▌ FIELD LOG — REDACTED OPERATIVE</div>
      {#each INSOMNIA_LOG as entry, i (i)}
        <div
          class="ins-entry"
          class:ins-entry-active={i === activeLog}
          style="opacity:{i <= activeLog ? 1 : 0.18}"
        >
          <span class="ins-h mono">{entry.h}</span>
          <span
            class="ins-text"
            style="filter:blur({i > activeLog ? 0 : Math.max(0, (i / INSOMNIA_LOG.length) * parseFloat(blurAmt))}px)"
          >{entry.entry}</span>
        </div>
      {/each}
    </div>
  </div>

  <p class="ins-footer mono rev">
    &ldquo;When you have insomnia, you&rsquo;re never really asleep &mdash; and you&rsquo;re never really awake.&rdquo;
  </p>
</section>

<style>
  .insomnia {
    position: relative;
    overflow: hidden;
    padding: 0;
    background: #060505;
    border-top: 1px solid #1e1b17;
  }

  /* ── Backdrop ── */
  .ins-backdrop {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .ins-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    opacity: 0.18;
    filter: grayscale(0.6) contrast(1.2);
  }
  .ins-bg-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 30%, transparent 10%, rgba(6,5,5,0.75) 55%, #060505 90%);
  }
  .ins-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.08) 3px,
      rgba(0,0,0,0.08) 4px
    );
    background-size: 100% 4px;
    mix-blend-mode: multiply;
  }

  /* ── All content above backdrop ── */
  .ins-header, .ins-hero, .ins-grid, .ins-footer {
    position: relative;
    z-index: 1;
  }

  /* ── Header row ── */
  .ins-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 40px var(--gutter) 0;
  }
  .ins-tag { font-size: 10px; letter-spacing: .22em; color: var(--ash); white-space: nowrap; }
  .ins-rule { flex: 1; height: 1px; background: #2a2520; }

  /* ── Hero block ── */
  .ins-hero {
    padding: 36px var(--gutter) 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
  }
  .ins-title {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(38px, 8vw, 96px);
    line-height: 0.88;
    color: var(--cream);
    letter-spacing: -.02em;
    margin: 0;
    max-width: 580px;
  }
  .ins-title-sub {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: .24em;
    color: var(--ash);
    margin-bottom: 14px;
    line-height: 1;
  }
  .ins-hours-block {
    text-align: right;
    transition: filter 2s, transform 2s;
    flex-shrink: 0;
  }
  .ins-big-num {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(80px, 16vw, 160px);
    line-height: 1;
    color: var(--cream);
    letter-spacing: -.04em;
  }
  .ins-unit { font-size: .3em; vertical-align: super; color: var(--red); }
  .ins-bar-track {
    height: 3px;
    background: #1a1714;
    position: relative;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .ins-bar-fill {
    height: 100%;
    background: linear-gradient(to right, #6b1010, var(--red));
    transition: width 2s linear;
    position: relative;
  }
  .ins-bar-blip {
    position: absolute;
    right: 0; top: -2px;
    width: 3px; height: 7px;
    background: #fff;
    filter: blur(1px);
  }
  .ins-status { font-size: 9px; letter-spacing: .22em; }

  /* ── Content grid ── */
  .ins-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 40px;
    padding: 48px var(--gutter) 60px;
  }
  @media (max-width: 780px) {
    .ins-grid { grid-template-columns: 1fr; }
    .ins-hero { flex-direction: column; align-items: flex-start; }
    .ins-hours-block { text-align: left; }
  }

  /* ── Quote panel with image ── */
  .ins-quote-panel { display: flex; flex-direction: column; gap: 20px; }
  .ins-img-wrap {
    position: relative;
    overflow: hidden;
    border: 1px solid #2a2520;
  }
  .ins-img-wrap img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: grayscale(0.3) contrast(1.1);
    transition: transform 8s ease;
  }
  .ins-img-wrap:hover img { transform: scale(1.04); }
  .ins-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(6,5,5,0.85) 0%, transparent 50%);
  }
  .ins-img-caption {
    position: absolute;
    bottom: 10px;
    left: 12px;
    font-size: 9px;
    letter-spacing: .2em;
    color: var(--cream);
    opacity: .7;
  }
  .ins-cycling-quote {
    font-family: 'Special Elite', serif;
    font-size: 14px;
    line-height: 1.65;
    color: var(--ash);
    border-left: 3px solid var(--red);
    padding: 10px 14px;
    background: rgba(200,35,42,.04);
    transition: opacity .8s;
    min-height: 80px;
  }
  .ins-mq {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--red);
    line-height: 1;
    vertical-align: -4px;
    margin: 0 2px;
  }
  .ins-qt { font-style: italic; }

  /* ── Log ── */
  .ins-log { display: flex; flex-direction: column; gap: 0; }
  .ins-log-head {
    font-size: 10px;
    letter-spacing: .2em;
    color: var(--ash);
    border-bottom: 1px solid #2a2520;
    padding-bottom: 12px;
    margin-bottom: 0;
  }
  .ins-entry {
    display: grid;
    grid-template-columns: 68px 1fr;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid #141210;
    transition: opacity .6s, background .3s;
  }
  .ins-entry-active { background: rgba(200,35,42,.05); }
  .ins-h {
    font-size: 10px;
    color: var(--red);
    letter-spacing: .14em;
    padding-top: 2px;
    flex-shrink: 0;
  }
  .ins-text {
    font-family: 'Special Elite', serif;
    font-size: 13px;
    line-height: 1.62;
    color: var(--cream);
    transition: filter 2s;
  }

  /* ── Footer ── */
  .ins-footer {
    position: relative;
    z-index: 1;
    font-family: 'Special Elite', serif;
    font-size: 13px;
    color: #3a352c;
    text-align: center;
    letter-spacing: .04em;
    padding: 0 var(--gutter) 60px;
    border-top: 1px solid #141210;
    padding-top: 24px;
  }
</style>
