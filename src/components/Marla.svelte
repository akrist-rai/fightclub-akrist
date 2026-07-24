<script>
  import { onMount } from 'svelte';
  import { MARLA_QUOTES, MARLA_LINES } from '../data.js';

  let shown = $state('');
  let quoteIdx = $state(0);
  let imgLoaded = $state(false);

  onMount(() => {
    let alive = true;
    let timer = 0;

    function typeLine(line, cb) {
      let i = 0;
      shown = '';
      const t = setInterval(() => {
        if (!alive) { clearInterval(t); return; }
        i++;
        shown = line.slice(0, i);
        if (i >= line.length) { clearInterval(t); timer = setTimeout(cb, 3200); }
      }, 36);
    }

    function eraseLine(cb) {
      const t = setInterval(() => {
        if (!alive) { clearInterval(t); return; }
        if (shown.length <= 0) { clearInterval(t); cb(); return; }
        shown = shown.slice(0, -1);
      }, 16);
    }

    function cycle() {
      if (!alive) return;
      typeLine(MARLA_QUOTES[quoteIdx], () => {
        eraseLine(() => {
          quoteIdx = (quoteIdx + 1) % MARLA_QUOTES.length;
          timer = setTimeout(cycle, 400);
        });
      });
    }

    cycle();
    return () => { alive = false; clearTimeout(timer); };
  });
</script>

