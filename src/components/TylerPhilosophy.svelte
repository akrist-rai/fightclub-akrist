<script>
  import { TYLER_PHILOSOPHY } from '../data.js';

  let active = $state(0);
</script>

<section class="tyler sec" id="tyler">
  <div class="tyler-bg-txt" aria-hidden="true">TYLER</div>

  <div class="tyler-inner">
    <div class="tyler-left rev">
      <span class="eyebrow ash">// durden, tyler · 1999 · b.f.a. soap rendering</span>
      <h2 class="disp" style="font-size:clamp(30px,6vw,72px);margin:8px 0 24px;line-height:.86">
        The Durden Doctrine
      </h2>
      <div class="tyler-tabs">
        {#each TYLER_PHILOSOPHY as p, i (p.heading)}
          <button
            class="tyler-tab"
            class:tyler-tab-on={active === i}
            onclick={() => { active = i; }}
          >
            <span class="tt-num mono">{String(i + 1).padStart(2, '0')}</span>
            {p.heading}
          </button>
        {/each}
      </div>
    </div>

    <div class="tyler-right rev">
      {#key active}
        <div class="tyler-quote-card">
          <div class="tqc-head mono">// {TYLER_PHILOSOPHY[active].heading.toUpperCase()}</div>
          <blockquote class="tqc-quote">
            &ldquo;{TYLER_PHILOSOPHY[active].quote}&rdquo;
          </blockquote>
          <div class="tqc-attr mono">— TYLER DURDEN · 1999</div>
          <div class="tqc-bar"></div>
        </div>
      {/key}

      <div class="tyler-counter mono">
        <span>{active + 1}</span> / <span>{TYLER_PHILOSOPHY.length}</span>
      </div>
    </div>
  </div>
</section>

<style>
  .tyler { position:relative; overflow:hidden; padding:80px var(--gutter); background:var(--bg); border-top:1px solid #1e1b17; }
  .tyler-bg-txt { position:absolute; top:50%; right:-80px; transform:translateY(-50%); font-family:'Anton',impact,sans-serif; font-size:clamp(200px,40vw,600px); color:rgba(200,35,42,.025); pointer-events:none; user-select:none; letter-spacing:-.06em; }
  .tyler-inner { position:relative; display:grid; grid-template-columns:280px 1fr; gap:50px; align-items:start; }
  @media(max-width:760px){ .tyler-inner{grid-template-columns:1fr} }

  .tyler-tabs { display:flex; flex-direction:column; gap:0; }
  .tyler-tab {
    display:flex; align-items:center; gap:12px;
    padding:12px 14px;
    background:transparent; border:none; border-left:2px solid transparent;
    cursor:pointer; text-align:left;
    font-family:'Oswald',sans-serif; font-size:13px; letter-spacing:.1em; color:var(--ash);
    transition:color .2s,border-color .2s,background .2s;
  }
  .tyler-tab:hover { color:var(--cream); background:rgba(200,35,42,.04); }
  .tyler-tab-on { border-left-color:var(--red); color:var(--cream); background:rgba(200,35,42,.06); }
  .tt-num { font-size:10px; letter-spacing:.18em; color:var(--red); width:24px; flex-shrink:0; }

  .tyler-quote-card {
    border:1px solid #2a2520;
    padding:36px 36px 28px;
    background:rgba(10,10,11,.7);
    animation:fadeSlide .3s ease;
    position:relative;
    overflow:hidden;
  }
  @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
  .tyler-quote-card::before {
    content:'';
    position:absolute; top:0; left:0;
    width:3px; height:100%;
    background:var(--red);
  }
  .tqc-head { font-size:10px; letter-spacing:.22em; color:var(--red); margin-bottom:20px; }
  .tqc-quote {
    font-family:'Playfair Display',serif;
    font-style:italic;
    font-size:clamp(15px,2.2vw,20px);
    line-height:1.65;
    color:var(--cream);
    margin:0 0 24px;
    padding:0;
    border:none;
  }
  .tqc-attr { font-size:10px; letter-spacing:.18em; color:var(--ash); }
  .tqc-bar { height:2px; background:linear-gradient(to right,var(--red),transparent); margin-top:20px; }

  .tyler-counter { font-size:11px; letter-spacing:.18em; color:var(--ash); margin-top:16px; text-align:right; }
  .tyler-counter span { color:var(--cream); }
</style>
