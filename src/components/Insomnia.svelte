<script>
  import { onMount } from 'svelte';
  import { INSOMNIA_LOG, INSOMNIA_QUOTES } from '../data.js';

  // Real-time sleepless hours counter since a fixed epoch (Tyler's plane flight).
  // As hours grow, text degrades visually — blur, desaturation, drift.
  const EPOCH = new Date('1999-10-14T03:00:00').getTime();

  let hoursAwake = $state(0);
  let quoteIdx = $state(0);
  let activeLog = $state(0);

  onMount(() => {
    // Tick every second for the display counter (modulo a fictional max)
    const tick = setInterval(() => {
      const elapsed = (Date.now() - EPOCH) / 3600000;
      // Loop through the log entries dramatically
      hoursAwake = elapsed % 200;
      activeLog = Math.min(INSOMNIA_LOG.length - 1, Math.floor((hoursAwake / 200) * INSOMNIA_LOG.length));
    }, 1000);

    // Cycle quotes
    const qCycle = setInterval(() => {
      quoteIdx = (quoteIdx + 1) % INSOMNIA_QUOTES.length;
    }, 5000);

    return () => { clearInterval(tick); clearInterval(qCycle); };
  });

  // Degradation increases with hours — affects visuals
  const degradation = $derived(Math.min(1, hoursAwake / 180));
  const blurAmt = $derived((degradation * 1.8).toFixed(2));
  const skewAmt = $derived((degradation * 3).toFixed(2));
</script>

<section class="insomnia sec" id="insomnia">
  <span class="eyebrow rev">// sleep deprivation log · onset unknown</span>
  <h2 class="disp rev" style="font-size:clamp(30px,6vw,68px);margin:0 0 4px;line-height:.86">
    When Did You Last Sleep?
  </h2>

  <div class="ins-grid rev">
    <!-- Counter column -->
    <div class="ins-counter">
      <div class="ins-label mono">HOURS WITHOUT SLEEP</div>
      <div
        class="ins-num"
        style="filter:blur({blurAmt}px);transform:skewX({skewAmt}deg);transition:filter 2s,transform 2s"
      >
        {Math.floor(hoursAwake).toString().padStart(3, '0')}
        <span class="ins-unit">h</span>
      </div>
      <div class="ins-quote mono" style="opacity:{0.5 + degradation * 0.5}">
        &ldquo;{INSOMNIA_QUOTES[quoteIdx]}&rdquo;
      </div>
      <div class="ins-bar">
        <div class="ins-bar-fill" style="width:{Math.min(100, hoursAwake / 2)}%"></div>
      </div>
      <div class="ins-bar-label mono">
        {#if hoursAwake < 48}
          FUNCTIONAL — BARELY
        {:else if hoursAwake < 96}
          HALLUCINATING — PROBABLY
        {:else if hoursAwake < 144}
          DISSOCIATING — CONFIRMED
        {:else}
          TYLER IS HERE
        {/if}
      </div>
    </div>

    <!-- Log column -->
    <div class="ins-log">
      <div class="ins-log-head mono">▌ FIELD LOG — REDACTED OPERATIVE</div>
      {#each INSOMNIA_LOG as entry, i (i)}
        <div class="ins-entry" class:ins-entry-active={i === activeLog} style="opacity:{i <= activeLog ? 1 : 0.2}">
          <span class="ins-h mono">{entry.h}</span>
          <span
            class="ins-text"
            style="filter:blur({i > activeLog ? 0 : Math.max(0, (i / INSOMNIA_LOG.length) * parseFloat(blurAmt))}px)"
          >{entry.entry}</span>
        </div>
      {/each}
    </div>
  </div>

  <p class="ins-footer rev mono">
    &ldquo;When you have insomnia, you&rsquo;re never really asleep, and you&rsquo;re never really awake.&rdquo;
  </p>
</section>

<style>
  .insomnia {
    background: var(--bg);
    border-top: 1px solid var(--ash-dim, #2a2520);
    padding: 80px var(--gutter) 60px;
  }
  .ins-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 40px;
    margin-top: 40px;
  }
  @media (max-width: 700px) { .ins-grid { grid-template-columns: 1fr; } }

  .ins-counter {
    border: 1px solid var(--ash-dim, #2a2520);
    padding: 28px 24px;
    background: rgba(10,10,11,.6);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ins-label { font-size: 10px; letter-spacing: .22em; color: var(--ash); }
  .ins-num {
    font-family: 'Anton', impact, sans-serif;
    font-size: clamp(72px, 14vw, 140px);
    line-height: 1;
    color: var(--cream);
    letter-spacing: -.02em;
  }
  .ins-unit { font-size: .32em; vertical-align: super; color: var(--red); }
  .ins-quote {
    font-family: 'Special Elite', serif;
    font-size: 12px;
    color: var(--ash);
    line-height: 1.6;
    border-left: 2px solid var(--red);
    padding-left: 10px;
    min-height: 2.5em;
    transition: opacity .8s;
  }
  .ins-bar {
    height: 3px;
    background: #1a1714;
    margin-top: 4px;
    position: relative;
    overflow: hidden;
  }
  .ins-bar-fill {
    height: 100%;
    background: var(--red);
    transition: width 2s linear;
    position: relative;
  }
  .ins-bar-fill::after {
    content: '';
    position: absolute;
    right: 0; top: -2px;
    width: 3px; height: 7px;
    background: #fff;
    filter: blur(1px);
  }
  .ins-bar-label { font-size: 9px; letter-spacing: .2em; color: var(--red); }

  .ins-log {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .ins-log-head {
    font-size: 10px;
    letter-spacing: .2em;
    color: var(--ash);
    border-bottom: 1px solid #2a2520;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .ins-entry {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #1a1714;
    transition: opacity .6s;
  }
  .ins-entry-active { background: rgba(200,35,42,.04); }
  .ins-h {
    font-size: 11px;
    color: var(--red);
    letter-spacing: .12em;
    padding-top: 2px;
    flex-shrink: 0;
  }
  .ins-text {
    font-family: 'Special Elite', serif;
    font-size: 13px;
    line-height: 1.6;
    color: var(--cream);
    transition: filter 2s;
  }
  .ins-footer {
    margin-top: 40px;
    font-family: 'Special Elite', serif;
    font-size: 14px;
    color: var(--ash);
    text-align: center;
    letter-spacing: .04em;
  }
</style>
