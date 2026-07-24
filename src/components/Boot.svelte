<script>
  import { onMount } from 'svelte';
  import { BOOT_LINES } from '../data.js';

  let { ondone } = $props();

  let lines = $state([]);
  let gone = $state(false);
  let done = false;

  function finish() {
    if (done) return;
    done = true;
    gone = true;
    setTimeout(ondone, 620);
  }

  onMount(() => {
    let i = 0;
    const acc = [];
    const t = setInterval(() => {
      acc.push(BOOT_LINES[i++]);
      lines = [...acc];
      if (i >= BOOT_LINES.length) { clearInterval(t); setTimeout(finish, 1300); }
    }, 480);
    return () => clearInterval(t);
  });

  const pct = $derived(Math.round((lines.length / BOOT_LINES.length) * 100));
</script>

<!-- Terminal cold-boot overlay. Click anywhere (or wait) to enter. -->
<div class={'boot' + (gone ? ' gone' : '')} onclick={finish} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && finish()}>
  <pre>{lines.join('\n')}<span class="blk" /></pre>
  <div class="boot-bar"><i style="width:{pct}%" /></div>
  <div class="skip">{pct < 100 ? `▌ rendering . . . ${pct}%` : '▌ projecting — [ click anywhere to enter the basement ]'}</div>
</div>
