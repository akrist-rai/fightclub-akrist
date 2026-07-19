import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NODES } from '../data.js';
import { pageTurn, spark, initAudio, setMuted, isMuted } from '../lib/sfx.js';
import { GrandCircle } from '../lib/circles.jsx';

import Toc from './Toc.jsx';
import Exchange from './Exchange.jsx';
import Taboo from './Taboo.jsx';
import Gate from './Gate.jsx';
import Court from './Court.jsx';
import Alchemy from './Alchemy.jsx';
import Lessons from './Lessons.jsx';
import Journey from './Journey.jsx';
import Bonds from './Bonds.jsx';
import Beats from './Beats.jsx';
import { BROTHERS, COST } from '../data.js';

const CH = {
  exchange: () => <Exchange />,
  taboo: () => <Taboo />,
  gate: () => <Gate />,
  court: () => <Court />,
  alchemy: () => <Alchemy />,
  lessons: () => <Lessons />,
  journey: () => <Journey />,
  bonds: () => <Bonds />,
  brothers: () => <Beats title="The Elric Brothers" sub="THE PROMISE" glyph="⚭" accent="verdant"
    lede="Two boys who tried to defy death, paid dearly for it, and spent everything they had left putting each other back together." beats={BROTHERS} />,
  cost: () => <Beats title="The Cost" sub="WHAT SACRIFICE LOOKS LIKE" glyph="🜂" accent="cold"
    lede="Every step forward in this world is paid for by someone. These are a few of the bills that came due." beats={COST} />,
};

const ORDER = ['front', 'toc', ...NODES.map((n) => n.id)];

const pageVariants = {
  enter: (d) => ({ rotateY: d >= 0 ? -96 : 96, x: d >= 0 ? 60 : -60, opacity: 0 }),
  center: { rotateY: 0, x: 0, opacity: 1 },
  exit: (d) => ({ rotateY: d >= 0 ? 96 : -96, x: d >= 0 ? -60 : 60, opacity: 0 }),
};

function Frontispiece({ onStart }) {
  return (
    <article className="leaf front-leaf accent-gold">
      <div className="front-array"><GrandCircle /></div>
      <div className="front-kicker">鋼の錬金術師 · A GRIMOIRE</div>
      <h2 className="front-title">Fullmetal<br />Alchemist</h2>
      <div className="leaf-rule" style={{ maxWidth: 320 }} />
      <p className="front-law">Alchemy is the science of understanding, deconstructing, and reconstructing matter. It is bound by one law:</p>
      <p className="front-law-line">To obtain, something of equal value must be lost.</p>
      <p className="front-note">What follows is a record of what that law costs — drawn from a story of two brothers, a forbidden door, and the price of every wish worth making.</p>
      <button className="front-start" onClick={onStart}>begin the first chapter →</button>
    </article>
  );
}

export default function Book() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [muted, setMutedState] = useState(isMuted());

  const id = ORDER[i];

  const go = (d) => {
    const ni = Math.min(ORDER.length - 1, Math.max(0, i + d));
    if (ni === i) return;
    setDir(d); setI(ni); pageTurn();
  };
  const jump = (key) => {
    const ni = ORDER.indexOf(key);
    if (ni < 0 || ni === i) return;
    setDir(ni > i ? 1 : -1); setI(ni); spark();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const toggleSound = () => { initAudio(); const n = !muted; setMutedState(n); setMuted(n); };

  const page =
    id === 'front' ? <Frontispiece onStart={() => jump('exchange')} /> :
    id === 'toc' ? <Toc onPick={jump} /> :
    CH[id]();

  const label = id === 'front' ? 'Frontispiece' : id === 'toc' ? 'Contents' : (NODES.find((n) => n.id === id)?.num || '');

  return (
    <motion.div className="book" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
      <div className="binding" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="leaf-stack">
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={i}
            className="page"
            custom={dir}
            variants={pageVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.62, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="page-scroll">{page}</div>
            <div className="page-curl" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="book-nav">
        <button className="nav-btn" onClick={() => go(-1)} disabled={i === 0} aria-label="previous page">‹</button>
        <button className="nav-contents" onClick={() => jump('toc')}>❦ Contents</button>
        <span className="nav-folio">{label}</span>
        <button className={'nav-sound' + (muted ? '' : ' on')} onClick={toggleSound} title="toggle sound">{muted ? '◇' : '◈'}</button>
        <button className="nav-btn" onClick={() => go(1)} disabled={i === ORDER.length - 1} aria-label="next page">›</button>
      </div>
    </motion.div>
  );
}
