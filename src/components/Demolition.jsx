import { useEffect, useRef, useState } from 'react';
import { useFx } from '../context/Fx.jsx';
import { END_QUOTES } from '../data.js';

// Final-sequence control: arm the cue, start the countdown, then cut the
// final film frame to black.
export default function Demolition() {
  const fx = useFx();
  const [armed, setArmed] = useState(false);
  const [boomed, setBoomed] = useState(false);
  const [counting, setCounting] = useState(false);
  const [readout, setReadout] = useState('T—:——');
  const [q, setQ] = useState('You met me at a very strange time in my life.');
  const [qOn, setQOn] = useState(true);
  const [cap, setCap] = useState('');
  const timers = useRef([]);

  useEffect(() => {
    return () => { timers.current.forEach(clearInterval); };
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
      <span className="eyebrow rev">// the end of the world · 08:14 pm</span>
      <p className="demo-q rev" style={{ opacity: qOn ? 1 : 0 }}>&ldquo;{q}&rdquo;</p>
      <div className="final-frame rev">
        <img src="img/ending-art.jpg" alt="The final scene from Fight Club" loading="lazy" />
        <div className="final-frame-mask" />
        <div className="final-frame-meta mono"><span>REEL 03 / FINAL FRAME</span><span>35MM / 2.39:1</span></div>
      </div>
      <div className="detonator rev">
        <div className="det-top">
          <div className="det-label">PROJECT MAYHEM // <b>DEMOLITIONS COMMITTEE</b><br />DET-9 · TEN-BUILDING BLAST SEQUENCE</div>
          <div className="det-readout">{readout}</div>
        </div>
        <div className="det-actions">
          <button className={'det-toggle' + (armed ? ' on' : '')} onClick={toggleSafety}>SAFETY: {armed ? 'OFF' : 'ON'}</button>
          <button className="det-fire" onClick={fire}>{boomed ? 'SEQUENCE COMPLETE' : 'BEGIN SEQUENCE'}</button>
        </div>
      </div>
      <figcaption className="demo-q" style={{ minHeight: '1em', marginTop: 14 }}>{cap}</figcaption>
    </section>
  );
}
