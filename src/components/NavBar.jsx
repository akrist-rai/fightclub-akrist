import { useFx } from '../context/Fx.jsx';

export default function NavBar({ currentPage }) {
  const fx = useFx();
  const links = [
    { path: '#/', label: 'HOME', code: '01' },
    { path: '#/rules', label: 'RULES', code: '02' },
    { path: '#/identity', label: 'IDENTITY', code: '03' },
    { path: '#/mayhem', label: 'MAYHEM', code: '04' },
    { path: '#/demolition', label: 'END', code: '05' },
  ];

  const handleLinkClick = () => {
    // Play a thematic glitch effect on page transition
    fx.triggerGlitch();
    if (Math.random() > 0.4) {
      fx.flash(['PAIN', 'ALIVE', 'WAKE UP', 'TYLER'][Math.floor(Math.random() * 4)]);
    }
  };

  return (
    <nav className="navbar">
      <a className="navbar-logo" href="#/" aria-label="Fight Club home">
        <span className="navbar-mark">FC</span>
        <span className="navbar-wordmark">FIGHT<br />CLUB</span>
        <span className="navbar-edition mono">EST. 1999</span>
      </a>
      <div className="navbar-center mono" aria-hidden="true">
        <span>PROJECT MAYHEM</span><i /> <span>537 PAPER ST.</span>
      </div>
      <ul className="navbar-links">
        {links.map((link) => {
          const isActive = currentPage === link.path || (link.path === '#/' && (currentPage === '' || currentPage === '#/'));
          return (
            <li key={link.path}>
              <a
                href={link.path}
                className={isActive ? 'active' : ''}
                onClick={handleLinkClick}
              >
                <span className="mono">[{link.code}]</span> {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="navbar-meta mono">
        <i className="live-dot" /> <span>STATUS: ACTIVE</span>
      </div>
    </nav>
  );
}
