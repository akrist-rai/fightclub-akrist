<script>
  import { RULES, RULE_ICONS } from '../data.js';
  import { icon } from '../lib/svg.js';
</script>

<section class="rules sec" id="rules">
  <div class="rules-top">
    <div>
      <span class="eyebrow rev">// the eight rules</span>
      <h2 class="disp rev" style="font-size: clamp(36px,8vw,96px); margin: 0; line-height: .86">The Rules</h2>
    </div>
    <div class="rules-feature rev">
      <div class="flyer">
        <span class="ptape tl" /><span class="ptape tr" />
        <img src="img/you-know-rules.jpg" alt="You know the rules" loading="lazy" />
        <span class="staple s1" /><span class="staple s2" />
      </div>
      <div class="cap">— STAPLED TO THE BASEMENT DOOR —</div>
    </div>
  </div>
  <div class="rules-grid">
    {#each RULES as r, i (i)}
      <div class="r-card rev" style="transition-delay: {i * 70}ms">
        <span class="r-num">{String(i + 1).padStart(2, '0')}</span>
        <p class="r-txt">{r}</p>
        <div class="r-ic">{@html icon(RULE_ICONS[i])}</div>
      </div>
    {/each}
  </div>
  <p class="rules-q rev">&ldquo;It&rsquo;s only after we&rsquo;ve lost everything that we&rsquo;re free to do anything.&rdquo;</p>
</section>
