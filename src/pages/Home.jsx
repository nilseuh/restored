import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Reusable scroll-reveal wrapper
function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Animated counter component
function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

// Infinite marquee component
function Marquee() {
  const words = [
    'Anonyme', 'Bienveillant', 'Sûr', 'Confidentiel', 'Sans jugement',
    'Libre', 'Respectueux', 'Apaisant', 'Réparateur', 'Humain',
  ];
  const repeated = [...words, ...words];

  return (
    <div className="overflow-hidden py-6 bg-sand-900">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((word, i) => (
          <span key={i} className="text-sand-300 text-sm md:text-base font-medium tracking-widest uppercase">
            {word} <span className="text-sand-600 mx-4">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero with animated gradient */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-sand-50" />
          <motion.div
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, #C9B99A 0%, transparent 50%)',
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-30%] right-[-30%] w-[150%] h-[150%] opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, #8B7355 0%, transparent 50%)',
            }}
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 60, -40, 0],
              scale: [1, 0.8, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-sand-900 mb-6">
              Restored
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-sand-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Un espace sûr pour déposer ce qui vous pèse, en toute confidentialité.
            Ici, vous pouvez partager vos challenges de vie de manière anonyme,
            sans crainte d'être jugé·e.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="group relative inline-block bg-sand-600 text-sand-50 px-10 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sand-600/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Écrire un message</span>
              <span className="absolute inset-0 bg-sand-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex justify-center gap-12 md:gap-20"
          >
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900">
                <AnimatedCounter target={100} />%
              </div>
              <p className="text-sm text-sand-600 mt-1">Anonyme</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900">
                <AnimatedCounter target={0} />
              </div>
              <p className="text-sm text-sand-600 mt-1">Données collectées</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900">
                24<span className="text-sand-600">/</span>7
              </div>
              <p className="text-sm text-sand-600 mt-1">Disponible</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee banner */}
      <Marquee />

      {/* Comment ça marche */}
      <section className="bg-sand-100 py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 text-center mb-16">
              Comment ça marche
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Écrivez',
                desc: 'Rédigez votre message en toute liberté. Pas besoin de vous identifier.',
              },
              {
                step: '2',
                title: 'Envoyez',
                desc: 'Votre message arrive de manière totalement anonyme. Personne ne saura qui vous êtes.',
              },
              {
                step: '3',
                title: 'Respirez',
                desc: 'Vous avez fait un pas. Déposer ce qui pèse, c\'est déjà beaucoup.',
              },
            ].map(({ step, title, desc }, i) => (
              <Reveal key={step} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-center bg-sand-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-sand-600 text-sand-50 flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-sand-600/20">
                    {step}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-sand-900 mb-3">{title}</h3>
                  <p className="text-sand-600 leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Vanessa */}
      <section className="bg-sand-50 py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Photo placeholder with animation */}
            <Reveal direction="left">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-36 h-36 rounded-full bg-gradient-to-br from-sand-300 to-sand-600 flex items-center justify-center flex-shrink-0 shadow-xl shadow-sand-300/30"
              >
                <span className="font-serif text-5xl font-bold text-sand-50">V</span>
              </motion.div>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 mb-4">
                  À propos de Vanessa
                </h2>
                <p className="text-sand-600 leading-relaxed mb-4">
                  Passionnée par les relations humaines et le bien-être émotionnel,
                  Vanessa a suivi un parcours en psychologie et en relation d'aide.
                  Après plusieurs années d'accompagnement auprès de personnes traversant
                  des périodes difficiles, elle a constaté un besoin profond : pouvoir
                  s'exprimer librement, sans filtre et sans peur du jugement.
                </p>
                <p className="text-sand-600 leading-relaxed">
                  C'est de cette conviction qu'est né <strong className="text-sand-900">Restored</strong> —
                  un espace où chacun peut déposer ses fardeaux en toute sécurité.
                  Vanessa lit personnellement chaque message avec bienveillance et respect,
                  parce qu'elle croit que le simple fait d'exprimer ce qui pèse
                  est déjà un premier pas vers la guérison.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-sand-900 py-20 md:py-28 px-4">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-sand-50 mb-6">
              Prêt·e à vous exprimer ?
            </h2>
            <p className="text-sand-300 mb-10 leading-relaxed">
              Votre message est anonyme. Il n'y a aucun risque, aucune inscription,
              aucun jugement. Juste un espace pour vous.
            </p>
            <Link
              to="/contact"
              className="group relative inline-block bg-sand-50 text-sand-900 px-10 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sand-50/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Déposer un message</span>
              <span className="absolute inset-0 bg-sand-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
