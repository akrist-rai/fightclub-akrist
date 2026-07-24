<script>
  import { onMount, onDestroy, getContext } from 'svelte';
  import { HOMEWORK } from '../data.js';

  const fx = getContext('fx');

  let text = $state('Press the button. Receive your assignment. Ask no questions.');
  let count = $state(0);
  let id = $state('01');
  let label = $state('RECEIVE ASSIGNMENT');

  let bag = [];
  let typer = 0;

  onDestroy(() => clearInterval(typer));

  function receive() {
    if (bag.length === 0) bag = [...HOMEWORK].sort(() => Math.random() - 0.5);
    const task = bag.pop();
    count += 1;
    id = String(Math.floor(Math.random() * 98) + 1).padStart(2, '0');
    label = 'NEXT ASSIGNMENT';
    fx.flash('MAYHEM');
    clearInterval(typer);
    let i = 0;
    typer = setInterval(() => {
      i++;
      text = task.slice(0, i);
      if (i >= task.length) clearInterval(typer);
    }, 18);
  }
</script>

<section class="homework sec" id="homework">
  <span class="eyebrow gold rev">// project mayhem · committee for human sacrifice</span>
  <h2 class="disp rev" style="font-size: clamp(32px,6.5vw,72px); margin: 0 0 6px; line-height: .86">Tonight&rsquo;s Homework</h2>
  <div class="hw-card rev">
    <div class="hw-head">▌ ASSIGNMENT — ISSUED TO SPACE MONKEY <span>{id}</span></div>
    <p class="hw-text type">{text}</p>
    <button class="hw-btn" onclick={receive}>{label}</button>
    <div class="hw-count">assignments issued: {count}</div>
  </div>
</section>
