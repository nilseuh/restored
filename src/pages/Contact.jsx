import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ChatSystem from '../components/ChatSystem';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50 text-center mb-4">
          Espace d'échange
        </h1>
        <p className="text-sand-600 dark:text-sand-300 text-center mb-10 leading-relaxed">
          Vous pouvez également échanger en temps réel via la messagerie ci-dessous.
        </p>
      </motion.div>

      <Reveal delay={0.2}>
        <ChatSystem />
      </Reveal>
    </div>
  );
}
