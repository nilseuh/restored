import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import CustomCursor from './components/CustomCursor';
import useDarkMode from './hooks/useDarkMode';

export const ThemeContext = createContext();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ressources" element={<Resources />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <BrowserRouter>
        <div className="min-h-screen bg-sand-50 dark:bg-[#1a1612] flex flex-col transition-colors duration-500">
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
