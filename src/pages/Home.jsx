import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Particles from '../components/Particles';

// --- Reusable components ---

function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: { y: 60 }, down: { y: -60 }, left: { x: -60 }, right: { x: 60 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 0, y: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}</span>;
}

// Letter-by-letter text reveal
function TextReveal({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Marquee
function Marquee() {
  const words = [
    'Anonyme', 'Bienveillant', 'Sûr', 'Confidentiel', 'Sans jugement',
    'Libre', 'Respectueux', 'Apaisant', 'Réparateur', 'Humain',
  ];
  const repeated = [...words, ...words];
  return (
    <div className="overflow-hidden py-6 bg-sand-900 dark:bg-sand-50/10">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((word, i) => (
          <span key={i} className="text-sand-300 dark:text-sand-300 text-sm md:text-base font-medium tracking-widest uppercase">
            {word} <span className="text-sand-600 mx-4">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Testimonials carousel
function Testimonials() {
  const testimonials = [
    { text: "Ça m'a fait un bien fou de simplement écrire ce que j'avais sur le cœur. Merci pour cet espace.", author: "Anonyme" },
    { text: "Je n'osais en parler à personne. Ici, j'ai pu tout déposer sans crainte. Je me sens plus léger·e.", author: "Anonyme" },
    { text: "Le simple fait de savoir que quelqu'un lit avec bienveillance m'a redonné de l'espoir.", author: "Anonyme" },
    { text: "Parfois on a juste besoin d'un endroit sûr pour dire les choses. Restored est cet endroit.", author: "Anonyme" },
    { text: "Je reviens régulièrement. C'est devenu mon journal intime anonyme. Merci Vanessa.", author: "Anonyme" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="bg-sand-100 dark:bg-white/5 py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50 text-center mb-16">
            Ce qu'ils en disent
          </h2>
        </Reveal>

        <div className="relative h-48 md:h-40 flex items-center justify-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 0.9,
                y: i === current ? 0 : 20,
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              style={{ pointerEvents: i === current ? 'auto' : 'none' }}
            >
              <p className="text-lg md:text-xl text-sand-600 dark:text-sand-300 italic leading-relaxed mb-4">
                "{t.text}"
              </p>
              <span className="text-sm text-sand-300 dark:text-sand-600">— {t.author}</span>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-sand-600 scale-125'
                  : 'bg-sand-300 hover:bg-sand-600/50'
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Daily Bible verse
function DailyVerse() {
  const verses = [
    { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", ref: "Jérémie 29:11" },
    { text: "L'Éternel est près de ceux qui ont le cœur brisé, et il sauve ceux qui ont l'esprit dans l'abattement.", ref: "Psaume 34:19" },
    { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", ref: "Matthieu 11:28" },
    { text: "Quand tu traverseras les eaux, je serai avec toi ; et les fleuves, ils ne te submergeront point.", ref: "Ésaïe 43:2" },
    { text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.", ref: "Psaume 46:2" },
    { text: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu.", ref: "Ésaïe 41:10" },
    { text: "Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.", ref: "Psaume 147:3" },
    { text: "Remets ton sort à l'Éternel, et il te soutiendra ; il ne laissera jamais chanceler le juste.", ref: "Psaume 55:23" },
    { text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.", ref: "Ésaïe 40:31" },
    { text: "Car Dieu ne nous a pas donné un esprit de timidité, mais de force, d'amour et de sagesse.", ref: "2 Timothée 1:7" },
    { text: "L'Éternel combattra pour vous ; et vous, gardez le silence.", ref: "Exode 14:14" },
    { text: "La paix je vous laisse, ma paix je vous donne. Que votre cœur ne se trouble point, et ne s'alarme point.", ref: "Jean 14:27" },
  ];

  // Pick verse based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const verse = verses[dayOfYear % verses.length];

  return (
    <section className="py-16 md:py-20 px-4 bg-sand-50 dark:bg-transparent">
      <Reveal>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-sand-300 dark:text-sand-600 mb-4">Verset du jour</p>
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-xl md:text-2xl text-sand-900 dark:text-sand-50 italic leading-relaxed mb-4"
          >
            « {verse.text} »
          </motion.blockquote>
          <p className="text-sm text-sand-600 dark:text-sand-300 font-semibold">{verse.ref}</p>
        </div>
      </Reveal>
    </section>
  );
}

// --- Main Home component ---

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="overflow-hidden">
      {/* Hero with parallax, particles, gradient */}
      <section ref={heroRef} className="relative py-28 md:py-44 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-sand-50 dark:bg-transparent" />
          <motion.div
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30"
            style={{ background: 'radial-gradient(ellipse at center, #C9B99A 0%, transparent 50%)' }}
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-30%] right-[-30%] w-[150%] h-[150%] opacity-20"
            style={{ background: 'radial-gradient(ellipse at center, #8B7355 0%, transparent 50%)' }}
            animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0], scale: [1, 0.8, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Particles */}
        <Particles count={25} />

        {/* Parallax content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sand-900 dark:text-sand-50 mb-6">
            <TextReveal text="Restored" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-sand-600 dark:text-sand-300 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Un espace sûr pour déposer ce qui vous pèse, en toute confidentialité.
            Ici, vous pouvez partager vos challenges de vie de manière anonyme,
            sans crainte d'être jugé·e.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
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
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16 flex justify-center gap-12 md:gap-20"
          >
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50">
                <AnimatedCounter target={100} />%
              </div>
              <p className="text-sm text-sand-600 dark:text-sand-300 mt-1">Anonyme</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50">
                <AnimatedCounter target={0} />
              </div>
              <p className="text-sm text-sand-600 dark:text-sand-300 mt-1">Données collectées</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50">
                24<span className="text-sand-600 dark:text-sand-300">/</span>7
              </div>
              <p className="text-sm text-sand-600 dark:text-sand-300 mt-1">Disponible</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Daily verse */}
      <DailyVerse />

      {/* Comment ça marche */}
      <section className="bg-sand-100 dark:bg-white/5 py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 dark:text-sand-50 text-center mb-16">
              Comment ça marche
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '1', title: 'Écrivez', desc: 'Rédigez votre message en toute liberté. Pas besoin de vous identifier.' },
              { step: '2', title: 'Envoyez', desc: 'Votre message arrive de manière totalement anonyme. Personne ne saura qui vous êtes.' },
              { step: '3', title: 'Respirez', desc: 'Vous avez fait un pas. Déposer ce qui pèse, c\'est déjà beaucoup.' },
            ].map(({ step, title, desc }, i) => (
              <Reveal key={step} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-center bg-sand-50 dark:bg-white/5 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-sand-300/50 dark:hover:border-sand-600/30"
                >
                  <div className="w-16 h-16 rounded-full bg-sand-600 text-sand-50 flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-sand-600/20">
                    {step}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-sand-900 dark:text-sand-50 mb-3">{title}</h3>
                  <p className="text-sand-600 dark:text-sand-300 leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Bio Vanessa */}
      <section className="bg-sand-50 dark:bg-transparent py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
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
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 dark:text-sand-50 mb-4">
                  À propos de Vanessa
                </h2>
                <p className="text-sand-600 dark:text-sand-300 leading-relaxed mb-4">
                  Passionnée par les relations humaines et le bien-être émotionnel,
                  Vanessa a suivi un parcours en psychologie et en relation d'aide.
                  Après plusieurs années d'accompagnement auprès de personnes traversant
                  des périodes difficiles, elle a constaté un besoin profond : pouvoir
                  s'exprimer librement, sans filtre et sans peur du jugement.
                </p>
                <p className="text-sand-600 dark:text-sand-300 leading-relaxed">
                  C'est de cette conviction qu'est né <strong className="text-sand-900 dark:text-sand-50">Restored</strong> —
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
      <section className="bg-sand-900 dark:bg-sand-900/80 py-20 md:py-28 px-4">
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
