<script>
  import { onMount } from 'svelte';
  import { MARLA_QUOTES, MARLA_LINES } from '../data.js';

  let shown = $state('');
  let quoteIdx = $state(0);

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
        if (i >= line.length) { clearInterval(t); timer = setTimeout(cb, 2800); }
      }, 36);
    }

    function eraseLine(cb) {
      const t = setInterval(() => {
        if (!alive) { clearInterval(t); return; }
        if (shown.length <= 0) { clearInterval(t); cb(); return; }
        shown = shown.slice(0, -1);
      }, 18);
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
  <div class="marla-bg-text" aria-hidden="true">MARLA</div>
  <div class="marla-inner">
    <div class="marla-left rev">
      <span class="eyebrow">// the tourist · the infiltrator · the only honest one</span>
      <h2 class="disp" style="font-size:clamp(36px,8vw,96px);margin:8px 0;line-height:.86">Marla Singer</h2>
      <p class="marla-sub mono">SHE RUINED EVERYTHING. OR SAVED IT. SAME THING.</p>

      <div class="marla-quote-wrap">
        <span class="mq">&ldquo;</span>
        <span class="marla-typed">{shown}<span class="mc">&nbsp;</span></span>
        <span class="mq">&rdquo;</span>
      </div>

      <div class="marla-dossier">
        {#each MARLA_LINES as line (line.label)}
          <div class="marla-row">
            <span class="marla-k mono">{line.label}</span>
            <span class="marla-v">{line.val}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="marla-right rev">
      <div class="marla-frame-wrap">
        <div class="marla-frame">
          <div class="marla-center-text">
            <div class="mct-a mono">&ldquo;I AM JACK&rsquo;S</div>
            <div class="mct-b">COMPLETE SENSE</div>
            <div class="mct-c red">OF DENIAL&rdquo;</div>
          </div>
        </div>
        <div class="marla-caption mono">MARLA SINGER · LAST KNOWN · BRADFORD</div>
      </div>

      <div class="marla-note">
        <p>She was a liar. She went to groups for the free coffee and the sympathy. Like me. Her lie reflected my lie. Suddenly I felt nothing — I couldn&rsquo;t cry, so once again, I couldn&rsquo;t sleep.</p>
        <p>She was the most beautiful and terrifying thing I had ever seen. She was chaos with good cheekbones. She knew which Tyler was real. She chose anyway.</p>
        <div class="marla-stamp mono">CASE FILE · SINGER, M. · REF FC-0032</div>
      </div>
    </div>
  </div>
</section>

<style>
  .marla { position:relative; overflow:hidden; padding:80px var(--gutter); background:var(--bg); border-top:1px solid #1e1b17; }
  .marla-bg-text { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Anton',impact,sans-serif; font-size:clamp(160px,30vw,400px); color:rgba(200,35,42,.03); pointer-events:none; user-select:none; letter-spacing:-.04em; white-space:nowrap; }
  .marla-inner { position:relative; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
  @media(max-width:800px){.marla-inner{grid-template-columns:1fr}}
  .marla-sub { font-size:10px; letter-spacing:.22em; color:var(--red); margin:0 0 32px; }
  .marla-quote-wrap { min-height:80px; display:flex; align-items:flex-start; gap:4px; margin-bottom:28px; }
  .mq { font-family:'Playfair Display',serif; font-size:40px; color:var(--red); line-height:1; flex-shrink:0; }
  .marla-typed { font-family:'Special Elite',serif; font-size:clamp(14px,2.2vw,18px); line-height:1.5; color:var(--cream); padding-top:8px; }
  .mc { display:inline-block; width:2px; background:var(--red); animation:blink .7s steps(1) infinite; }
  @keyframes blink { 50%{opacity:0} }
  .marla-dossier { border:1px solid #2a2520; }
  .marla-row { display:grid; grid-template-columns:120px 1fr; border-bottom:1px solid #1e1b17; padding:10px 14px; }
  .marla-row:last-child { border-bottom:none; }
  .marla-k { font-size:9px; letter-spacing:.2em; color:var(--ash); padding-top:2px; }
  .marla-v { font-family:'Special Elite',serif; font-size:12px; color:var(--cream); line-height:1.5; }
  .marla-frame-wrap { border:8px solid #ece7da; background:#0d0b09; box-shadow:0 20px 60px rgba(0,0,0,.6); transform:rotate(-1.5deg); margin-bottom:24px; }
  .marla-frame { height:280px; display:flex; align-items:center; justify-content:center; background:radial-gradient(ellipse at center,#1a1210 0%,#0a0a0b 70%); }
  .marla-center-text { text-align:center; padding:20px; }
  .mct-a { font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:.3em; color:var(--ash); margin-bottom:6px; }
  .mct-b { font-family:'Anton',impact,sans-serif; font-size:clamp(24px,5vw,40px); color:var(--cream); line-height:1; }
  .mct-c { font-family:'Playfair Display',serif; font-style:italic; font-size:clamp(18px,3.5vw,28px); margin-top:6px; }
  .marla-caption { background:#ece7da; color:#3a352c; font-size:9px; letter-spacing:.18em; padding:8px 12px; text-align:center; }
  .marla-note { border-left:3px solid var(--red); padding-left:16px; margin-top:4px; }
  .marla-note p { font-family:'Special Elite',serif; font-size:13px; line-height:1.7; color:var(--ash); margin:0 0 12px; }
  .marla-stamp { font-size:9px; letter-spacing:.2em; color:#3a352c; background:rgba(200,35,42,.1); border:1px solid rgba(200,35,42,.2); display:inline-block; padding:4px 10px; margin-top:8px; }
</style>
