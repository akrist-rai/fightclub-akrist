import { useState } from 'react';
import SectionFrame from './SectionFrame.jsx';

export default function Beats({ title, sub, glyph, accent, lede, beats, onClose }) {
  const [i, setI] = useState(0);
  const b = beats[i];
  const last = i === beats.length - 1;

  return (
    <SectionFrame title={title} sub={sub} glyph={glyph} accent={accent} onClose={onClose}>
      {lede && <p className="lede">{lede}</p>}

      <div className="beat-container">
        <div className="beat" key={i}>
          <figure className="beat-fig">
            <img src={b.img} alt={b.head} loading="lazy" />
            <span className="visual-caption">RECORDED SEGMENT #{100 + i}</span>
          </figure>
          <div className="beat-text">
            {b.kicker && <div className="beat-kicker">{b.kicker}</div>}
            <h3 className="beat-head">{b.head}</h3>
            <p className="beat-body">{b.body}</p>
          </div>
        </div>

        {/* Filmstrip deck */}
        <div className="filmstrip-wrapper">
          <div className="filmstrip-header">
            <span>FILM ROLL // MULTI-EXPOSURE TIMELINE</span>
            <span>INDEX: {i + 1} / {beats.length}</span>
          </div>
          <div className="filmstrip-track">
            {beats.map((beat, idx) => (
              <div 
                key={idx} 
                className={`film-frame ${idx === i ? 'active' : ''}`}
                onClick={() => setI(idx)}
              >
                <img src={beat.img} alt={beat.head} className="film-thumbnail" />
                <span className="film-index">[{idx + 1}]</span>
              </div>
            ))}
          </div>
        </div>

        <div className="beat-nav">
          <button className="ghost-btn" disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))}>‹ back</button>
          <div className="beat-dots">
            {beats.map((_, k) => (
              <button key={k} className={'beat-dot' + (k === i ? ' on' : '')} onClick={() => setI(k)} aria-label={`beat ${k + 1}`} />
            ))}
          </div>
          <button className="ghost-btn primary" disabled={last} onClick={() => setI((v) => Math.min(beats.length - 1, v + 1))}>next ›</button>
        </div>
      </div>
    </SectionFrame>
  );
}
