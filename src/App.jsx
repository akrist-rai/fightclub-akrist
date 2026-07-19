import { useEffect, useState } from 'react';
import { FxProvider, useFx, useFxState } from './context/Fx.jsx';

import Hud from './components/Hud.jsx';
import Ambient from './components/Ambient.jsx';
import NavBar from './components/NavBar.jsx';
import Boot from './components/Boot.jsx';
import Hero from './components/Hero.jsx';
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
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');

  // Simple state router listening to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reveal-on-scroll: Observe elements dynamically on page change.
  useEffect(() => {
    let obs;
    const timeoutId = setTimeout(() => {
      obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.rev').forEach((el) => obs.observe(el));
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (obs) obs.disconnect();
    };
  }, [currentPage]);

  // Lock scroll while the boot overlay is up.
  useEffect(() => { document.body.classList.toggle('lockscroll', booting); }, [booting]);

  // Kick off subliminal flashes once the boot sequence is dismissed.
  useEffect(() => { if (!booting) return fx.startSubliminals(); }, [booting, fx]);

  const renderPageContent = () => {
    switch (currentPage) {
      case '#/rules':
        return <Rules />;
      case '#/identity':
        return (
          <>
            <ChemicalBurn />
            <IdCard />
            <Jack />
            <CopyInsomnia />
          </>
        );
      case '#/mayhem':
        return (
          <>
            <Consume />
            <Newspaper />
            <Homework />
            <Raymond />
            <Soap />
          </>
        );
      case '#/demolition':
        return (
          <>
            <Reveal />
            <Demolition />
          </>
        );
      case '#/':
      default:
        return (
          <>
            <Hero />
            <GunMonologue />
            <Manifesto />
            <Support />
          </>
        );
    }
  };

  return (
    <>
      <Hud />
      <Ambient />
      <NavBar currentPage={currentPage} />
      <main className={glitching ? 'glitching' : undefined}>
        {renderPageContent()}
        <Footer />
      </main>
      {booting && <Boot onDone={() => setBooting(false)} />}
    </>
  );
}

