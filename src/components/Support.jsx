import { SUPPORT } from '../data.js';
import { icon } from '../lib/svg.js';

export default function Support() {
  return (
    <section className="support sec" id="support">
      <span className="eyebrow ash rev">// when people think you're dying, they really listen</span>
      <h2 className="disp rev" style={{ fontSize: 'clamp(34px,7vw,80px)', margin: '0 0 4px', lineHeight: '.86' }}>Support Groups</h2>
      <p className="rev type" style={{ color: 'var(--ash)', fontSize: 13, maxWidth: 560, lineHeight: 1.7 }}>
        Slide into the warm center where everyone hugs. This — for a while — was better than sleeping.
      </p>
      <div className="sg-grid rev">
        {SUPPORT.map((s) => (
          <div className="sg-card" key={s.h}>
            <div className="ic" dangerouslySetInnerHTML={{ __html: icon(s.ic) }} />
            <h3>{s.h}</h3>
            <p>{s.p}</p>
            <div className="when">{s.w}</div>
          </div>
        ))}
      </div>
      <div className="reel-band rev">
        <div className="filmstrip"><img src="img/screencaps.jpg" alt="Fight Club scenes contact sheet" loading="lazy" /></div>
        <div className="reel-txt">
          <p>&ldquo;Her lie reflected my lie. Suddenly I felt nothing. I couldn&rsquo;t cry, so once again, I couldn&rsquo;t sleep.&rdquo;</p>
          <div className="by">CONTACT SHEET · REEL 01 · FRAMES 014–017 — THE TOURIST &amp; MARLA SINGER</div>
        </div>
      </div>
    </section>
  );
}
