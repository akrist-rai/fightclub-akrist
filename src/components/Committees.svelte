<script>
  import { COMMITTEES, CITIES, UNDERGROUND_RULES } from '../data.js';

  let expanded = $state(null);

  function toggle(code) {
    expanded = expanded === code ? null : code;
  }

  function statusColor(s) {
    if (s === 'ACTIVE' || s === 'EXPANDING') return 'var(--red)';
    if (s === 'FOUNDED') return '#7cc6bc';
    if (s === 'COMPROMISED') return '#c8a232';
    return 'var(--ash)';
  }
</script>

<section class="cmts sec" id="committees">
  <span class="eyebrow rev">// project mayhem · organizational structure · classified</span>
  <h2 class="disp rev" style="font-size:clamp(30px,6vw,72px);margin:0 0 6px;line-height:.86">
    The Five Committees
  </h2>
  <p class="rev type" style="color:var(--ash);font-size:13px;max-width:560px;line-height:1.7;margin:0 0 40px">
    Project Mayhem is organized into standing committees. Each operates independently.
    No committee knows the work of another. The fifth committee&rsquo;s name is not spoken.
  </p>

  <div class="cmts-grid rev">
    {#each COMMITTEES as c (c.code)}
      <div class="cmt-card" class:cmt-classified={c.code === 'PM-05'}>
        <button class="cmt-head" onclick={() => toggle(c.code)}>
          <span class="cmt-code mono">{c.code}</span>
          <span class="cmt-name">{c.name}</span>
          <span class="cmt-status mono" style="color:{statusColor(c.status)}">{c.status}</span>
          <span class="cmt-chevron mono">{expanded === c.code ? '−' : '+'}</span>
        </button>

        {#if expanded === c.code}
          <div class="cmt-body">
            <div class="cmt-row">
              <span class="ck mono">HEAD</span>
              <span class="cv">{c.head}</span>
            </div>
            <div class="cmt-row">
              <span class="ck mono">BRIEF</span>
              <span class="cv">{c.brief}</span>
            </div>
            <div class="cmt-row">
              <span class="ck mono">OPS</span>
              <ul class="cmt-ops">
                {#each c.ops as op (op)}
                  <li>{op}</li>
                {/each}
              </ul>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Underground spread -->
  <div class="spread rev" style="margin-top:60px">
    <div class="spread-head mono">▌ CONFIRMED CELLS — CITY REPORT</div>
    <div class="spread-rules">
      {#each UNDERGROUND_RULES as r, i (i)}
        <div class="spread-rule">
          <span class="sr-n mono">{String(i+1).padStart(2,'0')}</span>
          <span>{r}</span>
        </div>
      {/each}
    </div>
    <div class="city-grid">
      {#each CITIES as city (city.city)}
        <div class="city-row">
          <span class="city-name">{city.city}</span>
          <span class="city-state mono">{city.state}</span>
          <span class="city-clubs mono">{city.clubs} <span style="color:var(--ash)">clubs</span></span>
          <span class="city-status mono" style="color:{statusColor(city.status)}">{city.status}</span>
        </div>
      {/each}
    </div>
    <p class="spread-note mono">
      ALL FIELD REPORTS RECOVERED FROM 537 PAPER STREET. AUTHENTICITY UNVERIFIED. YOU ARE NOT SUPPOSED TO BE READING THIS.
    </p>
  </div>
</section>

<style>
  .cmts { padding:80px var(--gutter); background:var(--bg); border-top:1px solid #1e1b17; }
  .cmts-grid { display:flex; flex-direction:column; gap:0; border:1px solid #2a2520; }

  .cmt-card { border-bottom:1px solid #2a2520; }
  .cmt-card:last-child { border-bottom:none; }
  .cmt-classified { background:rgba(200,35,42,.03); }

  .cmt-head {
    width:100%;
    display:grid;
    grid-template-columns:72px 1fr 120px 24px;
    gap:12px;
    align-items:center;
    padding:16px 18px;
    background:transparent;
    border:none;
    cursor:pointer;
    text-align:left;
    transition:background .2s;
  }
  @media(max-width:600px){ .cmt-head{grid-template-columns:56px 1fr 80px 20px} }
  .cmt-head:hover { background:rgba(200,35,42,.04); }
  .cmt-code { font-size:10px; letter-spacing:.2em; color:var(--ash); }
  .cmt-name { font-family:'Oswald',sans-serif; font-size:clamp(14px,2.5vw,20px); letter-spacing:.12em; color:var(--cream); }
  .cmt-status { font-size:9px; letter-spacing:.2em; }
  .cmt-chevron { font-size:18px; color:var(--red); text-align:right; }

  .cmt-body {
    padding:0 18px 18px;
    display:flex;
    flex-direction:column;
    gap:0;
    animation:slideDown .25s ease;
  }
  @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
  .cmt-row { display:grid; grid-template-columns:64px 1fr; gap:12px; padding:8px 0; border-top:1px solid #1a1714; }
  .ck { font-size:9px; letter-spacing:.18em; color:var(--ash); padding-top:3px; }
  .cv { font-family:'Special Elite',serif; font-size:13px; color:var(--cream); line-height:1.6; }
  .cmt-ops { margin:0; padding:0 0 0 16px; }
  .cmt-ops li { font-family:'Special Elite',serif; font-size:12px; color:var(--cream); margin-bottom:4px; }

  /* Spread */
  .spread-head { font-size:10px; letter-spacing:.22em; color:var(--ash); border-bottom:1px solid #2a2520; padding-bottom:10px; margin-bottom:16px; }
  .spread-rules { display:flex; flex-direction:column; gap:0; margin-bottom:28px; }
  .spread-rule { display:flex; gap:16px; padding:10px 0; border-bottom:1px solid #1a1714; align-items:flex-start; }
  .sr-n { font-size:11px; color:var(--red); letter-spacing:.12em; flex-shrink:0; padding-top:2px; }
  .spread-rule span:last-child { font-family:'Special Elite',serif; font-size:13px; color:var(--cream); line-height:1.6; }

  .city-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:0; border:1px solid #2a2520; }
  .city-row { display:grid; grid-template-columns:1fr 32px 70px 110px; gap:8px; align-items:center; padding:10px 14px; border-bottom:1px solid #1a1714; }
  .city-row:last-child { border-bottom:none; }
  .city-name { font-family:'Oswald',sans-serif; font-size:14px; color:var(--cream); }
  .city-state { font-size:10px; color:var(--ash); letter-spacing:.14em; }
  .city-clubs { font-size:11px; color:var(--cream); }
  .city-status { font-size:9px; letter-spacing:.16em; }

  .spread-note { font-size:9px; letter-spacing:.16em; color:var(--ash); margin-top:20px; line-height:1.8; border-top:1px solid #1a1714; padding-top:12px; }
</style>
