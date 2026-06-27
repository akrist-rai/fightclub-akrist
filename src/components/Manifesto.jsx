import { MANIFESTO } from '../data.js';

// Pure typography — the lines carry it, no image needed.
export default function Manifesto() {
  return (
    <section className="manifesto sec" id="manifesto">
      <span className="eyebrow rev">// the things you used to define yourself</span>
      <div className="stack">
        {MANIFESTO.map((m, i) => (
          <span key={i} className="rev" dangerouslySetInnerHTML={{ __html: m }} />
        ))}
      </div>
      <div className="kick rev">YOU ARE THE ALL-SINGING,<br />ALL-DANCING <em>CRAP</em> OF THE WORLD.</div>
    </section>
  );
}
