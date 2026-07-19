import { useState } from 'react';
import { GATE } from '../data.js';
import SectionFrame from './SectionFrame.jsx';
import { GateEye } from '../lib/circles.jsx';

export default function Gate({ onClose }) {
  const [open, setOpen] = useState(false);
  const [toll, setToll] = useState(null);

  return (
    <SectionFrame title="The Gate of Truth" sub="THE TOLL" glyph="👁" accent="white" onClose={onClose}>
      <div className="gate-split-grid">
        <div className="dossier-control-panel">
          <div className={'gate-stage' + (open ? ' open' : '')}>
            <div className="gate-door door-l" />
            <div className="gate-door door-r" />
            <div className="gate-void">
              <GateEye className="gate-eye-art" />
              <div className="gate-speech">
                {GATE.greeting.map((g, i) => (
                  <p key={i} style={{ transitionDelay: `${0.3 + i * 0.5}s` }}>{g}</p>
                ))}
              </div>
            </div>
            {!open && (
              <button className="gate-knock" onClick={() => setOpen(true)}>
                KNOCK ON THE DOOR
              </button>
            )}
          </div>

          {open && (
            <div className="gate-toll">
              <p className="gate-prompt">{GATE.prompt}</p>
              <div className="toll-grid">
                {GATE.tolls.map((t, i) => (
                  <button
                    key={i}
                    className={'toll-card' + (toll === i ? ' active' : '')}
                    onClick={() => setToll(i)}
                  >
                    <span className="toll-give">{t.give}</span>
                  </button>
                ))}
              </div>
              {toll != null && (
                <div className="toll-result">
                  <span className="tr-k">TRUTH VERDICT: RECONSTRUCTION GAINED</span>
                  <p className="tr-v">"{GATE.tolls[toll].gain}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="dossier-visuals">
          <div className="beat-fig">
            <img src="img/ed-gun-truth.jpg" alt="Ed and Truth" loading="lazy" />
            <span className="visual-caption">METAPHYSICAL SCAN: THE CORE REBOUND ENCOUNTER</span>
          </div>
          <div className="beat-fig secondary-offset">
            <img src="img/ed-spear.jpg" alt="Alchemical weapon creation" loading="lazy" />
            <span className="visual-caption">SUBJECT B: TRANSMUTATION FOCUS IN THE VOID</span>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
