import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

const resources = [
  {
    title: 'Prendre soin de sa santé mentale',
    description: 'La santé mentale est tout aussi importante que la santé physique. Il est normal de ne pas aller bien et de demander de l\'aide.',
    icon: '🧠',
  },
  {
    title: 'L\'importance de s\'exprimer',
    description: 'Verbaliser ses émotions, même par écrit, aide à les comprendre et à les apprivoiser. C\'est un acte de courage, pas de faiblesse.',
    icon: '💬',
  },
  {
    title: 'Vous n\'êtes pas seul·e',
    description: 'Quelle que soit votre épreuve, d\'autres personnes traversent ou ont traversé la même chose. Des ressources existent pour vous accompagner.',
    icon: '🤝',
  },
  {
    title: 'Le premier pas',
    description: 'Reconnaître que l\'on a besoin d\'aide est déjà un immense pas. Soyez fier·e de vous pour chaque effort, aussi petit soit-il.',
    icon: '🌱',
  },
];

export default function Resources() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-sand-900 dark:text-sand-50 mb-4">
            Accompagnement & Ressources
          </h1>
          <p className="text-sand-600 dark:text-sand-300 text-lg leading-relaxed">
            Si vous traversez une période difficile, vous n'êtes pas seul·e.
            Voici des ressources et numéros d'écoute disponibles pour vous.
          </p>
        </motion.div>
      </section>

      {/* Bien-être articles */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 dark:text-sand-50 text-center mb-12">
              Prendre soin de soi
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res, i) => (
              <Reveal key={res.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-sand-100 dark:bg-white/5 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-sand-300/50 dark:hover:border-sand-600/30"
                >
                  <span className="text-3xl mb-4 block">{res.icon}</span>
                  <h3 className="font-serif text-lg font-semibold text-sand-900 dark:text-sand-50 mb-2">
                    {res.title}
                  </h3>
                  <p className="text-sm text-sand-600 dark:text-sand-300 leading-relaxed">
                    {res.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Encouraging note */}
      <section className="bg-sand-900 dark:bg-sand-900/80 py-16 md:py-20 px-4">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif text-xl md:text-2xl text-sand-50 italic leading-relaxed mb-4">
              « Demander de l'aide n'est pas un signe de faiblesse,
              c'est un acte de courage. »
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
