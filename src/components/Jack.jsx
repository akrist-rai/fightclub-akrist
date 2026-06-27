import { useEffect, useState } from 'react';
import { JACKS } from '../data.js';

// Pure typography: the cycling organ name is the whole point.
export default function Jack() {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let idx = 0, typing = true, p = 0, t = 0, alive = true;
    function cycle() {
      const full = JACKS[idx];
      p = typing ? 0 : full.length;
      t = setInterval(() => {
        if (!alive) return;
        if (typing) {
          p++; setShown(full.slice(0, p));
          if (p >= full.length) { clearInterval(t); setTimeout(() => { typing = false; cycle(); }, 1500); }
        } else {
          p--; setShown(full.slice(0, p));
          if (p <= 0) { clearInterval(t); idx = (idx + 1) % JACKS.length; typing = true; cycle(); }
        }
      }, typing ? 55 : 28);
    }
    cycle();
    return () => { alive = false; clearInterval(t); };
  }, []);

  return (
    <section className="jack sec" id="jack">
      <span className="eyebrow rev">// every part wants to speak</span>
      <div className="jack-txt">
        <span className="jack-grey">I AM </span>
        <span className="jack-red">JACK&rsquo;S </span>
        <span>{shown}</span>
        <span className="caret">&nbsp;</span>
      </div>
      <p className="rev jack-lede">
        When you have insomnia, nothing&rsquo;s real. Everything&rsquo;s far away. Everything&rsquo;s a copy of a copy of a copy.
      </p>
    </section>
  );
}
