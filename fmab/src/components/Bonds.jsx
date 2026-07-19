import { useState } from 'react';
import { BONDS } from '../data.js';
import SectionFrame from './SectionFrame.jsx';
import { tap } from '../lib/sfx.js';

// A gallery of the ties that hold the story together. Click a plate to enlarge.
export default function Bonds({ onClose }) {
  const [open, setOpen] = useState(null);

  return (
    <SectionFrame title="Bonds" sub="LOYALTY & FOUND FAMILY" glyph="⛓" accent="rose" onClose={onClose}>
      <p className="lede">Alchemy can rebuild almost anything — except the people you lose. So you hold the ones still standing beside you a little tighter. These are the ties no transmutation could forge.</p>

      <div className="bonds-grid">
        {BONDS.map((b, i) => (
          <figure className="bond-plate" key={i} onClick={() => { setOpen(open === i ? null : i); tap(); }}>
            <div className="bond-img"><img src={b.img} alt={b.head} loading="lazy" /></div>
            <figcaption className="bond-cap">
              <h3>{b.head}</h3>
              <p className={open === i ? 'show' : ''}>{b.body}</p>
              <span className="bond-more">{open === i ? '— close —' : '— read —'}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionFrame>
  );
}
