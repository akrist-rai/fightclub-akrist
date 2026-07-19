import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { initAudio, spark } from './lib/sfx.js';
import Ambient from './components/Ambient.jsx';
import Cover from './components/Cover.jsx';
import NavBar from './components/NavBar.jsx';
import Exchange from './components/Exchange.jsx';
import Taboo from './components/Taboo.jsx';
import Gate from './components/Gate.jsx';
import Court from './components/Court.jsx';
import Beats from './components/Beats.jsx';
import Bonds from './components/Bonds.jsx';
import Journey from './components/Journey.jsx';
import Alchemy from './components/Alchemy.jsx';
import Lessons from './components/Lessons.jsx';
import { BROTHERS, COST } from './data.js';

export default function App() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');
  const [glitching, setGlitching] = useState(false);

  // Set up state hash router
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Trigger a page change screen glitch
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPageContent = () => {
    switch (currentPage) {
      case '#/gate':
        return <Gate />;
      case '#/court':
        return (
          <>
            <Court />
            <Beats
              title="The Cost"
              sub="WHAT SACRIFICE LOOKS LIKE"
              glyph="🜂"
              accent="cold"
              lede="Every step forward in this world is paid for by someone. These are a few of the bills that came due."
              beats={COST}
            />
          </>
        );
      case '#/journey':
        return (
          <>
            <Beats
              title="The Elric Brothers"
              sub="THE PROMISE"
              glyph="⚭"
              accent="verdant"
              lede="Two boys who tried to defy death, paid dearly for it, and spent everything they had left putting each other back together."
              beats={BROTHERS}
            />
            <Bonds />
            <Journey />
          </>
        );
      case '#/alchemy':
        return (
          <>
            <Alchemy />
            <Lessons />
          </>
        );
      case '#/':
      default:
        return (
          <>
            <Exchange />
            <Taboo />
          </>
        );
    }
  };

  return (
    <div className={`desk ${glitching ? 'glitching' : ''}`}>
      <Ambient />
      <AnimatePresence mode="wait">
        {open ? (
          <div key="portal-interface" className="portal-interface">
            <NavBar currentPage={currentPage} />
            <main className="portal-main">
              {renderPageContent()}
            </main>
            <footer className="portal-footer">
              <span>AMESTRIS MILITARY STATE CLASSIFIED DOSSIER DATABASE © 1914</span>
              <span>EQUIVALENT EXCHANGE SYSTEM V1.0</span>
            </footer>
          </div>
        ) : (
          <Cover key="cover" onOpen={() => { initAudio(); spark(); setOpen(true); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
