import { useEffect, useRef, useState } from 'react';
import { useFx } from '../context/Fx.jsx';
import { END_QUOTES } from '../data.js';

// Detonator console: flip the safety to ARM, push the plunger, watch the
// countdown, then the skyline collapses (CSS) and the ending reveals.
export default function Demolition() {
  const fx = useFx();
  const [armed, setArmed] = useState(false);
  const [boomed, setBoomed] = useState(false);
  const [counting, setCounting] = useState(false);
  const [down, setDown] = useState(false);
  const [live, setLive] = useState(false);
  const [readout, setReadout] = useState('T—:——');
  const [q, setQ] = useState('You met me at a very strange time in my life.');
  const [qOn, setQOn] = useState(true);
  const [cap, setCap] = useState('');
  const timers = useRef([]);

  useEffect(() => {
    const up = () => setDown(false);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointerup', up); timers.current.forEach(clearInterval); };
  }, []);

  const toggleSafety = () => {
    if (boomed) return;
    setArmed((a) => { const na = !a; setReadout(na ? 'T-00:03' : 'T—:——'); return na; });
  };

  const fire = () => {
    if (boomed || counting) return;
    if (!armed) {
      setReadout('ARM 1ST');
      fx.triggerGlitch();
      setTimeout(() => setReadout('T—:——'), 700);
      return;
    }
    setCounting(true);
    setLive(true);
    let n = 3;
    setReadout('T-00:0' + n);
    const cd = setInterval(() => {
      n -= 1;
      if (n >= 0) setReadout('T-00:0' + n);
      if (n <= 0) { clearInterval(cd); detonate(); }
    }, 700);
    timers.current.push(cd);
  };

  const detonate = () => {
    setBoomed(true);
    setReadout('00:00');
    fx.triggerGlitch();
    fx.flash('∅');
    setCap('— REEL 03 · FINAL FRAME · WHERE IS MY MIND? —');
    let i = 0;
    const t = setInterval(() => {
      setQOn(false);
      setTimeout(() => { setQ(END_QUOTES[i % END_QUOTES.length]); setQOn(true); i += 1; }, 600);
      if (i >= END_QUOTES.length) clearInterval(t);
    }, 2600);
    timers.current.push(t);
  };

  return (
    <section className={'demo sec' + (boomed ? ' boom' : '')} id="demo">
      <div className="boom-flash" />
      <span className="eyebrow rev">// the end of the world · 08:14 pm</span>
      <p className="demo-q rev" style={{ opacity: qOn ? 1 : 0 }}>&ldquo;{q}&rdquo;</p>

      <div className="demo-sky rev">
        <svg viewBox="0 0 1000 360" fill="none" aria-hidden="true">
          <rect x="0" y="350" width="1000" height="10" fill="#0c0d10" />
          <g fill="#15161b" stroke="#23242b" strokeWidth="2">
            <g className="bldg b1"><rect x="60" y="140" width="120" height="210" /><g fill="#0a0b0e"><rect x="76" y="158" width="18" height="22" /><rect x="106" y="158" width="18" height="22" /><rect x="136" y="158" width="18" height="22" /><rect x="76" y="196" width="18" height="22" /><rect x="106" y="196" width="18" height="22" /><rect x="136" y="196" width="18" height="22" /><rect x="76" y="234" width="18" height="22" /><rect x="136" y="234" width="18" height="22" /></g></g>
            <g className="bldg b2"><rect x="210" y="80" width="110" height="270" /><g fill="#0a0b0e"><rect x="226" y="100" width="16" height="20" /><rect x="254" y="100" width="16" height="20" /><rect x="282" y="100" width="16" height="20" /><rect x="226" y="136" width="16" height="20" /><rect x="282" y="136" width="16" height="20" /><rect x="226" y="172" width="16" height="20" /><rect x="254" y="172" width="16" height="20" /><rect x="282" y="172" width="16" height="20" /></g></g>
            <g className="bldg b3"><rect x="350" y="40" width="130" height="310" /><g fill="#0a0b0e"><rect x="368" y="64" width="18" height="22" /><rect x="400" y="64" width="18" height="22" /><rect x="432" y="64" width="18" height="22" /><rect x="368" y="104" width="18" height="22" /><rect x="432" y="104" width="18" height="22" /><rect x="368" y="144" width="18" height="22" /><rect x="400" y="144" width="18" height="22" /><rect x="432" y="144" width="18" height="22" /></g></g>
            <g className="bldg b4"><rect x="510" y="110" width="120" height="240" /><g fill="#0a0b0e"><rect x="528" y="130" width="18" height="22" /><rect x="560" y="130" width="18" height="22" /><rect x="592" y="130" width="18" height="22" /><rect x="528" y="168" width="18" height="22" /><rect x="592" y="168" width="18" height="22" /></g></g>
            <g className="bldg b5"><rect x="660" y="60" width="120" height="290" /><g fill="#0a0b0e"><rect x="678" y="84" width="18" height="22" /><rect x="710" y="84" width="18" height="22" /><rect x="742" y="84" width="18" height="22" /><rect x="678" y="124" width="18" height="22" /><rect x="742" y="124" width="18" height="22" /><rect x="678" y="164" width="18" height="22" /><rect x="710" y="164" width="18" height="22" /></g></g>
            <g className="bldg b1"><rect x="810" y="150" width="130" height="200" /><g fill="#0a0b0e"><rect x="828" y="170" width="18" height="22" /><rect x="860" y="170" width="18" height="22" /><rect x="892" y="170" width="18" height="22" /><rect x="828" y="208" width="18" height="22" /><rect x="892" y="208" width="18" height="22" /></g></g>
          </g>
        </svg>
      </div>

      <div className="detonator rev">
        <div className="det-top">
          <div className="det-label">PROJECT MAYHEM // <b>DEMOLITIONS COMMITTEE</b><br />DET-9 · TEN-BUILDING BLAST SEQUENCE</div>
          <div className="det-readout">{readout}</div>
        </div>
        <div className="det-mid">
          <div className={'det-plunger' + (down ? ' down' : '')} onPointerDown={() => setDown(true)} onClick={fire}>
            <div className="knob" /><div className="shaft" /><div className="box" />
            <div className="lbl">PUSH THE BUTTON</div>
          </div>
          <div className="det-keys">
            <div className={'det-led' + (armed ? ' armed' : '')}><i /> ARMED</div>
            <div className={'det-led' + (live ? ' live' : '')}><i /> LIVE</div>
            <button className={'det-toggle' + (armed ? ' on' : '')} onClick={toggleSafety}>
              ▮ SAFETY: {armed ? 'OFF' : 'ON'}
            </button>
          </div>
        </div>
        <svg className="det-wire" viewBox="0 0 360 30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M0 24 q40 -22 80 0 t80 0 t80 0 t80 0" />
        </svg>
      </div>

      <figure className="endstrip">
        <img src="img/where-is-my-mind.jpg" alt="Where is my mind" loading="lazy" />
        <img src="img/ending-art.jpg" alt="Holding hands as the buildings come down" loading="lazy" />
      </figure>
      <figcaption className="demo-q" style={{ minHeight: '1em', marginTop: 14 }}>{cap}</figcaption>
    </section>
  );
}
