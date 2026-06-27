import { useState } from 'react';
import { useFx } from '../context/Fx.jsx';

export default function Hero() {
  const fx = useFx();
  const [bruises, setBruises] = useState(0);

  const hit = () => {
    setBruises((b) => b + 1);
    fx.flash(['PAIN', 'ALIVE', 'WAKE UP', 'TYLER'][Math.floor(Math.random() * 4)]);
    fx.triggerGlitch();
  };

  const s = String(bruises).padStart(2, '0');
  const msg =
    bruises < 4 ? `BRUISES: ${s}` :
    bruises < 8 ? `BRUISES: ${s} · you're starting to feel something` :
    `BRUISES: ${s} · you've never been more alive`;

  return (
    <header className="hero">
      <div className="hero-cnt">
        <span className="eyebrow flick">RULE 01 — YOU DO NOT TALK ABOUT FIGHT CLUB</span>
        <h1 className="glitch" data-text="FIGHT CLUB">FIGHT CLUB</h1>
        <p className="tag">
          An insomniac and a devil-may-care soap maker. A purposeless terminal for Project Mayhem —
          no login, no newsletter, no reason. You met me at a very strange time in my life.
        </p>
        <div className="hit-wrap">
          <span className="hit-line">&ldquo;I want you to hit me as hard as you can.&rdquo;</span>
          <button className="hit-btn" onClick={hit}>HIT ME</button>
          <span className="bruise-ctr">{msg}</span>
        </div>
      </div>
      <div className="hero-poster">
        <img src="img/hero-poster.jpg" alt="Fight Club one-sheet, 1999" />
        <div className="pin">— 1999 · A DAVID FINCHER FILM —</div>
      </div>
      <div className="scroll-hint">↓ DESCEND</div>
    </header>
  );
}
