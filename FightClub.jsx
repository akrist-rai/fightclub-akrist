import { useState, useEffect, useRef, useCallback } from "react";

/* ===================================================================== *
 *  FIGHT CLUB // PROJECT MAYHEM TERMINAL
 *  A purposeless homage. The first rule is you do not talk about it.
 *  All artwork (ID photo, soap emblem, smiley) is original. Quotes are
 *  short, iconic lines used as tribute.
 * ===================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200;300;400;500;600;700&family=Special+Elite&family=Share+Tech+Mono&display=swap');

:root{
  --ink:#0a0a0b; --ink2:#121215; --ink3:#1b1b1f;
  --soap:#ece7da; --paper:#e8e1cf;
  --blood:#c8232a; --blood-d:#7c1318; --blood-l:#e8434a;
  --teal:#7cc6bc; --teal-d:#3f8f86; --teal-card:#8ecabf; --teal-edge:#5aa79c;
  --mayhem:#f3c20d; --consumer:#143a5c; --consumer-d:#0b2138;
  --purple:#7351a0; --purple-ink:#5d3f83;
  --ash:#8b887f; --ash-d:#56544d;
}

*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;}
::selection{background:var(--blood);color:#fff;}

.fc-root{
  background:var(--ink);
  color:var(--soap);
  font-family:'Oswald','Helvetica Neue',Arial,sans-serif;
  font-weight:300;
  overflow-x:hidden;
  position:relative;
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.fc-root a{color:inherit;text-decoration:none;}
.fc-mono{font-family:'Share Tech Mono','Courier New',monospace;}
.fc-type{font-family:'Special Elite','Courier New',monospace;}
.fc-disp{font-family:'Anton','Impact','Arial Narrow',sans-serif;}
.fc-cond{font-family:'Oswald','Arial Narrow',sans-serif;}

/* ---------- ambient overlays ---------- */
.grain{
  position:fixed;inset:-50px;z-index:9000;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  opacity:.06;mix-blend-mode:overlay;animation:grain .42s steps(4) infinite;
}
.scan{
  position:fixed;inset:0;z-index:9001;pointer-events:none;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,0) 0 2px,rgba(0,0,0,.16) 2px 3px);
  opacity:.5;
}
.scanbar{
  position:fixed;left:0;right:0;height:140px;z-index:9002;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.025) 50%,rgba(255,255,255,0) 100%);
  animation:scanmove 7s linear infinite;
}
.vig{
  position:fixed;inset:0;z-index:9003;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 40%,rgba(0,0,0,0) 45%,rgba(0,0,0,.65) 100%);
}
@keyframes grain{
  0%{transform:translate(0,0)}10%{transform:translate(-3%,-5%)}20%{transform:translate(-8%,3%)}
  30%{transform:translate(5%,-9%)}40%{transform:translate(-3%,9%)}50%{transform:translate(-8%,5%)}
  60%{transform:translate(9%,0)}70%{transform:translate(0,7%)}80%{transform:translate(-9%,0)}
  90%{transform:translate(5%,5%)}100%{transform:translate(0,0)}
}
@keyframes scanmove{0%{top:-140px}100%{top:100%}}

/* ---------- fuse / progress ---------- */
.fuse{position:fixed;top:0;left:0;right:0;height:4px;z-index:9100;background:rgba(255,255,255,.05);}
.fuse-fill{height:100%;background:linear-gradient(90deg,var(--blood-d),var(--blood));position:relative;width:0;}
.fuse-spark{position:absolute;right:-2px;top:50%;width:9px;height:9px;border-radius:50%;
  transform:translateY(-50%);background:#ffd27a;box-shadow:0 0 10px 3px #ff8a2a,0 0 20px 6px rgba(255,80,0,.6);}
.fuse-cap{position:fixed;top:8px;right:10px;z-index:9100;font-size:9px;letter-spacing:.28em;color:var(--ash-d);}

/* ---------- side index ---------- */
.idx{position:fixed;left:18px;top:50%;transform:translateY(-50%);z-index:8000;}
.idx ul{list-style:none;margin:0;padding:0;}
.idx li{margin:9px 0;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.16em;
  color:var(--ash-d);transition:color .25s,transform .25s;cursor:pointer;}
.idx li:hover,.idx li.active{color:var(--blood);transform:translateX(4px);}
.idx li span{color:var(--ash);}
@media(max-width:920px){.idx{display:none;}}

/* ---------- reveal ---------- */
.rev{opacity:0;transform:translateY(28px);filter:blur(7px);
  transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1),filter .9s ease;}
.rev.in{opacity:1;transform:none;filter:none;}

/* ---------- glitch text ---------- */
.glitch{position:relative;display:inline-block;}
.glitch::before,.glitch::after{
  content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%;
  clip-path:inset(0 0 0 0);}
.glitch::before{color:var(--blood);transform:translate(-2px,0);animation:gl1 2.6s infinite linear alternate-reverse;}
.glitch::after{color:var(--teal);transform:translate(2px,0);animation:gl2 2.1s infinite linear alternate-reverse;}
@keyframes gl1{
  0%{clip-path:inset(8% 0 86% 0)}20%{clip-path:inset(40% 0 41% 0)}40%{clip-path:inset(72% 0 12% 0)}
  60%{clip-path:inset(20% 0 66% 0)}80%{clip-path:inset(58% 0 28% 0)}100%{clip-path:inset(90% 0 2% 0)}
}
@keyframes gl2{
  0%{clip-path:inset(70% 0 14% 0)}25%{clip-path:inset(18% 0 60% 0)}50%{clip-path:inset(48% 0 34% 0)}
  75%{clip-path:inset(82% 0 6% 0)}100%{clip-path:inset(30% 0 52% 0)}
}
.flick{animation:flick 5.5s infinite;}
@keyframes flick{0%,19%,21%,23%,80%,100%{opacity:1}20%,22%{opacity:.35}81%{opacity:.6}}

/* ---------- subliminal ---------- */
.sub{position:fixed;inset:0;z-index:9500;pointer-events:none;display:grid;place-items:center;
  background:rgba(4,4,5,.78);}
.sub-word{font-family:'Anton',Impact,sans-serif;color:rgba(236,231,218,.16);
  font-size:min(34vw,360px);letter-spacing:-.03em;text-transform:uppercase;
  text-shadow:0 0 40px rgba(200,35,42,.25);}

/* ---------- glitch screen ---------- */
.glitching{animation:shake .5s steps(2) both;}
.glitching::after{content:"";position:fixed;inset:0;z-index:9400;pointer-events:none;
  background:linear-gradient(90deg,rgba(200,35,42,.08),rgba(124,198,188,.06));mix-blend-mode:screen;}
