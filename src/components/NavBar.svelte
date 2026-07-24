<script>
  import { getContext } from 'svelte';

  let { currentPage } = $props();

  const fx = getContext('fx');

  const links = [
    { path: '#/', label: 'HOME', code: '01' },
    { path: '#/rules', label: 'RULES', code: '02' },
    { path: '#/identity', label: 'IDENTITY', code: '03' },
    { path: '#/mayhem', label: 'MAYHEM', code: '04' },
    { path: '#/demolition', label: 'END', code: '05' },
  ];

  function handleLinkClick() {
    fx.triggerGlitch();
    if (Math.random() > 0.4) {
      fx.flash(['PAIN', 'ALIVE', 'WAKE UP', 'TYLER'][Math.floor(Math.random() * 4)]);
    }
  }
</script>

<nav class="navbar">
  <a class="navbar-logo" href="#/" aria-label="Fight Club home">
    <span class="navbar-mark">FC</span>
    <span class="navbar-wordmark">FIGHT<br />CLUB</span>
    <span class="navbar-edition mono">EST. 1999</span>
  </a>
  <div class="navbar-center mono" aria-hidden="true">
    <span>PROJECT MAYHEM</span><i></i> <span>537 PAPER ST.</span>
  </div>
  <ul class="navbar-links">
    {#each links as link (link.path)}
      {@const isActive = currentPage === link.path || (link.path === '#/' && (currentPage === '' || currentPage === '#/'))}
      <li>
        <a
          href={link.path}
          class={isActive ? 'active' : ''}
          onclick={handleLinkClick}
        >
          <span class="mono">[{link.code}]</span> {link.label}
        </a>
      </li>
    {/each}
  </ul>
  <div class="navbar-meta mono">
    <i class="live-dot"></i> <span>STATUS: ACTIVE</span>
  </div>
</nav>
