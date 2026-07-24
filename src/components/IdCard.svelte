<script>
  // The real movie ID card prop on the front; Project Mayhem record on the back.
  // Mouse tilts it; click flips it.
  let stage, card, glare;
  let raf = 0;
  let flipped = $state(false);

  function onMove(e) {
    if (flipped || window.matchMedia('(hover:none)').matches) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (!card) return;
      card.style.transition = 'transform .14s ease-out';
      card.style.transform = `rotateX(${(0.5 - py) * 18}deg) rotateY(${(px - 0.5) * 24}deg)`;
      glare.style.background = `radial-gradient(380px circle at ${px * 100}% ${py * 100}%,rgba(255,255,255,.4),transparent 60%)`;
    });
  }

  function onLeave() {
    if (flipped || !card) return;
    card.style.transform = 'rotateX(0) rotateY(0)';
    glare.style.background = 'transparent';
  }

  function onClick() {
    const next = !flipped;
    flipped = next;
    if (!card) return;
    card.style.transition = 'transform .6s ease';
    card.style.transform = next ? 'rotateY(180deg)' : 'rotateX(0) rotateY(0)';
  }
</script>

<section class="identity sec" id="identity">
  <span class="eyebrow rev" style="text-align:center">// identity card · the criterion collection · 1999</span>
  <h2 class="disp rev" style="font-size:clamp(34px,7vw,80px);margin:0 0 8px;line-height:.86;text-align:center">You Are Not Special</h2>
  <p class="rev mono" style="color:var(--ash);letter-spacing:.16em;font-size:12px;text-align:center;max-width:480px;margin:0 auto 34px">
    Issued to a man who does not exist. DURDEN, TYLER · FC111793036.
  </p>
  <div class="card-stage rev" bind:this={stage} onmousemove={onMove} onmouseleave={onLeave} onclick={onClick} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && onClick()}>
    <div class="card-3d" bind:this={card}>
      <div class="card-face cf">
        <img src="img/id-card.jpg" alt="Tyler Durden Fight Club ID card" />
        <div class="cf-glare" bind:this={glare}></div>
      </div>
      <div class="card-face cb">
        <div class="cb-stripe"></div>
        <div class="cb-cnt">
          <h4>PROPERTY OF PROJECT MAYHEM</h4>
          <p>This card certifies the bearer surrendered name, history and fear upon induction. The bearer is now a space monkey. The bearer does not exist.</p>
          <p>537 Paper Street · Bradford<br /><em>You met me at a very strange time in my life.</em></p>
          <div class="barcode">
            {#each Array.from({ length: 46 }, (_, i) => i) as i (i)}
              <i style="width:{((i * 37) % 5) + 1}px"></i>
            {/each}
          </div>
          <div class="barcode-txt">FC 14793036 · AUTH ████ · THUMB ON FILE</div>
        </div>
        <div class="cb-thumb">
          <svg viewBox="0 0 60 78" width="60" height="78" style="position:absolute;inset:0;opacity:0.28">
            <ellipse cx="30" cy="39" rx="24" ry="22" fill="none" stroke="#0c3b35" stroke-width=".9" />
            <ellipse cx="30" cy="39" rx="18" ry="17" fill="none" stroke="#0c3b35" stroke-width=".9" />
            <ellipse cx="30" cy="39" rx="12" ry="12" fill="none" stroke="#0c3b35" stroke-width=".9" />
            <ellipse cx="30" cy="39" rx="7" ry="7" fill="none" stroke="#0c3b35" stroke-width=".9" />
            <ellipse cx="30" cy="39" rx="3" ry="3" fill="none" stroke="#0c3b35" stroke-width=".9" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <p class="card-hint">› drag to tilt · click to flip ‹</p>
</section>