@keyframes shake{
  0%{transform:translate(0,0)}15%{transform:translate(-7px,3px)}30%{transform:translate(6px,-5px)}
  45%{transform:translate(-5px,-3px)}60%{transform:translate(7px,4px)}75%{transform:translate(-4px,5px)}
  100%{transform:translate(0,0)}
}
.crack{position:fixed;inset:0;z-index:9450;pointer-events:none;}

/* ---------- sections ---------- */
.sec{position:relative;z-index:10;padding:120px 7vw;}
.eyebrow{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.32em;
  color:var(--blood);text-transform:uppercase;margin:0 0 18px;}
.eyebrow.ash{color:var(--ash);}

/* hero */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  padding:0 7vw;position:relative;z-index:10;}
.hero h1{font-family:'Anton',Impact,sans-serif;line-height:.82;margin:0;
  font-size:clamp(64px,17vw,260px);letter-spacing:-.02em;text-transform:uppercase;}
.hero .sub2{font-family:'Share Tech Mono',monospace;color:var(--ash);
  font-size:clamp(11px,1.4vw,15px);letter-spacing:.18em;margin-top:26px;max-width:640px;line-height:1.7;}
.hitwrap{margin-top:44px;display:flex;align-items:center;gap:22px;flex-wrap:wrap;}
.hitwrap .line{font-family:'Oswald',sans-serif;font-weight:200;font-style:italic;
  color:var(--soap);font-size:clamp(15px,2vw,22px);max-width:420px;line-height:1.3;}
.hitbtn{font-family:'Anton',Impact,sans-serif;letter-spacing:.04em;text-transform:uppercase;
  background:var(--blood);color:#fff;border:none;padding:18px 40px;font-size:22px;cursor:pointer;
  position:relative;transition:transform .08s,background .2s;clip-path:polygon(0 0,100% 0,96% 100%,4% 100%);}
.hitbtn:hover{background:var(--blood-l);}
.hitbtn:active{transform:scale(.95) translateY(2px);}
.bruise{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.2em;color:var(--ash-d);}
.scrollhint{position:absolute;bottom:28px;left:7vw;font-family:'Share Tech Mono',monospace;
  font-size:11px;letter-spacing:.3em;color:var(--ash-d);animation:bob 2.4s ease-in-out infinite;}
@keyframes bob{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(7px);opacity:1}}
.smiley{position:absolute;right:6vw;top:18vh;width:min(34vw,420px);opacity:.12;}

