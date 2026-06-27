import { useState } from 'react';
import { useFx } from '../context/Fx.jsx';
import { REVEAL_STAGES } from '../data.js';

export default function Reveal() {
  const fx = useFx();
  const [stage, setStage] = useState(0);
  const [after, setAfter] = useState('');

  const onClick = () => {
    const i = stage >= REVEAL_STAGES.length ? 0 : stage;
    const word = REVEAL_STAGES[i];
    setAfter(word);
    setStage(i + 1);
    fx.flash(word.includes('WAKE') ? 'WAKE UP' : 'TYLER');
    fx.triggerGlitch();
  };

  const label = stage >= REVEAL_STAGES.length ? '…' : 'ARE YOU SURE?';

  return (
    <section className="reveal sec" id="reveal">
      <img className="bg-still film" src="img/if-not-me.jpg" alt="" aria-hidden="true" />
      <div className="bg-tint blood" />
      <div className="rv-inner">
        <span className="eyebrow rev">// slowly, the realization comes</span>
        <p className="rv-q rev">ALL THE WAYS YOU WISH YOU COULD BE…<br /><span className="red">THAT&rsquo;S ME.</span></p>
        <p className="rv-sub rev">I look like you want to look. I am smart, capable, and most importantly, I am free in all the ways that you are not. If not me — then who?</p>
        <button className="rv-btn rev" onClick={onClick}>{stage === 0 ? 'ARE YOU TYLER DURDEN?' : label}</button>
        <div className="rv-after">{after}</div>
      </div>
    </section>
  );
}
