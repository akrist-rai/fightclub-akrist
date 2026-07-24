<script>
  import { MANIFESTO } from '../data.js';
</script>

<!-- Pure typography — the lines carry it, no image needed. -->
<section class="manifesto sec" id="manifesto">
  <span class="eyebrow rev">// the things you used to define yourself</span>
  <div class="stack">
    {#each MANIFESTO as m, i (i)}
      <span class="rev">{@html m}</span>
    {/each}
  </div>
  <div class="kick rev">YOU ARE THE ALL-SINGING,<br />ALL-DANCING <em>CRAP</em> OF THE WORLD.</div>
</section>
