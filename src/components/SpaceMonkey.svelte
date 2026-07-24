<script>
  import { getContext } from 'svelte';
  import { OATH_LINES } from '../data.js';

  const fx = getContext('fx');

  let checked = $state(new Set());
  let inducted = $state(false);

  function toggle(id) {
    const next = new Set(checked);
    if (next.has(id)) { next.delete(id); }
    else {
      next.add(id);
      fx.flash('MAYHEM');
      if (next.size === 1) fx.triggerGlitch();
    }
    checked = next;
    if (next.size === OATH_LINES.length) {
      setTimeout(() => { inducted = true; fx.triggerGlitch(); fx.flash('WAKE UP'); }, 400);
    } else {
      inducted = false;
    }
  }

  const progress = $derived(Math.round((checked.size / OATH_LINES.length) * 100));
</script>

<section class="monkey sec" id="monkey">
  <span class="eyebrow gold rev">// project mayhem · induction ceremony · 537 paper street</span>
  <div class="monkey-header rev">
    <div>
      <h2 class="disp" style="font-size:clamp(30px,6vw,72px);margin:0 0 6px;line-height:.86">
        Become a Space Monkey
      </h2>
      <p class="monkey-sub mono">YOU WILL GIVE UP YOUR NAME. YOU WILL GIVE UP YOUR HISTORY. YOU WILL GIVE UP YOUR FEAR.</p>
    </div>
    <div class="monkey-badge" class:monkey-badge-done={inducted}>
      <div class="mb-inner">
        <div class="mb-pct mono">{progress}<span>%</span></div>
        <div class="mb-label mono">{inducted ? 'INDUCTED' : 'SURRENDERED'}</div>
      </div>
    </div>
  </div>

  <div class="oath-list rev">
    {#each OATH_LINES as line, i (line.id)}
      <button
        class="oath-item"
        class:oath-checked={checked.has(line.id)}
        onclick={() => toggle(line.id)}
        style="transition-delay:{i * 40}ms"
      >
        <span class="oath-num mono">{String(i + 1).padStart(2, '0')}</span>
        <span class="oath-box" aria-hidden="true">
          {#if checked.has(line.id)}✕{:else}☐{/if}
        </span>
        <span class="oath-text">{line.text}</span>
      </button>
    {/each}
  </div>

  <div class="oath-progress-bar">
    <div class="oath-progress-fill" style="width:{progress}%"></div>
  </div>

  {#if inducted}
    <div class="oath-complete rev">
      <div class="oc-head mono">▌ INDUCTION CONFIRMED</div>
      <div class="oc-body">
        <p>You have no name. You are a space monkey.</p>
        <p>If you are ever arrested, your name is <strong>Robert Paulson</strong>.</p>
        <p class="mono" style="font-size:11px;letter-spacing:.2em;color:var(--red);margin-top:16px">
          HIS NAME IS ROBERT PAULSON.
        </p>
      </div>
    </div>
  {/if}
</section>

<style>
  .monkey { padding:80px var(--gutter); background:var(--bg); border-top:1px solid #1e1b17; }
  .monkey-header { display:flex; justify-content:space-between; align-items:flex-start; gap:24px; margin:16px 0 40px; flex-wrap:wrap; }
  .monkey-sub { font-size:10px; letter-spacing:.18em; color:var(--ash); margin:8px 0 0; max-width:520px; line-height:1.6; }

  .monkey-badge {
    border:2px solid #2a2520;
    padding:20px 28px;
    text-align:center;
    flex-shrink:0;
    transition: border-color .4s, background .4s;
    background: rgba(10,10,11,.6);
  }
  .monkey-badge-done { border-color:var(--red); background:rgba(200,35,42,.08); }
  .mb-pct { font-family:'Anton',impact,sans-serif; font-size:52px; line-height:1; color:var(--cream); }
  .mb-pct span { font-size:.4em; vertical-align:super; color:var(--red); }
  .mb-label { font-size:9px; letter-spacing:.22em; color:var(--ash); margin-top:4px; }

  .oath-list { display:flex; flex-direction:column; gap:0; }
  .oath-item {
    display:grid;
    grid-template-columns:40px 32px 1fr;
    align-items:center;
    gap:12px;
    padding:16px 12px;
    border:none;
    border-bottom:1px solid #1a1714;
    background:transparent;
    cursor:pointer;
    text-align:left;
    transition:background .2s;
    width:100%;
  }
  .oath-item:hover { background:rgba(200,35,42,.04); }
  .oath-checked { background:rgba(200,35,42,.06) !important; }
  .oath-checked .oath-text { text-decoration:line-through; color:var(--ash); }
  .oath-checked .oath-box { color:var(--red); }
  .oath-num { font-size:11px; color:var(--ash); letter-spacing:.16em; }
  .oath-box { font-size:20px; color:#3a352c; transition:color .2s; }
  .oath-text { font-family:'Oswald',sans-serif; font-size:clamp(13px,2vw,16px); letter-spacing:.1em; color:var(--cream); transition:color .3s,text-decoration .3s; }

  .oath-progress-bar { height:3px; background:#1a1714; margin-top:2px; }
  .oath-progress-fill { height:100%; background:var(--red); transition:width .4s; }

  .oath-complete {
    margin-top:32px;
    border:1px solid var(--red);
    background:rgba(200,35,42,.06);
    padding:24px 28px;
    animation:fadeIn .5s ease;
  }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .oc-head { font-size:11px; letter-spacing:.22em; color:var(--red); margin-bottom:16px; }
  .oc-body p { font-family:'Special Elite',serif; font-size:14px; color:var(--cream); line-height:1.7; margin:0 0 8px; }
  .oc-body strong { color:var(--red); }
</style>
