import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <span className="not-found-mark" aria-hidden="true">404</span>
      <p className="eyebrow">A LITTLE OFF THE MENU</p>
      <h1>This page isn’t<br />on our menu.</h1>
      <p className="not-found-copy">The page you’re looking for has wandered off. Let’s get you back to something tasty.</p>
      <Link to="/" className="hero-button">
        Back to discover
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </main>
  );
}

export default NotFound;
