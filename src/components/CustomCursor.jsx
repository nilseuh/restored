import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setHovering(!!target);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleLeave);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 24 : 12),
          y: pos.y - (hovering ? 24 : 12),
          width: hovering ? 48 : 24,
          height: hovering ? 48 : 24,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className={`w-full h-full rounded-full border-2 transition-colors duration-200 ${
          hovering ? 'border-sand-300 bg-sand-300/10' : 'border-sand-600'
        }`} />
      </motion.div>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 2000, damping: 50 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-sand-600" />
      </motion.div>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
