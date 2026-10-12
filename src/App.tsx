import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { HowToPlayPage } from './pages/HowToPlayPage';
import { ReactionTimePage } from './pages/ReactionTimePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);

    // Intercept internal link clicks for instant SPA feel while preserving crawlable hrefs
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Only intercept internal relative links
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !target.hasAttribute('download') &&
        target.target !== '_blank'
      ) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Route matching
  const normalizedPath = currentPath.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

  if (normalizedPath === '/' || normalizedPath === '') {
    return <HomePage />;
  }
  if (normalizedPath === '/how-to-play') {
    return <HowToPlayPage />;
  }
  if (normalizedPath === '/reaction-time-game') {
    return <ReactionTimePage />;
  }
  if (normalizedPath === '/about') {
    return <AboutPage />;
  }
  if (normalizedPath === '/privacy') {
    return <PrivacyPage />;
  }

  return <NotFoundPage />;
}
