import { useState } from 'react';
import { spark } from '../lib/sfx.js';

export default function NavBar({ currentPage }) {
  const [glitching, setGlitching] = useState(false);

  const links = [
    { href: '#/', label: 'THE LAW', num: '01' },
    { href: '#/gate', label: 'THE GATE', num: '02' },
    { href: '#/court', label: 'THE COURT', num: '03' },
    { href: '#/journey', label: 'THE JOURNEY', num: '04' },
    { href: '#/alchemy', label: 'ALCHEMY', num: '05' },
  ];

  const handleLinkClick = () => {
    spark();
    setGlitching(true);
    setTimeout(() => setGlitching(false), 240);
  };

  return (
    <nav className={`navbar ${glitching ? 'glitch-active' : ''}`}>
      <div className="nav-logo">
        <span className="logo-symbol">⚭</span>
        <span className="logo-text">STATE ALCHEMIST // DATABASE</span>
      </div>

      <div className="nav-links">
        {links.map((link) => {
          const isActive = currentPage === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <span className="link-num">[{link.num}]</span>
              <span className="link-label">{link.label}</span>
            </a>
          );
        })}
      </div>

      <div className="nav-status">
        <span className="status-indicator"></span>
        <span className="status-text">CENTRAL: CONNECTED</span>
      </div>
    </nav>
  );
}
