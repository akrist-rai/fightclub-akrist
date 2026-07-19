import { useEffect, useState } from 'react';
import { spark } from './lib/sfx.js';
import Ambient from './components/Ambient.jsx';
import MangaArchive from './components/MangaArchive.jsx';

export default function App() {
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

  return (
    <div className={`desk ${glitching ? 'glitching' : ''}`}>
      <Ambient />
      <div className="portal-interface">
        <main className="portal-main">
          <MangaArchive currentPage={currentPage} />
        </main>
        <footer className="portal-footer">
          <span>FULLMETAL ALCHEMIST BROTHERHOOD · UNOFFICIAL FAN ARCHIVE</span>
          <span>ALL THINGS FLOW · ALL DEBTS RETURN</span>
        </footer>
      </div>
    </div>
  );
}
