<script>
  // "Copy of a copy of a copy" — a degraded CRT portrait beside a cascade of
  // text that blurs/skews/desaturates with each generation.
  const lines = Array.from({ length: 10 }, (_, i) => {
    const t = i / 9;
    return {
      style: [
        `font-family:'Special Elite',monospace`,
        `text-transform:uppercase`,
        `color:#ece7da`,
        `margin:7px 0`,
        `opacity:${1 - t * 0.82}`,
        `filter:blur(${t * 2.4}px)`,
        `font-size:clamp(13px,${2.4 - t * 0.5}vw,${24 - t * 7}px)`,
        `transform:skewX(${(t * 7).toFixed(2)}deg) translateX(${Math.sin(i) * t * 20}px)`,
        `letter-spacing:${0.26 + t * 0.25}em`,
        `text-shadow:${(t * 2).toFixed(1)}px 0 0 rgba(200,35,42,${t * 0.4}),-${(t * 2).toFixed(1)}px 0 0 rgba(124,198,188,${t * 0.4})`,
        `animation:copyflk ${4 + i * 0.5}s steps(1) ${i * 0.2}s infinite`,
      ].join(';'),
    };
  });
</script>

<section class="copy sec" id="copy">
  <span class="eyebrow ash rev" style="text-align:center;display:block">// VHS generation loss</span>
  <div class="copy-head rev">EVERYTHING IS A COPY OF A COPY OF A COPY</div>
  <div class="copy-grid" style="margin-top:40px">
    <div class="crt rev">
      <div class="crt-screen">
        <img src="img/tyler-ascii.jpg" alt="Degraded portrait of Tyler on a CRT screen" loading="lazy" />
      <div class="crt-bulge"></div>
        <div class="crt-osd"><span class="rec">● REC</span> · CH 03 · SP · TRACKING</div>
      </div>
      <div class="crt-base"><div class="crt-brand">PAPER ST · TV</div><div class="crt-knobs"><i></i><i></i></div></div>
    </div>
    <div>
      {#each lines as l, i (i)}
        <div style={l.style}>OF A COPY</div>
      {/each}
    </div>
  </div>
</section>
