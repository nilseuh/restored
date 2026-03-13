import { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, useInView } from 'framer-motion';

const SUBJECT_MAX = 100;
const BODY_MIN = 10;
const BODY_MAX = 5000;
const STORAGE_KEY = 'restored_messages';

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
        createdAt: serverTimestamp(),
      });

      const newMessage = {
        id: crypto.randomUUID(),
        subject: subject.trim() || null,
        body: body.trim(),
        date: new Date().toISOString(),
      };

      saveToHistory(newMessage);
      setHistory(getHistory());
      setSubject('');
      setBody('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 text-center mb-4">
          Espace d'échange
        </h1>
        <p className="text-sand-600 text-center mb-10 leading-relaxed">
          Partagez ce qui vous pèse, en toute confidentialité.
          Aucune information personnelle n'est collectée.
        </p>
      </motion.div>

      <Reveal delay={0.2}>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-sand-900 mb-2">
              Sujet <span className="font-normal text-sand-300">(optionnel)</span>
            </label>
            <input
              id="subject"
              type="text"
              maxLength={SUBJECT_MAX}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="De quoi souhaitez-vous parler ?"
              className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white text-sand-900 placeholder-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-600 focus:border-transparent transition-all duration-200 hover:border-sand-600"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-semibold text-sand-900 mb-2">
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
              className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white text-sand-900 placeholder-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-600 focus:border-transparent resize-y transition-all duration-200 hover:border-sand-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-sand-300">
                {body.length > 0 && body.length < BODY_MIN && (
                  <span className="text-sand-600">Minimum {BODY_MIN} caractères</span>
                )}
              </span>
              <span className={`text-xs transition-colors ${
                body.length > BODY_MAX * 0.9 ? 'text-sand-600 font-semibold' : 'text-sand-300'
              }`}>
                {body.length} / {BODY_MAX}
              </span>
            </div>
          </div>

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

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sand-100 border border-sand-300 rounded-xl p-6 text-center"
            >
              <p className="text-sand-900 font-semibold text-lg">Merci pour votre message</p>
              <p className="text-sand-600 text-sm mt-2">
                Il a été envoyé de manière anonyme. Prenez soin de vous.
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
            >
              <p className="text-red-800 font-semibold">Votre message n'a pas pu être envoyé.</p>
              <p className="text-red-600 text-sm mt-2">
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
            <h2 className="font-serif text-xl font-bold text-sand-900">
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

          <p className="text-xs text-sand-300 mb-4">
            Cet historique est stocké uniquement sur votre navigateur.
          </p>

          {history.length === 0 ? (
            <p className="text-sand-300 text-center py-8">
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
                  className="bg-sand-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-sand-900">
                      {msg.subject || 'Sans sujet'}
                    </span>
                    <span className="text-xs text-sand-300">
                      {new Date(msg.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-sand-600 line-clamp-3">
                    {msg.body}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
}
