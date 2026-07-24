<script>
  import { CATALOG } from '../data.js';
  import { furniture } from '../lib/svg.js';

  const TICKER = 'NESTING INSTINCT · KHAKIS · SINGLE-SERVING FRIENDS · DUVET · CLEVER SHELVING · CLEAN FOR ITS OWN SAKE · THE THINGS YOU OWN END UP OWNING YOU · ';
</script>

<!-- No photo — the catalog of assembly-diagram furniture is the imagery. -->
<section class="consume sec" id="consume">
  <span class="eyebrow gold rev">// advertising has us chasing cars and clothes</span>
  <h2 class="rev">WE ARE <span class="out">ALL</span><br />CONSUMERS</h2>
  <p class="rev type consume-lede">
    What kind of dining set defines me as a person? We used to read pornography. Now it was the Horchow Collection.
  </p>
  <div class="ticker rev"><span class="run">{TICKER + TICKER}</span></div>
  <div class="catalog rev">
    {#each CATALOG as c (c.code)}
      <div class="cat">
        <div class="draw">{@html furniture(c.draw)}</div>
        <div class="info">
          <div class="code">{c.code}</div>
          <div class="nm">{c.nm}</div>
          <div class="ds">{c.ds}</div>
          <div class="pr">{c.pr}</div>
        </div>
      </div>
    {/each}
  </div>
  <p class="consq rev">&ldquo;The things you own end up owning you.&rdquo;</p>
</section>
