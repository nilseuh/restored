import { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, useInView } from 'framer-motion';
import ChatSystem from '../components/ChatSystem';

const SUBJECT_MAX = 100;
const BODY_MIN = 10;
const BODY_MAX = 5000;
const STORAGE_KEY = 'restored_messages';

const CATEGORIES = [
  { id: 'famille', label: 'Famille', icon: '🏠' },
  { id: 'travail', label: 'Travail', icon: '💼' },
  { id: 'amour', label: 'Amour', icon: '❤️' },
  { id: 'sante', label: 'Santé', icon: '🩺' },
  { id: 'autre', label: 'Autre', icon: '💭' },
];

const MOODS = [
  { id: 'triste', emoji: '😢', label: 'Triste' },
  { id: 'anxieux', emoji: '😰', label: 'Anxieux·se' },
  { id: 'en-colere', emoji: '😤', label: 'En colère' },
  { id: 'perdu', emoji: '🤔', label: 'Perdu·e' },
  { id: 'fatigue', emoji: '😔', label: 'Fatigué·e' },
  { id: 'neutre', emoji: '😐', label: 'Neutre' },
];

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveToHistory(message) {
  const history = getHistory();
  history.unshift(message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

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
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [mood, setMood] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [history, setHistory] = useState(getHistory);

  const canSubmit = body.length >= BODY_MIN && body.length <= BODY_MAX && status !== 'sending';

  async function handleSubmit(e) {
    e.preventDefault();

    if (honeypot) {
      setStatus('success');
      return;
    }

    if (!canSubmit) return;
    setStatus('sending');

    try {
      await addDoc(collection(db, 'messages'), {
        subject: subject.trim() || null,
        body: body.trim(),
        category: category || null,
        mood: mood || null,
        createdAt: serverTimestamp(),
      });

      const newMessage = {
        id: crypto.randomUUID(),
        subject: subject.trim() || null,
        body: body.trim(),
        category: category || null,
        mood: mood || null,
        date: new Date().toISOString(),
      };

      saveToHistory(newMessage);
      setHistory(getHistory());
      setSubject('');
      setBody('');
      setCategory('');
      setMood('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  const categoryLabel = CATEGORIES.find(c => c.id === category);
  const moodLabel = MOODS.find(m => m.id === mood);

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
          Partagez ce qui vous pèse, en toute confidentialité.
          Aucune information personnelle n'est collectée.
        </p>
      </motion.div>

      <Reveal delay={0.2}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Mood selector */}
          <div>
            <label className="block text-sm font-semibold text-sand-900 dark:text-sand-50 mb-3">
              Comment vous sentez-vous ? <span className="font-normal text-sand-300 dark:text-sand-600">(optionnel)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((m) => (
                <motion.button
                  key={m.id}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMood(mood === m.id ? '' : m.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all duration-200 border ${
                    mood === m.id
                      ? 'bg-sand-600 text-sand-50 border-sand-600 shadow-lg shadow-sand-600/20'
                      : 'bg-sand-50 dark:bg-white/5 text-sand-600 dark:text-sand-300 border-sand-300 dark:border-sand-600/30 hover:border-sand-600'
                  }`}
                >
                  <motion.span
                    animate={mood === m.id ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-lg"
                  >
                    {m.emoji}
                  </motion.span>
                  {m.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category selector */}
          <div>
            <label className="block text-sm font-semibold text-sand-900 dark:text-sand-50 mb-3">
              Catégorie <span className="font-normal text-sand-300 dark:text-sand-600">(optionnel)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <motion.button
                  key={c.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(category === c.id ? '' : c.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all duration-200 border ${
                    category === c.id
                      ? 'bg-sand-600 text-sand-50 border-sand-600 shadow-lg shadow-sand-600/20'
                      : 'bg-sand-50 dark:bg-white/5 text-sand-600 dark:text-sand-300 border-sand-300 dark:border-sand-600/30 hover:border-sand-600'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  {c.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-sand-900 dark:text-sand-50 mb-2">
              Sujet <span className="font-normal text-sand-300 dark:text-sand-600">(optionnel)</span>
            </label>
            <input
              id="subject"
              type="text"
              maxLength={SUBJECT_MAX}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="De quoi souhaitez-vous parler ?"
              className="w-full px-4 py-3 rounded-xl border border-sand-300 dark:border-sand-600/30 bg-white dark:bg-white/5 text-sand-900 dark:text-sand-50 placeholder-sand-300 dark:placeholder-sand-600 focus:outline-none focus:ring-2 focus:ring-sand-600 focus:border-transparent transition-all duration-200 hover:border-sand-600"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-semibold text-sand-900 dark:text-sand-50 mb-2">
              Votre message
            </label>
            <textarea
              id="body"
              required
              minLength={BODY_MIN}
              maxLength={BODY_MAX}
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Exprimez-vous librement..."
              className="w-full px-4 py-3 rounded-xl border border-sand-300 dark:border-sand-600/30 bg-white dark:bg-white/5 text-sand-900 dark:text-sand-50 placeholder-sand-300 dark:placeholder-sand-600 focus:outline-none focus:ring-2 focus:ring-sand-600 focus:border-transparent resize-y transition-all duration-200 hover:border-sand-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-sand-300 dark:text-sand-600">
                {body.length > 0 && body.length < BODY_MIN && (
                  <span className="text-sand-600 dark:text-sand-300">Minimum {BODY_MIN} caractères</span>
                )}
              </span>
              <span className={`text-xs transition-colors ${
                body.length > BODY_MAX * 0.9 ? 'text-sand-600 dark:text-sand-300 font-semibold' : 'text-sand-300 dark:text-sand-600'
              }`}>
                {body.length} / {BODY_MAX}
              </span>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02, y: -2 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            className="w-full bg-sand-600 text-sand-50 py-4 rounded-full font-semibold hover:bg-sand-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sand-600/20 hover:shadow-xl hover:shadow-sand-600/30"
          >
            {status === 'sending' ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-sand-50 border-t-transparent rounded-full"
                />
                Envoi en cours...
              </span>
            ) : (
              'Envoyer anonymement'
            )}
          </motion.button>

          {/* Status messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sand-100 dark:bg-white/5 border border-sand-300 dark:border-sand-600/30 rounded-xl p-6 text-center"
            >
              <p className="text-sand-900 dark:text-sand-50 font-semibold text-lg">Merci pour votre message</p>
              <p className="text-sand-600 dark:text-sand-300 text-sm mt-2">
                Il a été envoyé de manière anonyme. Prenez soin de vous.
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6 text-center"
            >
              <p className="text-red-800 dark:text-red-300 font-semibold">Votre message n'a pas pu être envoyé.</p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                Vérifiez votre connexion et réessayez.
              </p>
            </motion.div>
          )}
        </form>
      </Reveal>

      {/* Message history */}
      <Reveal delay={0.3}>
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-sand-900 dark:text-sand-50">
              Vos messages envoyés
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-sand-300 hover:text-sand-600 transition-colors"
              >
                Effacer l'historique
              </button>
            )}
          </div>

          <p className="text-xs text-sand-300 dark:text-sand-600 mb-4">
            Cet historique est stocké uniquement sur votre navigateur.
          </p>

          {history.length === 0 ? (
            <p className="text-sand-300 dark:text-sand-600 text-center py-8">
              Aucun message envoyé pour le moment.
            </p>
          ) : (
            <div className="space-y-4">
              {history.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="bg-sand-100 dark:bg-white/5 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {msg.mood && (
                        <span className="text-base">{MOODS.find(m => m.id === msg.mood)?.emoji}</span>
                      )}
                      <span className="text-sm font-semibold text-sand-900 dark:text-sand-50">
                        {msg.subject || 'Sans sujet'}
                      </span>
                      {msg.category && (
                        <span className="text-xs bg-sand-300/30 dark:bg-sand-600/20 text-sand-600 dark:text-sand-300 px-2 py-0.5 rounded-full">
                          {CATEGORIES.find(c => c.id === msg.category)?.label}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-sand-300 dark:text-sand-600">
                      {new Date(msg.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-sand-600 dark:text-sand-300 line-clamp-3">
                    {msg.body}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </Reveal>

      {/* Live Chat with Vanessa */}
      <Reveal delay={0.4}>
        <section className="mt-16">
          <h2 className="font-serif text-xl font-bold text-sand-900 dark:text-sand-50 text-center mb-2">
            Discuter en direct avec Vanessa
          </h2>
          <p className="text-sand-600 dark:text-sand-300 text-center text-sm mb-8">
            Vous pouvez également échanger en temps réel via la messagerie ci-dessous.
          </p>
          <ChatSystem />
        </section>
      </Reveal>
    </div>
  );
}
