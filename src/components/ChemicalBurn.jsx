import { useEffect, useRef } from 'react';
import { useFx } from '../context/Fx.jsx';
import { BURN_STAGES, BURN_LABELS } from '../data.js';

// Press & hold the hand: the lye burn grows, dialogue advances through the
// stages, a scar remains. Driven imperatively via refs + rAF (no per-frame
// re-render) to mirror the original feel.
export default function ChemicalBurn() {
  const fx = useFx();
  const spot = useRef(null), scar = useRef(null), fill = useRef(null),
    say = useRef(null), pct = useRef(null), stageV = useRef(null), txt = useRef(null);
  const st = useRef({ burning: false, lvl: 0, raf: 0, stage: 0, peaked: false, loop: null });

  useEffect(() => {
    const s = st.current;
    s.loop = function loop() {
      if (s.burning && s.lvl < 100) s.lvl = Math.min(100, s.lvl + 1.1);
      else if (!s.burning && s.lvl > 0) s.lvl = Math.max(0, s.lvl - 1.6);

      fill.current.style.width = s.lvl + '%';
      const sz = s.lvl * 1.5;
      spot.current.style.width = sz + 'px';
      spot.current.style.height = sz + 'px';
      spot.current.style.opacity = s.lvl > 2 ? Math.min(1, s.lvl / 40) : 0;
      pct.current.textContent = Math.round(s.lvl) + '%';
      txt.current.textContent = s.burning ? 'DO NOT PULL AWAY' : (s.lvl > 0 ? '…' : 'PRESS & HOLD');

      if (s.lvl >= 96) s.peaked = true;
      if (s.peaked) scar.current.classList.add('show');

      const ns = Math.min(BURN_STAGES.length - 1, Math.floor(s.lvl / 17));
      if (ns !== s.stage) {
        s.stage = ns;
        say.current.textContent = BURN_STAGES[ns];
        stageV.current.textContent = BURN_LABELS[ns];
        if (ns >= 2) fx.flash('PAIN');
      }
      if (s.lvl > 0 || s.burning) s.raf = requestAnimationFrame(s.loop);
      else cancelAnimationFrame(s.raf);
    };
    return () => cancelAnimationFrame(s.raf);
  }, [fx]);

  const start = (e) => { e.preventDefault(); const s = st.current; s.burning = true; cancelAnimationFrame(s.raf); s.loop(); };
  const stop = () => { st.current.burning = false; };

  useEffect(() => {
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => { window.removeEventListener('mouseup', stop); window.removeEventListener('touchend', stop); };
  }, []);

  return (
    <section className="burn sec" id="burn">
      <span className="eyebrow rev">// the lye kiss · 537 paper street · induction record</span>
      <h2 className="disp rev" style={{ fontSize: 'clamp(30px,6vw,68px)', margin: '0 0 6px', lineHeight: '.86' }}>Give Me Your Hand</h2>
      <div className="burn-grid rev">
        <div className="burn-cell" onMouseDown={start} onTouchStart={start} onMouseLeave={stop}>
          <div className="lbx t" /><div className="lbx b" />
          <div className="burn-scene">
            <svg viewBox="0 0 300 280" fill="none" aria-hidden="true">
              <path fill="currentColor" d="M70 270 C58 220 58 180 66 150 C58 120 70 96 84 100 C88 70 104 64 110 92 C112 60 130 56 134 90 C140 56 158 58 158 94 C166 66 184 70 180 104 C196 110 214 130 214 162 C214 210 206 244 196 270 Z" />
              <g stroke="#7a5d49" strokeWidth="2" opacity=".5" fill="none">
                <path d="M96 120 v40" /><path d="M122 110 v52" /><path d="M148 112 v50" /><path d="M172 124 v40" />
              </g>
            </svg>
            <svg className="burn-bottle" viewBox="0 0 60 104" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="23" y="4" width="14" height="10" />
              <path d="M19 14 h22 l4 18 v60 a5 5 0 0 1 -5 5 h-20 a5 5 0 0 1 -5 -5 v-60 z" />
              <rect x="17" y="40" width="26" height="36" fill="currentColor" opacity=".12" stroke="none" />
              <path d="M30 50 l0 12 m-6 -6 l12 0" strokeWidth="1.6" />
              <text x="30" y="92" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="currentColor" stroke="none" letterSpacing="1">LYE</text>
            </svg>
            <div className="burn-spot2" ref={spot} />
            <div className="burn-scar" ref={scar} />
          </div>
          <div className="burn-sub type" ref={say}>This is the greatest moment of your life.</div>
        </div>
        <div className="burn-form">
          <h4>Chemical Burn<br />Induction Record</h4>
          <div className="sub">PAPER STREET SOAP CO · NaOH · DO NOT RINSE · DO NOT PULL AWAY</div>
          <div className="burn-line"><span className="k">SUBJECT</span><span className="v">SPACE MONKEY</span></div>
          <div className="burn-line"><span className="k">SUBSTANCE</span><span className="v">LYE · NaOH</span></div>
          <div className="burn-line"><span className="k">STAGE</span><span className="v" ref={stageV}>— GUILT —</span></div>
          <div className="burn-line"><span className="k">SURRENDER</span><span className="v" ref={pct}>0%</span></div>
          <div className="burn-meter2"><i ref={fill} /><span ref={txt}>PRESS &amp; HOLD</span></div>
          <p className="burn-hint2">› press &amp; hold the hand · do not pull away ‹</p>
        </div>
      </div>
    </section>
  );
}
