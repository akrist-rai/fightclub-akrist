import { useState } from 'react';
import { LESSONS } from '../data.js';
import SectionFrame from './SectionFrame.jsx';

// Flip a card: the iconic line on the front, what it taught on the back.
export default function Lessons({ onClose }) {
  const [flipped, setFlipped] = useState({});
  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <SectionFrame title="Lessons" sub="WHAT IT TAUGHT US" glyph="❦" accent="gold" onClose={onClose}>
      <p className="lede">A story about steel and sacrifice that somehow keeps handing you things to live by. Turn a card over.</p>
      <div className="lesson-grid">
        {LESSONS.map((l, i) => (
          <button key={i} className={'lesson-card' + (flipped[i] ? ' flip' : '')} onClick={() => toggle(i)}>
            <span className="lc-inner">
              <span className="lc-face lc-front">
                <span className="lc-quote">&ldquo;{l.line}&rdquo;</span>
                <span className="lc-hint">turn over ↻</span>
              </span>
              <span className="lc-face lc-back">
                <span className="lc-meaning">{l.meaning}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </SectionFrame>
  );
}
