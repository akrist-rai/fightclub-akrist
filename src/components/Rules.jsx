import { RULES, RULE_ICONS } from '../data.js';
import { icon } from '../lib/svg.js';

export default function Rules() {
  return (
    <section className="rules sec" id="rules">
      <div className="rules-top">
        <div>
          <span className="eyebrow rev">// the eight rules</span>
          <h2 className="disp rev" style={{ fontSize: 'clamp(36px,8vw,96px)', margin: 0, lineHeight: '.86' }}>The Rules</h2>
        </div>
        <div className="rules-feature rev">
          <div className="flyer">
            <span className="ptape tl" /><span className="ptape tr" />
            <img src="img/you-know-rules.jpg" alt="You know the rules" loading="lazy" />
            <span className="staple s1" /><span className="staple s2" />
          </div>
          <div className="cap">— STAPLED TO THE BASEMENT DOOR —</div>
        </div>
      </div>
      <div className="rules-grid">
        {RULES.map((r, i) => (
          <div className="r-card rev" key={i} style={{ transitionDelay: i * 70 + 'ms' }}>
            <span className="r-num">{String(i + 1).padStart(2, '0')}</span>
            <p className="r-txt">{r}</p>
            <div className="r-ic" dangerouslySetInnerHTML={{ __html: icon(RULE_ICONS[i]) }} />
          </div>
        ))}
      </div>
      <p className="rules-q rev">&ldquo;It&rsquo;s only after we&rsquo;ve lost everything that we&rsquo;re free to do anything.&rdquo;</p>
    </section>
  );
}
