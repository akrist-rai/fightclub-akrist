import { useEffect, useState } from 'react';
import { FxProvider, useFx, useFxState } from './context/Fx.jsx';

import Ambient from './components/Ambient.jsx';
import SideNav from './components/SideNav.jsx';
import Boot from './components/Boot.jsx';
import Hero from './components/Hero.jsx';
import SceneBreak from './components/SceneBreak.jsx';
import GunMonologue from './components/GunMonologue.jsx';
import Manifesto from './components/Manifesto.jsx';
import Support from './components/Support.jsx';
import Rules from './components/Rules.jsx';
import ChemicalBurn from './components/ChemicalBurn.jsx';
import IdCard from './components/IdCard.jsx';
import Jack from './components/Jack.jsx';
import CopyInsomnia from './components/CopyInsomnia.jsx';
import Consume from './components/Consume.jsx';
import Newspaper from './components/Newspaper.jsx';
import Homework from './components/Homework.jsx';
import Raymond from './components/Raymond.jsx';
import Soap from './components/Soap.jsx';
import Reveal from './components/Reveal.jsx';
import Demolition from './components/Demolition.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <FxProvider>
      <Site />
    </FxProvider>
  );
}

function Site() {
  const fx = useFx();
  const { glitching } = useFxState();
  const [booting, setBooting] = useState(true);

  // Reveal-on-scroll: one observer for every .rev element (all rendered at mount).
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rev').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock scroll while the boot overlay is up.
  useEffect(() => { document.body.classList.toggle('lockscroll', booting); }, [booting]);

  // Kick off subliminal flashes once the boot sequence is dismissed.
  useEffect(() => { if (!booting) return fx.startSubliminals(); }, [booting, fx]);

  return (
    <>
      <Ambient />
      <SideNav />
      <main className={glitching ? 'glitching' : undefined}>
        <Hero />
        <SceneBreak id="meet" img="img/we-dont-talk.jpg" alt="The narrator and Tyler" reelLeft="REEL 01 · 24FPS" reelRight="SCENE 02 — SINGLE-SERVING" cap={'“This is how I met Tyler Durden.”'} />
        <GunMonologue />
        <Manifesto />
        <SceneBreak img="img/tyler-smoke.jpg" alt="Tyler Durden" reelLeft="REEL 01" reelRight="SCENE 04 — THE OFFER" cap={'“Is this the life you really want?”'} />
        <Support />
        <Rules />
        <ChemicalBurn />
        <IdCard />
        <Jack />
        <CopyInsomnia />
        <Consume />
        <SceneBreak img="img/nobody-cares.jpg" alt="Nobody cares unless you win or die" reelLeft="REEL 02" reelRight="SCENE 09 — PROJECT MAYHEM" cap={'“Nobody cares unless you win or die.”'} />
        <Newspaper />
        <Homework />
        <Raymond />
        <SceneBreak img="img/control-letgo.jpg" alt="Stop trying to control everything and just let go" reelLeft="REEL 03" reelRight="SCENE 14 — THE WHEEL" cap={'“Stop trying to control everything and just let go.”'} />
        <Soap />
        <Reveal />
        <Demolition />
        <Footer />
      </main>
      {booting && <Boot onDone={() => setBooting(false)} />}
    </>
  );
}
