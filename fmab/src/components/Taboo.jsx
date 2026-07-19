import { useState, useRef, useEffect } from 'react';
import { TABOO } from '../data.js';
import SectionFrame from './SectionFrame.jsx';
import { RingMark } from '../lib/circles.jsx';

export default function Taboo({ onClose }) {
  const [phase, setPhase] = useState('idle'); // idle | rebound | toll
  const [step, setStep] = useState(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const attempt = () => {
    if (phase !== 'idle') return;
    setPhase('rebound');
    setStep(0);
    TABOO.rebound.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 700 + i * 900));
    });
    timers.current.push(setTimeout(() => setPhase('toll'), 700 + TABOO.rebound.length * 900 + 400));
  };

  const reset = () => { setPhase('idle'); setStep(0); };

  return (
    <SectionFrame title="Human Transmutation" sub="THE TABOO" glyph="⛔" accent="blood" onClose={onClose}>
      <p className="lede">{TABOO.warn}</p>

      <div className="taboo-split-grid">
        <div className="taboo-control-panel">
          <div className={'taboo-stage phase-' + phase}>
            <div className="taboo-circle">
              <RingMark points={5} className="forbidden-ring" />
              <div className="taboo-center">
                {phase === 'idle' && <button className="taboo-btn" onClick={attempt}>{TABOO.attemptLabel}</button>}
                {phase === 'rebound' && (
                  <ul className="rebound-list">
                    {TABOO.rebound.map((r, i) => <li key={i} className={i < step ? 'in' : ''}>{r}</li>)}
                  </ul>
                )}
                {phase === 'toll' && <div className="taboo-eye">👁</div>}
              </div>
            </div>

            {phase === 'toll' && (
              <div className="taboo-result">
                <p className="taboo-toll">{TABOO.toll}</p>
                <p className="taboo-moral">{TABOO.moral}</p>
                <button className="ghost-btn" onClick={reset}>↺ Try to undo it (you can&rsquo;t)</button>
              </div>
            )}
          </div>
        </div>

        <div className="dossier-visuals">
          {phase !== 'toll' ? (
            <>
              <div className="beat-fig">
                <img src="img/blood-seal.jpg" alt="Blood seal" loading="lazy" />
                <span className="visual-caption">REBOUND TARGET: SOUL ATTACHMENT SEAL</span>
              </div>
              <div className="beat-fig secondary-offset">
                <img src="img/ed-cry.jpg" alt="Edward crying" loading="lazy" />
                <span className="visual-caption">SUBJECT B: EDWARD ELRIC [LOSS DETECTION]</span>
              </div>
            </>
          ) : (
            <>
              <div className="beat-fig">
                <img src="img/ed-wake.jpg" alt="The aftermath" loading="lazy" />
                <span className="visual-caption">AFTERMATH SCAN A: TRANS-REBOUND COLD SHOCK</span>
              </div>
              <div className="beat-fig secondary-offset">
                <img src="img/it-hurts.jpg" alt="It hurts" loading="lazy" />
                <span className="visual-caption">AFTERMATH SCAN B: SEVERE NERVOUS DECAY</span>
              </div>
            </>
          )}
        </div>
      </div>
    </SectionFrame>
  );
}
