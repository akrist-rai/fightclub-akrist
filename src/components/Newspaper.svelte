<script>
  import { getContext } from 'svelte';

  const fx = getContext('fx');

  let revealed = $state(false);
  let denied = $state('');
  let attempts = 0;

  function declassify() {
    attempts += 1;
    denied = 'DECRYPTING…';
    revealed = true;
    fx.flash('TYLER');
    setTimeout(() => {
      revealed = false;
      denied =
        '⚠ ACCESS DENIED — INSUFFICIENT CLEARANCE. THE FIRST RULE STILL APPLIES.' +
        (attempts > 2 ? `  ·  attempts logged: ${attempts}` : '');
    }, 1100);
  }
</script>

<!-- A single redaction span. real text exposed via CSS ::after when .reveal-secret is set. -->
{#snippet rd(real, children)}
  <span class="rd" data-real={real} title="ACCESS DENIED — INSUFFICIENT CLEARANCE">{children}</span>
{/snippet}

<section class="news sec" id="mayhem">
  <span class="eyebrow rev">// declassified — mostly · front page, as recovered</span>
  <p class="news-lead rev">
    Members address one another only as space monkeys. Individual identity is actively suppressed.
    A fallen operative is honored aloud: <em>his name is Robert Paulson.</em> The press got hold of one page. The rest stays in the basement.
  </p>

  <div class="newsstand rev">
    <article class={'news newspaper' + (revealed ? ' reveal-secret' : '')}>
      <div class="np-stamp cls">Classified</div>
      <div class="np-coffee"></div>

      <div class="np-rail"><span>VOL. CCXLI · No. 88</span><span>★ ★ ★ CITY FINAL ★ ★ ★</span><span>WEATHER: ASH, FALLING</span></div>
      <h1 class="np-masthead">The Metropolitan Daily Press</h1>
      <div class="np-meta">
        <span>FRIDAY, OCTOBER 15, 1999</span>
        <span>&ldquo;ALL THE NEWS THEY&rsquo;LL LET US PRINT&rdquo;</span>
        <span>PRICE 35¢</span>
      </div>

      <div class="np-banner">
        <div class="np-kicker">Underground Society Linked To Nationwide Vandalism</div>
        <div class="np-head">Project Mayhem</div>
        <div class="np-sub">Police Hunt For Leaderless Criminal Organization Spreading Across {@render rd('NINE', '████')} Cities</div>
      </div>
      <div class="np-byline">By {@render rd('SHAUN WATSON', '█████████████')} · Staff Correspondent · Filed from {@render rd('537 PAPER ST', '████████████')}</div>

      <div class="np-cols">
        <figure class="np-figure">
          <img src="img/own-you.jpg" alt="Suspect" loading="lazy" />
          <figcaption class="np-figcap">SUBJECT — believed to operate under the alias &ldquo;{@render rd('TYLER DURDEN', '█████████████')}.&rdquo; Considered unremarkable. Considered everywhere.</figcaption>
        </figure>

        <p class="lead">Police are on the hunt for a loosely organized gang waging a citywide campaign of vandalism, arson and mischief. Investigators have traced at least {@render rd('FIVE', '████')} separate incidents to the same source — an organization that calls itself only &ldquo;Project Mayhem.&rdquo;</p>

        <p>The group has been leaving their mark all over the city: corporate art demagnetized, franchise coffee bars flooded, a piece of {@render rd('CORPORATE', '█████████')} statuary toppled into a downtown fountain. No member has yet been charged. Those detained give the same name when booked: {@render rd('ROBERT PAULSON', '█████████████')}.</p>

        <div class="np-pull">&ldquo;The things you own end up owning you.&rdquo;</div>

        <p>Recruitment, sources say, runs through an associated recreational fighting society operating in the basements of bars after closing. Inductees reportedly surrender name, history and {@render rd('FEAR', '████')} at the door, and are forbidden to discuss the society at all — the first and second of its {@render rd('EIGHT', '█████')} rules.</p>

        <div class="np-box">
          <h5>Survival Rates Grow For Testicular Cancer</h5>
          <p style="font-size:11px;line-height:1.5;margin:0;font-family:Georgia,serif">Support groups report record attendance. One regular, a former champion bodybuilder, was remembered by fellow members only as &ldquo;{@render rd('BIG BOB', '██████')}.&rdquo;</p>
          <div class="src">— HEALTH DESK, PAGE 7</div>
        </div>

        <p>Cadres are believed to reside at a condemned property on {@render rd('PAPER', '█████')} Street and to finance their operations through the sale of luxury {@render rd('SOAP', '████')}, sold door-to-door and to upscale department stores at premium prices.</p>

        <div class="np-box">
          <h5>Single Frame Of Pornography Spliced Into Family Matinee</h5>
          <p style="font-size:11px;line-height:1.5;margin:0;font-family:Georgia,serif">Theatre patrons reported &ldquo;feeling sick and didn&rsquo;t know why.&rdquo; A projectionist is being sought for questioning.</p>
          <div class="src">— ARTS, PAGE 11</div>
        </div>

        <p>A memorandum recovered from the scene — stamped {@render rd('TOP SECRET', '██████████')} — lists committees for Arson, Assault, Mischief and {@render rd('MISINFORMATION', '█████████████')}. The final committee&rsquo;s name was withheld. Authorities warn the public the organization may have no single leader. &ldquo;It is everywhere,&rdquo; one detective said, &ldquo;and it is {@render rd('YOU', '███')}.&rdquo;</p>

        <p style="font-size:11px;color:#3a352c">CONTINUED ON PAGE {@render rd('A6', '██')} · See also: &ldquo;What Is Fight Club?&rdquo;, and an editorial, &ldquo;On A Long Enough Timeline.&rdquo;</p>
      </div>

      <div class="np-classifieds">
        <div class="np-ad"><div class="ah">Fighting Is Inevitable</div><div class="ap">First night? You have to fight. Basement. After close. No shirts, no shoes.</div></div>
        <div class="np-ad"><div class="ah">Paper Street Soap Co.</div><div class="ap">All natural · handmade · $20/bar. Sold back to the very people it came from.</div></div>
        <div class="np-ad"><div class="ah">Lou&rsquo;s Tavern</div><div class="ap">Cold beer. Quiet basement available nightly. Inquire within. Don&rsquo;t ask twice.</div></div>
        <div class="np-ad box"><div class="ah">Remaining<br />Men Together</div><div class="ap">You are not alone. Tue · First Methodist.</div></div>
      </div>
    </article>

    <div class="declass-row">
      <button class="declass-btn" onclick={declassify}>⟲ ATTEMPT DECLASSIFICATION</button>
      <div class="denied">{denied}</div>
    </div>
  </div>
</section>