/* rules */
.rules{background:linear-gradient(180deg,var(--ink),#08090b);}
.rule{display:grid;grid-template-columns:84px 1fr;gap:24px;align-items:baseline;
  padding:22px 0;border-top:1px solid rgba(236,231,218,.1);}
.rule:last-child{border-bottom:1px solid rgba(236,231,218,.1);}
.rule .n{font-family:'Anton',Impact,sans-serif;font-size:clamp(34px,5vw,62px);
  color:var(--blood);line-height:.8;}
.rule .t{font-family:'Oswald',sans-serif;font-weight:300;text-transform:uppercase;
  letter-spacing:.04em;font-size:clamp(18px,2.6vw,34px);transition:letter-spacing .35s,color .35s;}
.rule:hover .t{letter-spacing:.14em;color:#fff;}
.rule:hover .n{animation:jit .25s steps(2) infinite;}
@keyframes jit{0%{transform:translate(0,0)}50%{transform:translate(-2px,1px)}100%{transform:translate(2px,-1px)}}

/* identity / id card */
.identity{background:#070809;display:flex;flex-direction:column;align-items:center;}
.cardstage{perspective:1400px;width:min(640px,92vw);margin-top:30px;}
.card3d{position:relative;width:100%;aspect-ratio:1.62/1;transform-style:preserve-3d;
  transition:transform .14s ease-out;will-change:transform;cursor:grab;}
.card3d.flipped{transform:rotateY(180deg)!important;}
.face{position:absolute;inset:0;backface-visibility:hidden;border-radius:10px;overflow:hidden;
  box-shadow:0 40px 80px -30px rgba(0,0,0,.9),0 0 0 1px rgba(0,0,0,.4);}
.glare{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.55;}

/* id front */
.idfront{background:
  repeating-linear-gradient(0deg,rgba(255,255,255,.045) 0 1px,transparent 1px 5px),
  linear-gradient(135deg,#9ad2c8,#7bbfb4 55%,#69b3a7);
  color:#0d2b28;position:absolute;inset:0;}
.idfront::before{content:"";position:absolute;inset:0;opacity:.18;mix-blend-mode:multiply;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.idstrip{position:absolute;left:0;top:0;bottom:0;width:34px;background:var(--purple);
  display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:10px 0;}
.idstrip span{writing-mode:vertical-rl;transform:rotate(180deg);color:#efe6f5;
  font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.25em;}
.idbody{position:absolute;left:34px;right:0;top:0;bottom:0;padding:14px 18px;}
.idtitle{position:absolute;right:14px;top:8px;font-family:'Anton',Impact,sans-serif;
  color:var(--purple-ink);font-size:clamp(22px,5vw,40px);transform:rotate(-6deg);
  text-transform:uppercase;letter-spacing:.02em;opacity:.92;line-height:.85;text-align:right;}
.idtarget{position:absolute;left:8px;top:8px;width:26px;height:26px;}
.idrow{display:flex;align-items:flex-end;gap:8px;margin-bottom:7px;}
.idlabel{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.12em;color:#0c3b35;opacity:.8;}
.idcjk{font-size:13px;font-weight:700;color:#0d2b28;}
.idval{font-family:'Special Elite','Courier New',monospace;font-size:clamp(12px,1.9vw,16px);
  color:#0a201d;border-bottom:1px dotted rgba(13,43,40,.5);flex:1;padding-bottom:1px;
  text-transform:uppercase;}
.idmeta{position:absolute;left:34px;bottom:8px;font-family:'Share Tech Mono',monospace;
  font-size:8px;letter-spacing:.18em;color:#0c3b35;opacity:.7;}
.photo{position:absolute;left:18px;bottom:10px;width:34%;max-width:150px;aspect-ratio:.74/1;
  background:#0d1413;border:2px solid #06302b;overflow:hidden;transform:rotate(-1.5deg);}
.serial{position:absolute;right:14px;bottom:6px;text-align:right;}
.serial .big{font-family:'Anton',Impact,sans-serif;color:var(--purple-ink);
  font-size:clamp(28px,6vw,52px);line-height:.8;letter-spacing:.04em;transform:skewX(-6deg);}
.serial .lab{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:.18em;color:#0c3b35;}
.stampblot{position:absolute;width:54px;height:54px;border-radius:50%;background:var(--purple);
  opacity:.16;filter:blur(1px);}

/* id back */
.idback{background:
  repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0 1px,transparent 1px 6px),
  linear-gradient(135deg,#7bbfb4,#69b3a7);
  color:#0d2b28;position:absolute;inset:0;transform:rotateY(180deg);padding:18px 22px;}
.idback h4{font-family:'Anton',Impact,sans-serif;margin:0 0 6px;color:var(--purple-ink);
  font-size:clamp(16px,3vw,24px);letter-spacing:.04em;}
.idback p{font-family:'Special Elite',monospace;font-size:11px;line-height:1.5;margin:0 0 8px;color:#0a201d;}
.barcode{height:46px;display:flex;gap:2px;margin-top:10px;align-items:stretch;}
.barcode i{display:block;background:#06302b;}
.thumb{position:absolute;right:22px;bottom:18px;width:64px;height:80px;border:1px solid #06302b;
  background:radial-gradient(circle at 40% 35%,rgba(13,43,40,.0) 0 30%,rgba(13,43,40,.35) 70%);
  border-radius:6px;}
.cardhint{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.24em;
  color:var(--ash-d);margin-top:22px;text-align:center;}

/* copy of a copy */
.copy{background:#060607;text-align:center;}
.copyhead{font-family:'Special Elite',monospace;letter-spacing:.3em;text-transform:uppercase;
  font-size:clamp(15px,3vw,26px);color:var(--soap);}
.copyline{font-family:'Special Elite',monospace;text-transform:uppercase;letter-spacing:.28em;
  color:var(--soap);margin:8px 0;will-change:transform,filter,opacity;}

/* jack */
.jack{background:linear-gradient(180deg,#08090b,#0a0a0b);min-height:70vh;display:flex;
  flex-direction:column;justify-content:center;}
.jacktxt{font-family:'Anton',Impact,sans-serif;text-transform:uppercase;line-height:.86;
  font-size:clamp(38px,9vw,120px);letter-spacing:-.01em;min-height:1.7em;}
.jacktxt .grey{color:var(--ash-d);}
.jacktxt .red{color:var(--blood);}
.caret{display:inline-block;width:.06em;background:var(--blood);margin-left:.04em;
  animation:blink 1s steps(1) infinite;}
@keyframes blink{50%{opacity:0}}

/* mayhem dossier */
.mayhem{background:repeating-linear-gradient(180deg,#0c0d0f,#0c0d0f 40px,#0a0b0d 40px,#0a0b0d 80px);}
.dossier{background:var(--paper);color:#1a1712;max-width:880px;margin:30px auto 0;
  padding:0 0 40px;position:relative;box-shadow:0 50px 90px -40px rgba(0,0,0,.85);
  font-family:'Special Elite','Courier New',monospace;}
.dossier::before{content:"";position:absolute;inset:0;opacity:.5;mix-blend-mode:multiply;pointer-events:none;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.classbar{background:#15110c;color:var(--paper);text-align:center;padding:6px;
  font-family:'Share Tech Mono',monospace;letter-spacing:.34em;font-size:11px;
  border-top:3px solid var(--blood);border-bottom:3px solid var(--blood);}
.dosbody{padding:30px clamp(22px,5vw,56px);position:relative;z-index:2;}
.doshead{display:flex;justify-content:space-between;align-items:flex-start;
  border-bottom:2px solid #1a1712;padding-bottom:10px;gap:16px;flex-wrap:wrap;}
.doshead .agency{font-weight:700;font-size:13px;letter-spacing:.1em;line-height:1.4;}
.doshead .meta{font-size:10px;text-align:right;line-height:1.6;}
.dostitle{font-family:'Anton',Impact,sans-serif;font-size:clamp(40px,9vw,86px);
  letter-spacing:.01em;line-height:.86;margin:20px 0 4px;color:#15110c;text-transform:uppercase;}
.dossub{font-size:12px;letter-spacing:.06em;margin-bottom:18px;}
.dosp{font-size:13px;line-height:1.85;margin:0 0 16px;text-align:justify;}
.doslabel{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.22em;
  margin:22px 0 8px;border-bottom:1px solid #1a1712;padding-bottom:4px;}
.dosul{margin:0 0 6px;padding-left:20px;font-size:13px;line-height:1.9;}
.commit{display:flex;flex-wrap:wrap;gap:8px;}
.commit span{border:1px solid #1a1712;padding:4px 12px;font-family:'Share Tech Mono',monospace;
  font-size:11px;letter-spacing:.16em;}
.distable{width:100%;border-collapse:collapse;font-size:12px;}
.distable th,.distable td{border:1px solid #1a1712;padding:6px 10px;text-align:left;}
.distable th{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.16em;background:rgba(0,0,0,.06);}
.redact{display:inline-block;height:1em;background:#15110c;vertical-align:-0.18em;border-radius:1px;
  position:relative;overflow:hidden;cursor:help;transition:opacity .2s;}
.redact::after{content:"";position:absolute;inset:0;transform:translateX(-100%);
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);}
.redact:hover::after{animation:sheen 1s linear;}
@keyframes sheen{to{transform:translateX(100%)}}
.redact.revealed{background:transparent;color:var(--blood);font-family:'Share Tech Mono',monospace;
  letter-spacing:.04em;height:auto;}
.stamp{position:absolute;font-family:'Anton',Impact,sans-serif;text-transform:uppercase;
  border:4px double currentColor;padding:4px 14px;letter-spacing:.06em;}
.stamp.classified{color:var(--blood);top:120px;right:24px;transform:rotate(11deg);font-size:24px;opacity:.85;}
.stamp.eyes{color:#15110c;top:200px;left:30px;transform:rotate(-7deg);font-size:13px;opacity:.6;border-style:solid;border-width:2px;}
.stamp.declass{color:#2b6b4a;bottom:120px;left:50%;transform:translateX(-50%) rotate(-4deg);
  font-size:30px;opacity:.28;border-color:#2b6b4a;letter-spacing:.18em;}
.holes{position:absolute;left:14px;top:90px;display:flex;flex-direction:column;gap:34px;}
.holes i{width:12px;height:12px;border-radius:50%;background:#0a0b0d;box-shadow:inset 0 1px 3px rgba(0,0,0,.6);}
.coffee{position:absolute;right:60px;top:60px;width:90px;height:90px;border-radius:50%;
  border:7px solid rgba(90,60,20,.16);opacity:.7;}
.declassbtn{font-family:'Share Tech Mono',monospace;letter-spacing:.18em;font-size:11px;
  background:#15110c;color:var(--paper);border:none;padding:10px 18px;cursor:pointer;margin-top:14px;}
.declassbtn:hover{background:var(--blood);}
.denied{color:var(--blood);font-family:'Share Tech Mono',monospace;font-size:11px;
  letter-spacing:.18em;margin-top:10px;min-height:14px;}

/* consume */
.consume{background:linear-gradient(180deg,var(--consumer),var(--consumer-d));color:var(--soap);overflow:hidden;}
.consume h2{font-family:'Anton',Impact,sans-serif;font-size:clamp(46px,12vw,170px);line-height:.84;
  margin:0;text-transform:uppercase;letter-spacing:-.01em;}
.consume h2 .out{color:transparent;-webkit-text-stroke:2px var(--soap);}
.ticker{margin:30px 0;border-top:1px solid rgba(236,231,218,.25);
  border-bottom:1px solid rgba(236,231,218,.25);overflow:hidden;white-space:nowrap;padding:12px 0;}
.ticker .run{display:inline-block;font-family:'Share Tech Mono',monospace;letter-spacing:.2em;
  font-size:14px;color:var(--mayhem);animation:marq 26s linear infinite;}
@keyframes marq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.catalog{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1px;
  background:rgba(236,231,218,.2);margin-top:24px;}
.cat{background:var(--consumer-d);padding:20px;}
.cat .nm{font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em;}
.cat .ds{font-family:'Share Tech Mono',monospace;font-size:10px;color:#9fc0d6;margin:6px 0;line-height:1.6;}
.cat .pr{font-family:'Anton',Impact,sans-serif;color:var(--mayhem);font-size:22px;}
.consq{font-family:'Oswald',sans-serif;font-weight:200;font-style:italic;
  font-size:clamp(18px,3vw,30px);margin-top:34px;max-width:680px;line-height:1.4;}

/* soap */
.soap-sec{background:#050506;display:flex;flex-direction:column;align-items:center;text-align:center;}
.emblem{width:min(440px,86vw);margin:20px 0;color:var(--soap);}
.soaptxt{font-family:'Oswald',sans-serif;font-weight:200;max-width:640px;line-height:1.6;
  font-size:clamp(14px,2vw,18px);color:#cfcabd;}
.soapmeta{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.22em;
  color:var(--ash-d);margin-top:18px;}

/* footer */
.foot{background:#040405;text-align:center;padding:120px 7vw 90px;position:relative;z-index:10;}
.foot .big{font-family:'Anton',Impact,sans-serif;font-size:clamp(30px,7vw,96px);
  line-height:.88;text-transform:uppercase;letter-spacing:-.01em;}
.foot .q{font-family:'Oswald',sans-serif;font-weight:200;font-style:italic;color:var(--ash);
  font-size:clamp(15px,2.4vw,24px);margin-top:24px;}
.regmark{display:inline-block;width:26px;height:26px;position:relative;margin:0 10px;opacity:.4;}
.regmark::before,.regmark::after{content:"";position:absolute;background:var(--ash);}
.regmark::before{left:50%;top:0;bottom:0;width:1px;transform:translateX(-50%);}
.regmark::after{top:50%;left:0;right:0;height:1px;transform:translateY(-50%);}
.footmeta{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.2em;
  color:var(--ash-d);margin-top:46px;line-height:1.9;}

/* boot */
.boot{position:fixed;inset:0;z-index:9800;background:#040405;display:flex;
  flex-direction:column;justify-content:center;padding:0 9vw;cursor:pointer;
  transition:opacity .6s ease;}
.boot.gone{opacity:0;pointer-events:none;}
.boot pre{font-family:'Share Tech Mono',monospace;color:var(--teal);font-size:clamp(12px,2vw,17px);
  line-height:1.9;margin:0;white-space:pre-wrap;}
.boot .skip{margin-top:30px;font-family:'Share Tech Mono',monospace;font-size:11px;
  letter-spacing:.24em;color:var(--ash-d);}
.boot .blk{background:var(--teal);display:inline-block;width:.6em;height:1.05em;
  vertical-align:-.15em;animation:blink 1s steps(1) infinite;}

.lockscroll{height:100vh;overflow:hidden;}

@media (prefers-reduced-motion: reduce){
  .grain,.scanbar,.flick,.glitch::before,.glitch::after,.rule:hover .n,.ticker .run,
  .scrollhint,.fuse-spark{animation:none!important;}
  .rev{transition:opacity .3s ease;transform:none;filter:none;}
  .glitching{animation:none!important;}
}
@media(max-width:620px){
  .sec{padding:80px 6vw;}
  .rule{grid-template-columns:54px 1fr;gap:14px;}
  .stamp.classified{font-size:16px;right:10px;}
  .stamp.declass{font-size:18px;}
  .idx{display:none;}
}
`;

/* ----------------------------- data ----------------------------- */
const RULES = [
  "You do not talk about Fight Club.",
  "You do NOT talk about Fight Club.",
  "If someone says stop, goes limp, or taps out — the fight is over.",
  "Only two guys to a fight.",
  "One fight at a time.",
  "No shirts. No shoes.",
  "Fights go on as long as they have to.",
  "If this is your first night, you have to fight.",
];

const JACKS = [
  "MEDULLA OBLONGATA",
  "COMPLETE LACK OF SURPRISE",
  "RAGING BILE DUCT",
  "COLD SWEAT",
  "SMIRKING REVENGE",
  "INFLAMED SENSE OF REJECTION",
  "WASTED LIFE",
  "BROKEN HEART",
  "COLON",
];

const SUB_WORDS = ["TYLER", "MAYHEM", "SOAP", "COPY", "WAKE UP", "YOU", "∅", "PAIN", "HIS NAME IS ROBERT PAULSON"];

const CATALOG = [
  { nm: "ÖRSKÄ Duvet", ds: "Goose-down. The kind of thing you buy to feel complete.", pr: "$—" },
  { nm: "TÖDELL Table", ds: "Yin-yang coffee table. Defines you as a person.", pr: "$—" },
  { nm: "Single-Serving Friend", ds: "Seat 6A → baggage claim. Disposable.", pr: "FREE" },
  { nm: "A Khaki Life", ds: "Pre-washed. Pre-faded. Pre-decided.", pr: "PRICELESS" },
  { nm: "Clever Shelving Unit", ds: "Holds the things that hold you.", pr: "$—" },
  { nm: "Nesting Instinct", ds: "Self-assembly required. Soul not included.", pr: "$—" },
];

/* small deterministic gibberish for redactions */
const GIB = "█▓▒░@#%&*XKZ4791QWVN";
function gib(n) {
  let s = "";
  for (let i = 0; i < n; i++) s += GIB[(i * 7 + n * 3) % GIB.length];
  return s;
}

/* ------------------------ reveal hook ------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rev");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------ Redact ------------------------ */
function Redact({ ch = 5, revealed }) {
  const text = gib(ch);
  if (revealed) {
    return <span className="redact revealed">{text}</span>;
  }
  return (
    <span className="redact" style={{ width: ch * 0.62 + "em" }} title="ACCESS DENIED — INSUFFICIENT CLEARANCE" />
  );
}

/* ------------------------ ID Card ------------------------ */
function IdCard() {
  const stage = useRef(null);
  const card = useRef(null);
  const glare = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const ry = (px - 0.5) * 26;
      const rx = (0.5 - py) * 20;
      if (card.current && !flipped) {
        card.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      if (glare.current) {
        glare.current.style.background = `radial-gradient(380px circle at ${px * 100}% ${py * 100}%,rgba(255,255,255,.5),rgba(255,255,255,0) 60%)`;
      }
    });
  }, [flipped]);

  const onLeave = useCallback(() => {
    if (card.current && !flipped) card.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (glare.current) glare.current.style.background = "transparent";
  }, [flipped]);

  return (
    <>
      <div
        className="cardstage rev"
        ref={stage}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={"card3d" + (flipped ? " flipped" : "")} ref={card}>
          {/* FRONT */}
          <div className="face">
            <div className="idfront">
              <div className="stampblot" style={{ left: "44%", top: "18%" }} />
              <div className="stampblot" style={{ left: "70%", top: "60%" }} />
              <div className="idstrip">
                <span>1999</span>
                <span>THE CRITERION COLLECTION</span>
              </div>
              <div className="idbody">
                <svg className="idtarget" viewBox="0 0 24 24" fill="none" stroke="#5d3f83" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3.2" fill="#5d3f83" />
                </svg>
                <div className="idtitle">FIGHT<br />CLUB</div>

                <div style={{ marginTop: 30, maxWidth: "62%" }}>
                  <div className="idrow">
                    <span className="idcjk">姓名</span>
                    <span className="idlabel">NAME</span>
                    <span className="idval">DURDEN, TYLER</span>
                  </div>
                  <div className="idrow">
                    <span className="idcjk">階級</span>
                    <span className="idlabel">GRADE</span>
                    <span className="idval">A2C</span>
                  </div>
                  <div className="idrow">
                    <span className="idcjk">編號</span>
                    <span className="idlabel">SERVICE NO</span>
                    <span className="idval">FC111793036</span>
                  </div>
                  <div className="idrow">
                    <span className="idcjk">年齡</span>
                    <span className="idlabel">AGE</span>
                    <span className="idval">29</span>
                  </div>
                  <div className="idrow">
                    <span className="idcjk">單位</span>
                    <span className="idlabel">SECTION</span>
                    <span className="idval">&nbsp;</span>
                  </div>
                  <div className="idrow">
                    <span className="idcjk">效期</span>
                    <span className="idlabel">EXPIRES</span>
                    <span className="idval">28 OCT 1965</span>
                  </div>
                </div>

                {/* photo */}
                <div className="photo">
                  <svg viewBox="0 0 100 135" width="100%" height="100%" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#243634" />
                        <stop offset="1" stopColor="#0e1413" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="135" fill="url(#pg)" />
                    {[28, 52, 76, 100].map((y, i) => (
                      <g key={i}>
                        <line x1="0" y1={y} x2="100" y2={y} stroke="#3a5450" strokeWidth="0.6" />
                        <text x="2" y={y - 2} fill="#5e7d78" fontSize="6" fontFamily="monospace">
                          {["6'1\"", "5'9\"", "5'6\"", "5'3\""][i]}
                        </text>
                      </g>
                    ))}
                    {/* abstract mugshot silhouette (original) */}
                    <g fill="#0a0f0e" opacity="0.92">
                      <ellipse cx="54" cy="46" rx="20" ry="24" />
                      <path d="M30 135 Q34 86 54 80 Q74 86 78 135 Z" />
                      <path d="M38 30 Q40 18 54 18 Q70 18 70 32 Q60 26 50 28 Q42 28 38 30 Z" fill="#0a0f0e" />
                    </g>
                    <rect x="0" y="108" width="100" height="14" fill="#05201d" opacity="0.85" />
                    <text x="50" y="117" fill="#7fb8b0" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      DURDEN, TYLER
                    </text>
                  </svg>
                </div>

                <div className="serial">
                  <div className="big">69 123</div>
                  <div className="lab">CARD SERIAL NO.</div>
                </div>
                <div className="idmeta">FC 14793036 · ISSUED UNDER PROJECT MAYHEM · NON-TRANSFERABLE</div>
              </div>
            </div>
            <div className="glare" ref={glare} />
          </div>

          {/* BACK */}
          <div className="face">
            <div className="idback">
              <h4>PROPERTY OF PROJECT MAYHEM</h4>
              <p>This card certifies the bearer surrendered name, history and fear upon induction. The bearer is now a space monkey. The bearer does not exist.</p>
              <p>537 Paper Street · Bradford<br />Return to no one. You met me at a very strange time in my life.</p>
              <div className="barcode">
                {Array.from({ length: 42 }).map((_, i) => (
                  <i key={i} style={{ width: ((i * 37) % 5) + 1 + "px" }} />
                ))}
              </div>
              <div className="thumb" />
              <div style={{ position: "absolute", left: 22, bottom: 22, fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: ".2em", color: "#0c3b35" }}>
                AUTH ████ · THUMB ON FILE
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cardhint">› drag to tilt · click to flip ‹</div>
    </>
  );
}

/* ------------------------ Jack cycler ------------------------ */
function JackCycler() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const full = JACKS[idx];
    let i = 0;
    let t;
    if (typing) {
      t = setInterval(() => {
        i++;
        setShown(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(t);
          setTimeout(() => setTyping(false), 1500);
        }
      }, 55);
    } else {
      let j = full.length;
      t = setInterval(() => {
        j--;
        setShown(full.slice(0, j));
        if (j <= 0) {
          clearInterval(t);
          setIdx((p) => (p + 1) % JACKS.length);
          setTyping(true);
        }
      }, 28);
    }
    return () => clearInterval(t);
  }, [idx, typing]);

  return (
    <div className="jacktxt">
      <span className="grey">I AM </span>
      <span className="red">JACK&rsquo;S </span>
      <span>{shown}</span>
      <span className="caret">&nbsp;</span>
    </div>
  );
}

/* ------------------------ Copy cascade ------------------------ */
function CopyCascade() {
  const lines = 11;
  return (
    <div className="copy sec" id="copy">
      <p className="eyebrow rev" style={{ color: "var(--ash)" }}>// VHS GENERATION LOSS</p>
      <div className="copyhead rev">EVERYTHING IS A COPY</div>
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1);
        return (
          <div
            key={i}
            className="copyline"
            style={{
              opacity: 1 - t * 0.82,
              filter: `blur(${t * 2.4}px)`,
              fontSize: `clamp(13px, ${2.6 - t * 0.6}vw, ${24 - t * 6}px)`,
              transform: `skewX(${(t * 7).toFixed(2)}deg) translateX(${Math.sin(i) * t * 22}px)`,
              letterSpacing: `${0.28 + t * 0.25}em`,
              textShadow: `${(t * 2).toFixed(1)}px 0 0 rgba(200,35,42,${t * 0.4}), -${(t * 2).toFixed(1)}px 0 0 rgba(124,198,188,${t * 0.4})`,
              animation: `copyflk ${4 + i * 0.5}s steps(1) ${i * 0.2}s infinite`,
            }}
          >
            OF A COPY
          </div>
        );
      })}
      <style>{`@keyframes copyflk{0%,96%,100%{opacity:inherit}97%{opacity:.15}98%{opacity:.6}}`}</style>
    </div>
  );
}

/* ------------------------ Dossier ------------------------ */
function Dossier() {
  const [revealed, setRevealed] = useState(false);
  const [denied, setDenied] = useState("");
  const [attempts, setAttempts] = useState(0);

  const tryDeclass = () => {
    setRevealed(true);
    setDenied("DECRYPTING…");
    setAttempts((a) => a + 1);
    setTimeout(() => {
      setRevealed(false);
      setDenied("⚠ ACCESS DENIED — INSUFFICIENT CLEARANCE. THE FIRST RULE STILL APPLIES.");
    }, 850);
  };

  return (
    <div className="mayhem sec" id="mayhem">
      <p className="eyebrow rev">// declassified — mostly</p>
      <div className="dossier rev">
        <div className="classbar">TOP SECRET // FIGHT CLUB // NOFORN</div>
        <div className="dosbody">
          <div className="holes"><i /><i /><i /></div>
          <div className="coffee" />
          <div className="stamp classified">Classified</div>
          <div className="stamp eyes">Eyes Only</div>
          <div className="stamp declass">Declassified</div>

          <div className="doshead">
            <div className="agency">
              CENTRAL <Redact ch={6} revealed={revealed} /> AGENCY<br />
              DIRECTORATE OF OPERATIONS<br />
              MEMORANDUM FOR THE RECORD
            </div>
            <div className="meta">
              FILE NO: PM-<Redact ch={4} revealed={revealed} />-1999<br />
              DATE: <Redact ch={2} revealed={revealed} /> OCT 1999<br />
              COPY 1 OF <Redact ch={1} revealed={revealed} /><br />
              PAGES WITHHELD: many
            </div>
          </div>

          <div className="dostitle">Project Mayhem</div>
          <div className="dossub">SUBJECT: D<Redact ch={6} revealed={revealed} />, T<Redact ch={4} revealed={revealed} /> &nbsp; (alias &ldquo;TYLER&rdquo;)</div>

          <p className="dosp">
            The following assessment concerns the entity self-designated &ldquo;PROJECT MAYHEM,&rdquo; a
            decentralized organization operating without <Redact ch={8} revealed={revealed} /> across{" "}
            <Redact ch={5} revealed={revealed} /> metropolitan cells. Recruitment proceeds through an associated
            recreational fighting society. Inductees surrender name, history, and{" "}
            <Redact ch={7} revealed={revealed} /> at the door.
          </p>
          <p className="dosp">
            Cadres reside at a condemned property — <Redact ch={3} revealed={revealed} /> PAPER STREET — and
            finance operations through the sale of <Redact ch={9} revealed={revealed} />. Members address one
            another only as &ldquo;space monkeys.&rdquo; Individual identity is actively{" "}
            <Redact ch={6} revealed={revealed} />. A fallen operative is honored aloud:{" "}
            <em>his name is Robert Paulson.</em>
          </p>

          <div className="doslabel">▌ ESTABLISHED OBJECTIVES</div>
          <ul className="dosul">
            <li>Erase the records of <Redact ch={6} revealed={revealed} />.</li>
            <li>Reset the <Redact ch={7} revealed={revealed} /> to zero.</li>
            <li><Redact ch={14} revealed={revealed} /></li>
            <li>Remind every man he is not his <Redact ch={5} revealed={revealed} />.</li>
          </ul>

          <div className="doslabel">▌ ORGANIZATIONAL COMMITTEES</div>
          <div className="commit">
            <span>ARSON</span><span>ASSAULT</span><span>MISCHIEF</span><span>MISINFORMATION</span>
            <span style={{ color: "transparent", background: "#15110c" }}>████████</span>
          </div>

          <div className="doslabel">▌ PERSONNEL (PARTIAL)</div>
          <table className="distable">
            <thead>
              <tr><th>DESIGNATION</th><th>STATUS</th></tr>
            </thead>
            <tbody>
              <tr><td>SPACE MONKEY 01</td><td>ACTIVE</td></tr>
              <tr><td>D<Redact ch={5} revealed={revealed} />, T<Redact ch={3} revealed={revealed} /></td><td><Redact ch={6} revealed={revealed} /></td></tr>
              <tr><td>PAULSON, R.</td><td>K.I.A. — he has a name now</td></tr>
              <tr><td><Redact ch={9} revealed={revealed} /></td><td><Redact ch={5} revealed={revealed} /></td></tr>
              <tr><td>THE NARRATOR</td><td>SEE SUBJECT ABOVE</td></tr>
            </tbody>
          </table>

          <div className="doslabel">▌ KNOWN OPERATIONS</div>
          <ul className="dosul">
            <li>OPERATION LATTE THUNDER — complete.</li>
            <li>OPERATION <Redact ch={9} revealed={revealed} /> — in progress.</li>
            <li>OPERATION <Redact ch={12} revealed={revealed} /> — <Redact ch={6} revealed={revealed} />.</li>
          </ul>

          <p className="dosp" style={{ marginTop: 24, fontSize: 11, borderTop: "1px solid #1a1712", paddingTop: 12 }}>
            WARNING: This document contains information affecting the <Redact ch={10} revealed={revealed} />. Its
            transmission or revelation is, itself, the first rule. Handle via{" "}
            <Redact ch={7} revealed={revealed} /> channels only. Destroy after reading. Then make soap.
          </p>

          <button className="declassbtn" onClick={tryDeclass}>⟲ ATTEMPT DECLASSIFICATION</button>
          <div className="denied">{denied}{attempts > 2 ? `  ·  attempts logged: ${attempts}` : ""}</div>
        </div>
        <div className="classbar">TOP SECRET // FIGHT CLUB // NOFORN</div>
      </div>
    </div>
  );
}

/* ------------------------ Soap emblem (original art) ------------------------ */
function SoapEmblem() {
  return (
    <svg className="emblem rev" viewBox="0 0 400 300" fill="none">
      <text x="200" y="44" textAnchor="middle" fill="currentColor"
        fontFamily="'Special Elite',serif" fontSize="34" letterSpacing="1">Paper Street Soap Co.</text>
      <ellipse cx="200" cy="160" rx="150" ry="78" stroke="currentColor" strokeWidth="1.4" />
      {/* two mirrored stylized wing figures around a basin */}
      <g stroke="currentColor" strokeWidth="1.3" fill="none">
        {/* left figure */}
        <path d="M150 200 Q140 150 162 132 Q150 120 130 124 Q108 130 104 158 Q102 184 120 200" />
        <path d="M120 150 Q90 140 78 120 Q104 138 122 138" />
        <circle cx="158" cy="120" r="9" />
        {/* right figure (mirror) */}
        <path d="M250 200 Q260 150 238 132 Q250 120 270 124 Q292 130 296 158 Q298 184 280 200" />
        <path d="M280 150 Q310 140 322 120 Q296 138 278 138" />
        <circle cx="242" cy="120" r="9" />
        {/* basin + fountain */}
        <path d="M165 196 Q200 214 235 196 L228 178 L172 178 Z" />
        <path d="M200 178 L200 150 M188 160 Q200 146 212 160" />
        <path d="M196 138 Q200 128 204 138" />
      </g>
      <text x="200" y="262" textAnchor="middle" fill="currentColor"
        fontFamily="'Special Elite',serif" fontStyle="italic" fontSize="16">All Natural · Handmade</text>
      <text x="200" y="284" textAnchor="middle" fill="currentColor"
        fontFamily="'Share Tech Mono',monospace" fontSize="10" letterSpacing="2"
        opacity="0.8">537 PAPER STREET · BRADFORD · (288) 555-0153</text>
    </svg>
  );
}

/* ------------------------ Mayhem smiley (original sketchy) ------------------------ */
function Smiley() {
  return (
    <svg className="smiley flick" viewBox="0 0 200 200" fill="none" stroke="var(--mayhem)" strokeWidth="3">
      <path d="M100 12 C45 12 12 55 12 100 C12 150 50 188 100 188 C155 188 188 145 188 100 C188 52 152 14 100 12 Z"
        strokeLinecap="round" strokeDasharray="2 6" />
      <circle cx="72" cy="84" r="5" fill="var(--mayhem)" stroke="none" />
      <rect x="116" y="72" width="14" height="14" fill="var(--mayhem)" stroke="none" />
      <path d="M60 128 Q100 156 140 124" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------ Boot ------------------------ */
function Boot({ onDone }) {
  const lines = [
    "> establishing connection to paper street . . .",
    "> the first rule: you do not talk about this website",
    "> the second rule: YOU DO NOT TALK ABOUT THIS WEBSITE",
    "> initializing project mayhem . . . ok",
    "> you are not your job. you are not your browser history.",
    "> this site has no purpose. neither, arguably, do you. welcome.",
  ];
  const [out, setOut] = useState([]);
  const [gone, setGone] = useState(false);

  const finish = useCallback(() => {
    setGone(true);
    setTimeout(onDone, 600);
  }, [onDone]);

  useEffect(() => {
    let li = 0;
    const t = setInterval(() => {
      setOut((o) => [...o, lines[li]]);
      li++;
      if (li >= lines.length) {
        clearInterval(t);
        setTimeout(finish, 1300);
      }
    }, 460);
    return () => clearInterval(t);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={"boot" + (gone ? " gone" : "")} onClick={finish}>
      <pre>{out.join("\n")}<span className="blk" /></pre>
      <div className="skip">[ click anywhere to enter the basement ]</div>
    </div>
  );
}

/* ============================ APP ============================ */
export default function FightClub() {
  const [booting, setBooting] = useState(true);
  const [flash, setFlash] = useState(null);
  const [glitch, setGlitch] = useState(false);
  const [bruises, setBruises] = useState(0);
  const [fuse, setFuse] = useState(0);
  const reduce = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useReveal();

  /* scroll fuse */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setFuse(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* subliminal flashes */
  useEffect(() => {
    if (booting || reduce.current) return;
    let alive = true;
    const loop = () => {
      if (!alive) return;
      const delay = 7000 + Math.random() * 6000;
      setTimeout(() => {
        if (!alive) return;
        setFlash(SUB_WORDS[Math.floor(Math.random() * SUB_WORDS.length)]);
        setTimeout(() => setFlash(null), 95);
        loop();
      }, delay);
    };
    loop();
    return () => {
      alive = false;
    };
  }, [booting]);

  const hitMe = useCallback(() => {
    setBruises((b) => b + 1);
    if (reduce.current) return;
    setGlitch(true);
    setFlash(["PAIN", "ALIVE", "WAKE UP", "TYLER"][Math.floor(Math.random() * 4)]);
    setTimeout(() => setFlash(null), 90);
    setTimeout(() => setGlitch(false), 520);
  }, []);

  const jump = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const bruiseMsg =
    bruises === 0 ? "BRUISES: 00"
    : bruises < 4 ? `BRUISES: ${String(bruises).padStart(2, "0")}`
    : bruises < 8 ? `BRUISES: ${String(bruises).padStart(2, "0")} · you're starting to feel something`
    : `BRUISES: ${String(bruises).padStart(2, "0")} · you've never been more alive`;

  return (
    <div className={"fc-root" + (glitch ? " glitching" : "") + (booting ? " lockscroll" : "")}>
      <style>{CSS}</style>

      {/* ambient */}
      <div className="grain" />
      <div className="scan" />
      <div className="scanbar" />
      <div className="vig" />

      {/* fuse */}
      <div className="fuse">
        <div className="fuse-fill" style={{ width: fuse + "%" }} title="your life is ending one minute at a time">
          <div className="fuse-spark" />
        </div>
      </div>
      <div className="fuse-cap">ENDING ONE MINUTE AT A TIME</div>

      {/* side index */}
      <nav className="idx">
        <ul>
          <li onClick={jump("rules")}><span>01</span> RULES</li>
          <li onClick={jump("identity")}><span>02</span> IDENTITY</li>
          <li onClick={jump("copy")}><span>03</span> COPY</li>
          <li onClick={jump("jack")}><span>04</span> JACK</li>
          <li onClick={jump("mayhem")}><span>05</span> MAYHEM</li>
          <li onClick={jump("consume")}><span>06</span> CONSUME</li>
          <li onClick={jump("soap")}><span>07</span> SOAP</li>
        </ul>
      </nav>

      {/* subliminal */}
      {flash && (
        <div className="sub">
          <div className="sub-word">{flash}</div>
        </div>
      )}

      {/* crack on glitch */}
      {glitch && (
        <svg className="crack" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <g stroke="rgba(236,231,218,.7)" strokeWidth="1.4" fill="none">
            <path d="M500 0 L520 180 L470 300 L560 420 L500 700" />
            <path d="M520 180 L720 140 M520 180 L300 230 M470 300 L240 360 M560 420 L800 470 M470 300 L640 360" />
            <path d="M520 180 L640 60 M300 230 L120 180 M800 470 L940 540" />
          </g>
        </svg>
      )}

      {/* ===== HERO ===== */}
      <header className="hero">
        <Smiley />
        <p className="eyebrow flick">RULE 01 — YOU DO NOT TALK ABOUT FIGHT CLUB</p>
        <h1 className="glitch" data-text="FIGHT CLUB">FIGHT CLUB</h1>
        <p className="sub2">
          A purposeless terminal for Project Mayhem. No login. No newsletter you can actually
          subscribe to. No reason. It exists only to scratch the itch — and to push React as far
          as a basement full of soap will allow.
        </p>
        <div className="hitwrap">
          <span className="line">&ldquo;I want you to hit me as hard as you can.&rdquo;</span>
          <button className="hitbtn" onClick={hitMe}>HIT ME</button>
          <span className="bruise">{bruiseMsg}</span>
        </div>
        <div className="scrollhint">↓ DESCEND</div>
      </header>

      {/* ===== RULES ===== */}
      <section className="rules sec" id="rules">
        <p className="eyebrow rev">// the eight rules</p>
        <h2 className="fc-disp rev" style={{ fontSize: "clamp(36px,8vw,96px)", margin: "0 0 30px", textTransform: "uppercase", lineHeight: ".86" }}>
          The Rules
        </h2>
        {RULES.map((r, i) => (
          <div className="rule rev" key={i} style={{ transitionDelay: i * 60 + "ms" }}>
            <div className="n">{String(i + 1).padStart(2, "0")}</div>
            <div className="t">{r}</div>
          </div>
        ))}
        <p className="rev fc-cond" style={{ marginTop: 40, fontStyle: "italic", color: "var(--ash)", fontSize: "clamp(15px,2vw,22px)", maxWidth: 620 }}>
          &ldquo;It&rsquo;s only after we&rsquo;ve lost everything that we&rsquo;re free to do anything.&rdquo;
        </p>
      </section>

      {/* ===== IDENTITY ===== */}
      <section className="identity sec" id="identity">
        <p className="eyebrow rev">// identity card · 1:1 reconstruction</p>
        <h2 className="fc-disp rev" style={{ fontSize: "clamp(34px,7vw,80px)", margin: "0 0 6px", textTransform: "uppercase", lineHeight: ".86", textAlign: "center" }}>
          You Are Not Special
        </h2>
        <p className="rev fc-mono" style={{ color: "var(--ash)", letterSpacing: ".16em", fontSize: 12, textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          Issued to a man who does not exist. Photo, name, and serials are an original recreation of the prop.
        </p>
        <IdCard />
      </section>

      {/* ===== COPY ===== */}
      <CopyCascade />

      {/* ===== JACK ===== */}
      <section className="jack sec" id="jack">
        <p className="eyebrow rev">// every part wants to speak</p>
        <JackCycler />
        <p className="rev fc-cond" style={{ marginTop: 36, color: "var(--ash)", fontStyle: "italic", fontSize: "clamp(14px,2vw,20px)" }}>
          When you have insomnia, nothing&rsquo;s real. Everything&rsquo;s far away. Everything&rsquo;s a copy of a copy of a copy.
        </p>
      </section>

      {/* ===== MAYHEM DOSSIER ===== */}
      <Dossier />

      {/* ===== CONSUME ===== */}
      <section className="consume sec" id="consume">
        <p className="eyebrow rev" style={{ color: "var(--mayhem)" }}>// advertising has us chasing cars and clothes</p>
        <h2 className="rev">WE ARE <span className="out">ALL</span><br />CONSUMERS</h2>
        <div className="ticker rev">
          <span className="run">
            NESTING INSTINCT · KHAKIS · SINGLE-SERVING FRIENDS · DUVET · CLEVER SHELVING · CLEAN FOR ITS OWN SAKE · THE THINGS YOU OWN END UP OWNING YOU · 
            NESTING INSTINCT · KHAKIS · SINGLE-SERVING FRIENDS · DUVET · CLEVER SHELVING · CLEAN FOR ITS OWN SAKE · THE THINGS YOU OWN END UP OWNING YOU · 
          </span>
        </div>
        <div className="catalog rev">
          {CATALOG.map((c, i) => (
            <div className="cat" key={i}>
              <div className="nm">{c.nm}</div>
              <div className="ds">{c.ds}</div>
              <div className="pr">{c.pr}</div>
            </div>
          ))}
        </div>
        <p className="consq rev">&ldquo;The things you own end up owning you.&rdquo;</p>
      </section>

      {/* ===== SOAP ===== */}
      <section className="soap-sec sec" id="soap">
        <p className="eyebrow rev">// we make soap</p>
        <SoapEmblem />
        <p className="soaptxt rev">
          The first soap was made from the ashes of heroes. We make ours by hand, from the finest
          things we can find. Sold back at a fair price to the very people it came from. There is a
          poetry to it, if you don&rsquo;t think about it too hard.
        </p>
        <p className="soapmeta rev">$20 A BAR · ALL NATURAL · HANDMADE · 537 PAPER STREET</p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="foot">
        <div className="big flick">THIS IS YOUR LIFE,<br />AND IT&rsquo;S ENDING ONE<br />MINUTE AT A TIME.</div>
        <p className="q">&ldquo;On a long enough timeline, the survival rate for everyone drops to zero.&rdquo;</p>
        <div style={{ marginTop: 40 }}>
          <span className="regmark" /><span className="regmark" /><span className="regmark" />
        </div>
        <div className="footmeta">
          THIS WEBSITE HAS NO PURPOSE · BUILT TO SCRATCH AN ITCH · AND TO SHOW OFF<br />
          AN UNAUTHORIZED HOMAGE · NOT AFFILIATED WITH ANYONE — LEAST OF ALL YOURSELF<br />
          © THE FIRST RULE · YOU MET ME AT A VERY STRANGE TIME IN MY LIFE
        </div>
      </footer>

      {/* boot overlay last so it sits on top */}
      {booting && <Boot onDone={() => setBooting(false)} />}
    </div>
  );
}
