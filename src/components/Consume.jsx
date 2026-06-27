import { CATALOG } from '../data.js';
import { furniture } from '../lib/svg.js';

const TICKER = 'NESTING INSTINCT · KHAKIS · SINGLE-SERVING FRIENDS · DUVET · CLEVER SHELVING · CLEAN FOR ITS OWN SAKE · THE THINGS YOU OWN END UP OWNING YOU · ';

// No photo — the catalog of assembly-diagram furniture is the imagery.
export default function Consume() {
  return (
    <section className="consume sec" id="consume">
      <span className="eyebrow gold rev">// advertising has us chasing cars and clothes</span>
      <h2 className="rev">WE ARE <span className="out">ALL</span><br />CONSUMERS</h2>
      <p className="rev type consume-lede">
        What kind of dining set defines me as a person? We used to read pornography. Now it was the Horchow Collection.
      </p>
      <div className="ticker rev"><span className="run">{TICKER + TICKER}</span></div>
      <div className="catalog rev">
        {CATALOG.map((c) => (
          <div className="cat" key={c.code}>
            <div className="draw" dangerouslySetInnerHTML={{ __html: furniture(c.draw) }} />
            <div className="info">
              <div className="code">{c.code}</div>
              <div className="nm">{c.nm}</div>
              <div className="ds">{c.ds}</div>
              <div className="pr">{c.pr}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="consq rev">&ldquo;The things you own end up owning you.&rdquo;</p>
    </section>
  );
}
