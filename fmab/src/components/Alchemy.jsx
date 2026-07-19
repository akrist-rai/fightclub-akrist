import { useState } from 'react';
import { ALCHEMY_STEPS } from '../data.js';
import SectionFrame from './SectionFrame.jsx';
import { RingMark } from '../lib/circles.jsx';

// Clap your hands and transmute: broken steel reforms. Teaches the three steps.
export default function Alchemy({ onClose }) {
  const [state, setState] = useState('broken'); // broken | reacting | whole
  const [reveal, setReveal] = useState(0);

  const transmute = () => {
    if (state === 'reacting') return;
    if (state === 'whole') { setState('broken'); setReveal(0); return; }
    setState('reacting');
    setReveal(0);
    ALCHEMY_STEPS.forEach((_, i) => setTimeout(() => setReveal(i + 1), 350 + i * 450));
    setTimeout(() => setState('whole'), 350 + ALCHEMY_STEPS.length * 450 + 250);
  };

  return (
    <SectionFrame title="Alchemy" sub="DECONSTRUCT · RECONSTRUCT" glyph="✦" accent="teal" onClose={onClose}>
      <p className="lede">No magic. A science. Understand a thing, break it down, and build it anew — taking nothing, adding nothing. A rare few learned to do it with a clap of the hands, needing no circle at all.</p>

      <div className={'transmute-stage state-' + state} onClick={transmute} role="button" tabIndex={0}
           onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') transmute(); }}>
        <RingMark points={6} className="transmute-ring" />
        <svg className="transmute-obj" viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true">
          {/* a blade that shatters / reforms via CSS on the .shard pieces */}
          <g className="whole-form">
            <path d="M100 24 L116 120 L100 176 L84 120 Z" strokeWidth="3" />
            <line x1="84" y1="120" x2="116" y2="120" strokeWidth="3" />
            <rect x="92" y="120" width="16" height="44" strokeWidth="3" />
          </g>
          <g className="shards">
            <path className="shard s1" d="M100 24 L116 120 L100 120 Z" strokeWidth="2" />
            <path className="shard s2" d="M100 24 L84 120 L100 120 Z" strokeWidth="2" />
            <path className="shard s3" d="M84 120 L100 176 L100 120 Z" strokeWidth="2" />
            <path className="shard s4" d="M116 120 L100 176 L100 120 Z" strokeWidth="2" />
            <rect className="shard s5" x="92" y="120" width="16" height="44" strokeWidth="2" />
          </g>
        </svg>
        <div className="transmute-hint">
          {state === 'broken' && '✦ clap to transmute'}
          {state === 'reacting' && 'transmuting…'}
          {state === 'whole' && 'whole again — clap to break it down'}
        </div>
      </div>

      <ol className="alch-steps">
        {ALCHEMY_STEPS.map((s, i) => (
          <li key={s.k} className={i < reveal || state === 'whole' ? 'in' : ''}>
            <span className="as-k">{s.k}</span>
            <span className="as-t">{s.t}</span>
            <span className="as-d">{s.d}</span>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
