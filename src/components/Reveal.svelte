<script>
  import { getContext } from 'svelte';
  import { REVEAL_STAGES } from '../data.js';

  const fx = getContext('fx');

  let stage = $state(0);
  let after = $state('');

  function onClick() {
    const i = stage >= REVEAL_STAGES.length ? 0 : stage;
    const word = REVEAL_STAGES[i];
    after = word;
    stage = i + 1;
    fx.flash(word.includes('WAKE') ? 'WAKE UP' : 'TYLER');
    fx.triggerGlitch();
  }

  const label = $derived(stage >= REVEAL_STAGES.length ? '…' : 'ARE YOU SURE?');
</script>

<section class="reveal sec" id="reveal">
  <img class="bg-still film" src="img/if-not-me.jpg" alt="" aria-hidden="true" />
  <div class="bg-tint blood"></div>
  <div class="rv-inner">
    <span class="eyebrow rev">// slowly, the realization comes</span>
    <p class="rv-q rev">ALL THE WAYS YOU WISH YOU COULD BE…<br /><span class="red">THAT&rsquo;S ME.</span></p>
    <p class="rv-sub rev">I look like you want to look. I am smart, capable, and most importantly, I am free in all the ways that you are not. If not me — then who?</p>
    <button class="rv-btn rev" onclick={onClick}>{stage === 0 ? 'ARE YOU TYLER DURDEN?' : label}</button>
    <div class="rv-after">{after}</div>
  </div>
</section>
