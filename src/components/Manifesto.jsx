import { MANIFESTO } from '../data.js';

export default function Manifesto() {
  return (
    <section className="manifesto sec" id="manifesto">
      <span className="eyebrow rev">// the things you used to define yourself</span>
      <div className="mani-grid">
        <div>
          <div className="stack">
            {MANIFESTO.map((m, i) => (
              <span key={i} className="rev" dangerouslySetInnerHTML={{ __html: m }} />
            ))}
          </div>
          <div className="kick rev">YOU ARE THE ALL-SINGING,<br />ALL-DANCING <em>CRAP</em> OF THE WORLD.</div>
        </div>
        <div className="evbag rev">
          <div className="evbag-tag">● EVIDENCE</div>
          <img src="img/tyler-dollar.jpg" alt="Defaced one-dollar bill — IN GOD WE TRUST scratched to read TYLER" loading="lazy" />
          <div className="evbag-meta"><span>ITEM <b>03</b></span><span>DEFACED CURRENCY</span><span>537 PAPER ST</span></div>
          <div className="evbag-meta"><span>CASE <b>PM-1999</b></span><span><b>&ldquo;IN TYLER WE TRUST&rdquo;</b></span><span>DO NOT SPEND</span></div>
        </div>
      </div>
    </section>
  );
}