<section class="marla sec" id="marla">
  <!-- Cinematic full-bleed bg image -->
  <div class="marla-scene">
    <img class="marla-scene-img" src="img/yesterday-tomorrow.jpg" alt="" aria-hidden="true" />
    <div class="marla-scene-grad"></div>
  </div>

  <!-- Giant ghost watermark -->
  <div class="marla-ghost" aria-hidden="true">MARLA</div>

  <div class="marla-inner">
    <!-- Left: identity file -->
    <div class="marla-left rev">
      <span class="eyebrow">//&nbsp;the tourist · the infiltrator · the only honest one</span>
      <h2 class="marla-title">Marla<br/>Singer</h2>
      <p class="marla-verdict mono">SHE RUINED EVERYTHING. OR SAVED IT. SAME THING.</p>

      <div class="marla-quote-wrap">
        <div class="marla-quote-inner">
          <span class="mq">&ldquo;</span>
          <span class="marla-typed">{shown}<span class="mc">&nbsp;</span></span>
          <span class="mq">&rdquo;</span>
        </div>
      </div>

      <div class="marla-dossier">
        <div class="marla-dossier-head mono">// SUBJECT DOSSIER · CASE FC-0032</div>
        {#each MARLA_LINES as line (line.label)}
          <div class="marla-row">
            <span class="marla-k mono">{line.label}</span>
            <span class="marla-v">{line.val}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right: dual image panel + essay -->
    <div class="marla-right rev">
      <!-- Primary cinematic image panel -->
      <div class="marla-img-grid">
        <div class="marla-img-primary">
          <img src="img/yesterday-tomorrow.jpg" alt="Yesterday you said tomorrow — Tyler and the Narrator" />
          <div class="marla-img-gloss"></div>
          <div class="marla-img-label mono">
            <span class="mil-tag">↗ LAST KNOWN CONTACT</span>
            <span class="mil-date">BRADFORD · 1999</span>
          </div>
        </div>
        <div class="marla-img-secondary">
          <img src="img/we-dont-talk.jpg" alt="We don't talk about that" />
          <div class="marla-img-gloss"></div>
          <div class="marla-img-label mono">
            <span class="mil-tag">↗ SURVEILLANCE</span>
          </div>
        </div>
      </div>

      <!-- Narrative block -->
      <div class="marla-note">
        <p>She was a liar. She went to groups for the free coffee and the sympathy. Like me. Her lie reflected my lie. Suddenly I felt nothing — I couldn&rsquo;t cry, so once again, I couldn&rsquo;t sleep.</p>
        <p>She was the most beautiful and terrifying thing I had ever seen. Chaos with good cheekbones. She knew which Tyler was real. She chose anyway.</p>
        <div class="marla-stamp mono">CASE FILE · SINGER, M. · REF FC-0032 · STATUS: UNRESOLVED</div>
      </div>
    </div>
  </div>
</section>

<style>
  .marla {
    position: relative;
    overflow: hidden;
    padding: 90px var(--gutter) 80px;
    background: var(--bg);
    border-top: 1px solid #1a1714;
  }

  /* ── Cinematic backdrop ── */
  .marla-scene {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .marla-scene-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    opacity: 0.07;
    filter: grayscale(1) contrast(1.4);
  }
  .marla-scene-grad {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(11,9,8,0.96) 0%, rgba(11,9,8,0.7) 60%, rgba(11,9,8,0.92) 100%);
  }

  /* ── Ghost watermark ── */
  .marla-ghost {
    position: absolute;
    top: 50%; right: -40px;
    transform: translateY(-50%);
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(180px, 34vw, 480px);
    color: rgba(200,35,42,.025);
    pointer-events: none;
    user-select: none;
    letter-spacing: -.06em;
    white-space: nowrap;
    z-index: 0;
  }

  /* ── Layout grid ── */
  .marla-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 70px;
    align-items: start;
  }
  @media (max-width: 860px) { .marla-inner { grid-template-columns: 1fr; gap: 48px; } }

  /* ── Left ── */
  .marla-title {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(52px, 11vw, 130px);
    line-height: 0.84;
    color: var(--cream);
    letter-spacing: -.02em;
    margin: 10px 0 16px;
  }
  .marla-verdict {
    font-size: 9px;
    letter-spacing: .22em;
    color: var(--red);
    margin: 0 0 28px;
  }

  /* Quote typewriter */
  .marla-quote-wrap {
    margin-bottom: 32px;
    min-height: 72px;
    border-left: 3px solid var(--red);
    padding-left: 16px;
  }
  .marla-quote-inner {
    display: flex;
    align-items: flex-start;
    gap: 4px;
  }
  .mq {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    color: var(--red);
    line-height: 1;
    flex-shrink: 0;
    margin-top: -4px;
  }
  .marla-typed {
    font-family: 'Special Elite', serif;
    font-size: clamp(14px, 2.2vw, 17px);
    line-height: 1.6;
    color: var(--cream);
    padding-top: 6px;
  }
  .mc { display: inline-block; width: 2px; background: var(--red); animation: blink .7s steps(1) infinite; }
  @keyframes blink { 50% { opacity: 0; } }

  /* Dossier table */
  .marla-dossier { border: 1px solid #2a2520; }
  .marla-dossier-head {
    font-size: 9px;
    letter-spacing: .2em;
    color: var(--ash);
    padding: 10px 14px;
    border-bottom: 1px solid #2a2520;
    background: rgba(200,35,42,.03);
  }
  .marla-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    border-bottom: 1px solid #1a1714;
    padding: 10px 14px;
    transition: background .2s;
  }
  .marla-row:last-child { border-bottom: none; }
  .marla-row:hover { background: rgba(200,35,42,.04); }
  .marla-k { font-size: 9px; letter-spacing: .2em; color: var(--ash); padding-top: 2px; }
  .marla-v { font-family: 'Special Elite', serif; font-size: 12px; color: var(--cream); line-height: 1.5; }

  /* ── Right ── */
  .marla-img-grid {
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 8px;
    margin-bottom: 24px;
  }
  .marla-img-primary, .marla-img-secondary {
    position: relative;
    overflow: hidden;
    background: #0d0b09;
  }
  .marla-img-primary img, .marla-img-secondary img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    filter: contrast(1.1) saturate(0.7);
    transition: transform 8s ease;
  }
  .marla-img-secondary img {
    height: 280px;
    filter: contrast(1.1) saturate(0.5) hue-rotate(160deg) brightness(0.85);
  }
  .marla-img-primary:hover img,
  .marla-img-secondary:hover img { transform: scale(1.06); }

  .marla-img-gloss {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(6,5,5,0.8) 0%, transparent 50%);
    pointer-events: none;
  }
  .marla-img-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .mil-tag { font-size: 8px; letter-spacing: .18em; color: rgba(236,231,218,.7); }
  .mil-date { font-size: 8px; letter-spacing: .14em; color: var(--red); opacity: .8; }

  /* Narrative */
  .marla-note {
    border-left: 3px solid var(--red);
    padding-left: 18px;
  }
  .marla-note p {
    font-family: 'Special Elite', serif;
    font-size: 13.5px;
    line-height: 1.72;
    color: var(--ash);
    margin: 0 0 14px;
  }
  .marla-stamp {
    font-size: 9px;
    letter-spacing: .18em;
    color: var(--red);
    opacity: .65;
    background: rgba(200,35,42,.06);
    border: 1px solid rgba(200,35,42,.18);
    display: inline-block;
    padding: 5px 12px;
    margin-top: 4px;
  }
</style>
