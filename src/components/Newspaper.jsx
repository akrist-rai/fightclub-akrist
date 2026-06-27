import { useRef, useState } from 'react';
import { useFx } from '../context/Fx.jsx';

// A single redaction bar. The real text lives in data-real and is exposed via
// CSS ::after when the parent .news has .reveal-secret.
function Rd({ real, children }) {
  return <span className="rd" data-real={real} title="ACCESS DENIED — INSUFFICIENT CLEARANCE">{children}</span>;
}

export default function Newspaper() {
  const fx = useFx();
  const [revealed, setRevealed] = useState(false);
  const [denied, setDenied] = useState('');
  const attempts = useRef(0);

  const declassify = () => {
    attempts.current += 1;
    setDenied('DECRYPTING…');
    setRevealed(true);
    fx.flash('TYLER');
    setTimeout(() => {
      setRevealed(false);
      setDenied(
        '⚠ ACCESS DENIED — INSUFFICIENT CLEARANCE. THE FIRST RULE STILL APPLIES.' +
        (attempts.current > 2 ? `  ·  attempts logged: ${attempts.current}` : '')
      );
    }, 1100);
  };

  return (
    <section className="news sec" id="mayhem">
      <span className="eyebrow rev">// declassified — mostly · front page, as recovered</span>
      <p className="news-lead rev">
        Members address one another only as space monkeys. Individual identity is actively suppressed.
        A fallen operative is honored aloud: <em>his name is Robert Paulson.</em> The press got hold of one page. The rest stays in the basement.
      </p>

      <div className="newsstand rev">
        <article className={'news newspaper' + (revealed ? ' reveal-secret' : '')}>
          <div className="np-stamp cls">Classified</div>
          <div className="np-coffee" />

          <div className="np-rail"><span>VOL. CCXLI · No. 88</span><span>★ ★ ★ CITY FINAL ★ ★ ★</span><span>WEATHER: ASH, FALLING</span></div>
          <h1 className="np-masthead">The Metropolitan Daily Press</h1>
          <div className="np-meta">
            <span>FRIDAY, OCTOBER 15, 1999</span>
            <span>&ldquo;ALL THE NEWS THEY&rsquo;LL LET US PRINT&rdquo;</span>
            <span>PRICE 35¢</span>
          </div>

          <div className="np-banner">
            <div className="np-kicker">Underground Society Linked To Nationwide Vandalism</div>
            <div className="np-head">Project Mayhem</div>
            <div className="np-sub">Police Hunt For Leaderless Criminal Organization Spreading Across <Rd real="NINE">████</Rd> Cities</div>
          </div>
          <div className="np-byline">By <Rd real="SHAUN WATSON">█████████████</Rd> · Staff Correspondent · Filed from <Rd real="537 PAPER ST">████████████</Rd></div>

          <div className="np-cols">
            <figure className="np-figure">
              <img src="img/own-you.jpg" alt="Suspect" loading="lazy" />
              <figcaption className="np-figcap">SUBJECT — believed to operate under the alias &ldquo;<Rd real="TYLER DURDEN">█████████████</Rd>.&rdquo; Considered unremarkable. Considered everywhere.</figcaption>
            </figure>

            <p className="lead">Police are on the hunt for a loosely organized gang waging a citywide campaign of vandalism, arson and mischief. Investigators have traced at least <Rd real="FIVE">████</Rd> separate incidents to the same source — an organization that calls itself only &ldquo;Project Mayhem.&rdquo;</p>

            <p>The group has been leaving their mark all over the city: corporate art demagnetized, franchise coffee bars flooded, a piece of <Rd real="CORPORATE">█████████</Rd> statuary toppled into a downtown fountain. No member has yet been charged. Those detained give the same name when booked: <Rd real="ROBERT PAULSON">█████████████</Rd>.</p>

            <div className="np-pull">&ldquo;The things you own end up owning you.&rdquo;</div>

            <p>Recruitment, sources say, runs through an associated recreational fighting society operating in the basements of bars after closing. Inductees reportedly surrender name, history and <Rd real="FEAR">████</Rd> at the door, and are forbidden to discuss the society at all — the first and second of its <Rd real="EIGHT">█████</Rd> rules.</p>

            <div className="np-box">
              <h5>Survival Rates Grow For Testicular Cancer</h5>
              <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0, fontFamily: 'Georgia,serif' }}>Support groups report record attendance. One regular, a former champion bodybuilder, was remembered by fellow members only as &ldquo;<Rd real="BIG BOB">██████</Rd>.&rdquo;</p>
              <div className="src">— HEALTH DESK, PAGE 7</div>
            </div>

            <p>Cadres are believed to reside at a condemned property on <Rd real="PAPER">█████</Rd> Street and to finance their operations through the sale of luxury <Rd real="SOAP">████</Rd>, sold door-to-door and to upscale department stores at premium prices.</p>

            <div className="np-box">
              <h5>Single Frame Of Pornography Spliced Into Family Matinee</h5>
              <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0, fontFamily: 'Georgia,serif' }}>Theatre patrons reported &ldquo;feeling sick and didn&rsquo;t know why.&rdquo; A projectionist is being sought for questioning.</p>
              <div className="src">— ARTS, PAGE 11</div>
            </div>

            <p>A memorandum recovered from the scene — stamped <Rd real="TOP SECRET">██████████</Rd> — lists committees for Arson, Assault, Mischief and <Rd real="MISINFORMATION">█████████████</Rd>. The final committee&rsquo;s name was withheld. Authorities warn the public the organization may have no single leader. &ldquo;It is everywhere,&rdquo; one detective said, &ldquo;and it is <Rd real="YOU">███</Rd>.&rdquo;</p>

            <p style={{ fontSize: 11, color: '#3a352c' }}>CONTINUED ON PAGE <Rd real="A6">██</Rd> · See also: &ldquo;What Is Fight Club?&rdquo;, and an editorial, &ldquo;On A Long Enough Timeline.&rdquo;</p>
          </div>

          <div className="np-classifieds">
            <div className="np-ad"><div className="ah">Fighting Is Inevitable</div><div className="ap">First night? You have to fight. Basement. After close. No shirts, no shoes.</div></div>
            <div className="np-ad"><div className="ah">Paper Street Soap Co.</div><div className="ap">All natural · handmade · $20/bar. Sold back to the very people it came from.</div></div>
            <div className="np-ad"><div className="ah">Lou&rsquo;s Tavern</div><div className="ap">Cold beer. Quiet basement available nightly. Inquire within. Don&rsquo;t ask twice.</div></div>
            <div className="np-ad box"><div className="ah">Remaining<br />Men Together</div><div className="ap">You are not alone. Tue · First Methodist.</div></div>
          </div>
        </article>

        <div className="declass-row">
          <button className="declass-btn" onClick={declassify}>⟲ ATTEMPT DECLASSIFICATION</button>
          <div className="denied">{denied}</div>
        </div>
      </div>
    </section>
  );
}
