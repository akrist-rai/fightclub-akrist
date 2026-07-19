import { useEffect, useRef } from 'react';
import { useFx } from '../context/Fx.jsx';
import { BURN_STAGES, BURN_LABELS } from '../data.js';

// Press and hold the induction field: the lye record advances through stages
// and leaves a permanent mark. The visual stays deliberately abstract.
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
          <div className="burn-scene" aria-hidden="true">
            <div className="burn-mark mono">NaOH</div>
            <div className="burn-orbit o1" /><div className="burn-orbit o2" /><div className="burn-orbit o3" />
            <div className="burn-cross"><i /><i /></div>
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
