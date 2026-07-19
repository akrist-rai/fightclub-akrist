import { useState } from 'react';
import { EXCHANGES } from '../data.js';
import SectionFrame from './SectionFrame.jsx';

// Interactive balance: choose what you want, and the scale tips to reveal the
// equal price. Nothing is free.
export default function Exchange({ onClose }) {
  const [pick, setPick] = useState(null);
  const chosen = pick != null ? EXCHANGES[pick] : null;

  return (
    <SectionFrame title="Equivalent Exchange" sub="THE FIRST LAW" glyph="⚖" accent="gold" onClose={onClose}>
      <p className="lede">Nothing in this world is free. To gain, something of equal value must be given up — that is the law every alchemist lives and dies by. Weigh a desire against its true price.</p>

      <div className="scale-wrap">
        <svg className={'scale' + (chosen ? ' tipped' : '')} viewBox="0 0 360 240" fill="none" stroke="currentColor" aria-hidden="true">
          <line x1="180" y1="20" x2="180" y2="150" strokeWidth="3" />
          <circle cx="180" cy="16" r="6" />
          <g className="beam">
            <line x1="60" y1="60" x2="300" y2="60" strokeWidth="3" />
            <line x1="60" y1="60" x2="60" y2="92" strokeWidth="1.5" />
            <line x1="300" y1="60" x2="300" y2="92" strokeWidth="1.5" />
            <path className="pan pan-l" d="M30 92 Q60 124 90 92" strokeWidth="2.5" />
            <path className="pan pan-r" d="M270 92 Q300 124 330 92" strokeWidth="2.5" />
          </g>
          <path d="M150 150 H210 L224 200 H136 Z" strokeWidth="2.5" />
          <line x1="120" y1="200" x2="240" y2="200" strokeWidth="3" />
        </svg>
        <div className="scale-tags">
          <span className="tag-want">WANT</span>
          <span className="tag-cost">COST</span>
        </div>
      </div>

      <div className="exchange-grid">
        {EXCHANGES.map((e, i) => (
          <button key={i} className={'exchange-chip' + (pick === i ? ' active' : '')} onClick={() => setPick(i)}>
            {e.want}
          </button>
        ))}
      </div>

      <div className={'exchange-out' + (chosen ? ' show' : '')}>
        {chosen && (
          <>
            <div className="eo-row"><span className="eo-k">YOU ASK FOR</span><span className="eo-v">{chosen.want}</span></div>
            <div className="eo-row"><span className="eo-k">THE PRICE</span><span className="eo-v cost">{chosen.cost}</span></div>
            <div className={'eo-verdict v-' + chosen.verdict.replace(/\s/g, '')}>{chosen.verdict}</div>
          </>
        )}
      </div>
    </SectionFrame>
  );
}
