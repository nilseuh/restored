import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { dark, setDark } = useContext(ThemeContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/contact', label: 'Espace d\'échange' },
    { to: '/ressources', label: 'Ressources' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sand-50/80 dark:bg-[#1a1612]/80 backdrop-blur-lg shadow-md'
          : 'bg-sand-50 dark:bg-[#1a1612] shadow-sm dark:shadow-none'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold text-sand-900 dark:text-sand-50 hover:scale-105 transition-transform">
          Restored
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop links */}
          <div className="hidden md:flex gap-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-all duration-200 relative group ${
                  location.pathname === link.to
                    ? 'text-sand-900 dark:text-sand-50 font-semibold'
                    : 'text-sand-600 dark:text-sand-300 hover:text-sand-900 dark:hover:text-sand-50'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-sand-600 dark:bg-sand-300 transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-sand-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={false}
              animate={{ rotate: dark ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {dark ? (
                <svg className="w-5 h-5 text-sand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-sand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.div>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-sand-900 dark:text-sand-50 hover:scale-110 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-sand-100 dark:border-sand-900 overflow-hidden"
          >
            <div className="px-4 pb-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className={`block py-2 text-sm ${
                      location.pathname === link.to
                        ? 'text-sand-900 dark:text-sand-50 font-semibold'
                        : 'text-sand-600 dark:text-sand-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
