import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Savorly home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 27V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M16 17c-7.3 0-10-4.4-10-10 6.4 0 10 2.8 10 10Z" fill="currentColor" />
              <path d="M16 13c0-5.3 3.2-8 9.2-8 .2 5.6-2.8 8-9.2 8Z" fill="currentColor" opacity=".68" />
            </svg>
          </span>
          <span className="brand-name">savorly<span>.</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Discover</Link>
          <a href="/#recipes" className="nav-cta">
            Find your next favorite
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
