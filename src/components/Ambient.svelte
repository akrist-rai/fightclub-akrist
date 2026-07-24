<script>
  import { onMount } from 'svelte';
  import { getContext } from 'svelte';

  const fx = getContext('fx');

  let fuse = $state(0);

  onMount(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      fuse = h > 0 ? (window.scrollY / h) * 100 : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<!-- Fixed full-viewport overlays: film grain, scanlines, vignette, scroll fuse,
     the subliminal flash + the crack that appears during a glitch. Kept OUTSIDE
     the shake wrapper so position:fixed stays anchored to the viewport. -->
<div class="grain" />
<div class="vig" />

<div class="fuse"><div class="fuse-fill" style="width:{fuse}%"><div class="fuse-spark" /></div></div>
<div class="fuse-cap">ENDING ONE MINUTE AT A TIME</div>

<div class={'sub' + (fx.subWord ? ' show' : '')}><div class="sub-word">{fx.subWord}</div></div>
