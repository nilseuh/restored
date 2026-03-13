# Restored Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React SPA where anyone can anonymously send life challenges to Vanessa, with a zen storytelling homepage and Firebase-backed message storage.

**Architecture:** Vite + React SPA with two pages (Home, Contact), react-router-dom for navigation, Tailwind CSS for styling with custom "Terre & Sable" palette. Firebase Firestore for anonymous write-only message storage. localStorage for client-side message history.

**Tech Stack:** React, Vite, react-router-dom v6, Tailwind CSS v3, Firebase Firestore, Google Font "Lora"

**Spec:** `docs/superpowers/specs/2026-03-13-restored-website-design.md`

> **Note:** The spec uses `.js` extensions and CRA-style paths (`public/index.html`). This plan uses `.jsx` extensions and Vite conventions (`index.html` at root, `src/main.jsx`). This is intentional — Vite's React template uses `.jsx` by default.

---

## File Structure

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind with custom sand palette |
| `postcss.config.js` | PostCSS with Tailwind plugin |
| `index.html` | HTML entry point with Lora font |
| `src/main.jsx` | React entry point, renders App |
| `src/index.css` | Tailwind directives |
| `src/App.jsx` | Router setup (Home + Contact) |
| `src/firebase.js` | Firebase config and Firestore instance |
| `src/components/Navbar.jsx` | Navigation bar with mobile hamburger |
| `src/components/Footer.jsx` | Minimal footer |
| `src/pages/Home.jsx` | Homepage: hero + steps + bio |
| `src/pages/Contact.jsx` | Form + localStorage history |

---

## Chunk 1: Project Scaffolding & Configuration

### Task 1: Scaffold Vite React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Create Vite React project**

```bash
cd /Users/user/Desktop/Vanessa
npm create vite@latest restored -- --template react
```

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/user/Desktop/Vanessa/restored
npm install
npm install react-router-dom firebase
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Verify dev server starts**

```bash
cd /Users/user/Desktop/Vanessa/restored
npm run dev
```

Expected: Vite dev server starts on localhost

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Vite React project with dependencies"
```

---

### Task 2: Configure Tailwind with "Terre & Sable" palette

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Configure tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF7F2',
          100: '#F0E6D6',
          300: '#C9B99A',
          600: '#8B7355',
          900: '#5C4A3A',
        }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Set up Tailwind directives in src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Add Google Font "Lora" to index.html**

Add to `<head>` in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
```

Also set page title to "Restored" and background color:

```html
<title>Restored</title>
```

Add to `<body>`:

```html
<body class="bg-sand-50">
```

Note: Since Tailwind classes in `index.html` aren't processed by default at this stage, use inline style as fallback:

```html
<body style="background-color: #FAF7F2;">
```

- [ ] **Step 4: Verify Tailwind works**

Replace content of `src/App.jsx` with:

```jsx
function App() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center">
      <h1 className="font-serif text-4xl text-sand-900">Restored</h1>
    </div>
  )
}

export default App
```

Run `npm run dev` — should show "Restored" in Lora font, beige background, brown text.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css index.html src/App.jsx
git commit -m "feat: configure Tailwind with Terre & Sable palette and Lora font"
```

---

### Task 3: Configure Firebase

**Files:**
- Create: `src/firebase.js`

- [ ] **Step 1: Create .env.local template**

Create `.env.example` (committed, documents required vars):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Also create `.env.local` with the same content (this file is gitignored by Vite's template). The user will fill in real values.

- [ ] **Step 2: Create Firebase config file using env vars**

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

- [ ] **Step 3: Verify .gitignore includes .env.local**

Vite's template already includes `.env.local` in `.gitignore`. Verify this is the case.

- [ ] **Step 4: Create firestore.rules file**

Create `firestore.rules` in the project root:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow create: if request.resource.data.keys().hasAll(['body', 'createdAt'])
                    && request.resource.data.body is string
                    && request.resource.data.body.size() >= 10
                    && request.resource.data.body.size() <= 5000;
      allow read, update, delete: if false;
    }
  }
}
```

> **Note for Vanessa:** Apply these rules in the Firebase Console → Firestore → Rules tab, or use `firebase deploy --only firestore:rules` if using Firebase CLI.

- [ ] **Step 5: Commit**

```bash
git add src/firebase.js .env.example firestore.rules
git commit -m "feat: add Firebase config with env vars and Firestore security rules"
```

---

## Chunk 2: Shared Components (Navbar + Footer)

### Task 4: Build Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Create Navbar with responsive hamburger menu**

```jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/contact', label: 'Espace d\'échange' },
  ];

  return (
    <nav className="bg-sand-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold text-sand-900">
          Restored
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? 'text-sand-900 font-semibold'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-sand-900"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-sand-100 px-4 pb-4">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-2 text-sm ${
                location.pathname === link.to
                  ? 'text-sand-900 font-semibold'
                  : 'text-sand-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add responsive Navbar with mobile hamburger menu"
```

---

### Task 5: Build Footer component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create Footer**

```jsx
export default function Footer() {
  return (
    <footer className="bg-sand-100 py-6 mt-auto">
      <p className="text-center text-sm text-sand-600">
        © {new Date().getFullYear()} Restored — Un espace de bienveillance
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer component"
```

---

### Task 6: Set up App router with layout

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Set up routes with Navbar and Footer layout**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sand-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 2: Create placeholder pages**

Create `src/pages/Home.jsx`:

```jsx
export default function Home() {
  return <div className="p-8 text-sand-900">Home — à compléter</div>;
}
```

Create `src/pages/Contact.jsx`:

```jsx
export default function Contact() {
  return <div className="p-8 text-sand-900">Contact — à compléter</div>;
}
```

- [ ] **Step 3: Verify navigation works**

Run `npm run dev`. Click between Accueil and Espace d'échange — navigation should work, layout should show Navbar on top and Footer at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/Home.jsx src/pages/Contact.jsx
git commit -m "feat: set up router with Navbar/Footer layout and placeholder pages"
```

---

## Chunk 3: Home Page (Storytelling Scroll)

### Task 7: Build Home page — Hero section

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Implement Hero section**

```jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand-50 py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-sand-900 mb-6">
            Restored
          </h1>
          <p className="text-lg md:text-xl text-sand-600 mb-10 leading-relaxed">
            Un espace sûr pour déposer ce qui vous pèse, en toute confidentialité.
            Ici, vous pouvez partager vos challenges de vie de manière anonyme,
            sans crainte d'être jugé·e.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-sand-600 text-sand-50 px-8 py-3 rounded-full text-sm font-semibold hover:bg-sand-900 transition-colors"
          >
            Écrire un message
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify hero renders correctly**

Run `npm run dev`. Homepage should show centered title, subtitle, and CTA button.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add Hero section to Home page"
```

---

### Task 8: Build Home page — "Comment ça marche" section

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add the 3-step section below Hero**

Add after the Hero `</section>`, inside the wrapping `<div>`:

```jsx
      {/* Comment ça marche */}
      <section className="bg-sand-100 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-sand-600 text-sand-50 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-serif text-xl font-semibold text-sand-900 mb-2">{title}</h3>
                <p className="text-sand-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify section renders**

Run `npm run dev`. Scroll down — should see 3 numbered circles with titles and descriptions. On mobile they stack vertically, on desktop they're side by side.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add 'Comment ça marche' 3-step section"
```

---

### Task 9: Build Home page — Bio section

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add Vanessa's bio section below steps**

Add after the "Comment ça marche" `</section>`:

```jsx
      {/* Bio Vanessa */}
      <section className="bg-sand-50 py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo placeholder */}
            <div className="w-32 h-32 rounded-full bg-sand-300 flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-4xl font-bold text-sand-50">V</span>
            </div>
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
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify bio renders**

Run `npm run dev`. Scroll to bottom — should see circular "V" placeholder and bio text side by side on desktop, stacked on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add Vanessa bio section to Home page"
```

---

## Chunk 4: Contact Page (Form + History)

### Task 10: Build Contact page — Form UI

**Files:**
- Modify: `src/pages/Contact.jsx`

- [ ] **Step 1: Implement form with validation, honeypot, and character counter**

```jsx
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

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

export default function Contact() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [history, setHistory] = useState(getHistory);

  const canSubmit = body.length >= BODY_MIN && body.length <= BODY_MAX && status !== 'sending';

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot check — silently ignore bots
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
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-sand-900 text-center mb-4">
        Espace d'échange
      </h1>
      <p className="text-sand-600 text-center mb-10 leading-relaxed">
        Partagez ce qui vous pèse, en toute confidentialité.
        Aucune information personnelle n'est collectée.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot — invisible to humans */}
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
            className="w-full px-4 py-3 rounded-lg border border-sand-300 bg-white text-sand-900 placeholder-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-600"
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
            className="w-full px-4 py-3 rounded-lg border border-sand-300 bg-white text-sand-900 placeholder-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-600 resize-y"
          />
          <p className="text-xs text-sand-300 mt-1 text-right">
            {body.length} / {BODY_MAX} caractères
            {body.length > 0 && body.length < BODY_MIN && (
              <span className="text-sand-600"> (minimum {BODY_MIN})</span>
            )}
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-sand-600 text-sand-50 py-3 rounded-full font-semibold hover:bg-sand-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer anonymement'}
        </button>

        {status === 'success' && (
          <div className="bg-sand-100 border border-sand-300 rounded-lg p-4 text-center">
            <p className="text-sand-900 font-semibold">Merci pour votre message 🌿</p>
            <p className="text-sand-600 text-sm mt-1">
              Il a été envoyé de manière anonyme. Prenez soin de vous.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-800 font-semibold">Votre message n'a pas pu être envoyé.</p>
            <p className="text-red-600 text-sm mt-1">
              Vérifiez votre connexion et réessayez.
            </p>
          </div>
        )}
      </form>

      {/* Message history */}
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
            {history.map((msg) => (
              <div key={msg.id} className="bg-sand-100 rounded-lg p-4">
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
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify form renders**

Run `npm run dev`, navigate to `/contact`. Form should show with subject, body textarea, character counter, and submit button. History section should be empty.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: add Contact page with form, validation, honeypot, and local history"
```

---

## Chunk 5: README & Final Polish

### Task 11: Write README.md

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write comprehensive README**

```markdown
# Restored

Un espace sécurisé où n'importe qui peut envoyer anonymement ses challenges de vie à une administratrice bienveillante.

## Stack technique

- **React** via Vite
- **Tailwind CSS** v3 (palette "Terre & Sable")
- **react-router-dom** v6
- **Firebase Firestore** (stockage anonyme des messages)
- **Google Font Lora** (typographie serif)

## Arborescence

```
restored/
├── index.html                  # Point d'entrée HTML + Google Font
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Palette sand + font Lora
├── postcss.config.js           # PostCSS + Tailwind
├── package.json
├── src/
│   ├── main.jsx                # Point d'entrée React
│   ├── index.css               # Directives Tailwind
│   ├── App.jsx                 # Routes (Home + Contact)
│   ├── firebase.js             # Config Firebase Firestore
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation responsive
│   │   └── Footer.jsx          # Pied de page
│   └── pages/
│       ├── Home.jsx            # Accueil (hero + étapes + bio)
│       └── Contact.jsx         # Formulaire anonyme + historique
└── docs/
    └── superpowers/
        └── specs/              # Spécification du projet
```

## Installation

```bash
# 1. Cloner le projet
git clone <repo-url>
cd restored

# 2. Installer les dépendances
npm install

# 3. Configurer Firebase
# Ouvrir src/firebase.js et remplacer les placeholders par vos identifiants Firebase.
# Créer un projet Firebase : https://console.firebase.google.com
# Activer Firestore Database en mode production
# Copier les règles de sécurité depuis docs/superpowers/specs/2026-03-13-restored-website-design.md

# 4. Lancer le serveur de développement
npm run dev
```

## Dépendances

```bash
npm install react react-dom react-router-dom firebase
npm install -D tailwindcss@3 postcss autoprefixer
```

## Configuration Firebase

1. Créer un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activer **Firestore Database**
3. Appliquer les règles de sécurité (write-only, voir le spec)
4. Copier la config dans `src/firebase.js`

## Guide de reprise

Si la génération est interrompue, voici l'ordre de construction :

1. **Scaffolding** : `npm create vite@latest restored -- --template react` + dépendances
2. **Tailwind** : `tailwind.config.js` avec palette sand + `index.css` avec directives
3. **Firebase** : `src/firebase.js` avec config placeholder
4. **Navbar** : `src/components/Navbar.jsx` (responsive + hamburger)
5. **Footer** : `src/components/Footer.jsx`
6. **App router** : `src/App.jsx` avec BrowserRouter + layout
7. **Home** : `src/pages/Home.jsx` (hero → étapes → bio)
8. **Contact** : `src/pages/Contact.jsx` (form + honeypot + historique localStorage)
9. **README** : Ce fichier

Chaque étape produit un commit indépendant.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README with setup guide"
```

---

### Task 12: Final verification

- [ ] **Step 1: Run build to ensure no errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Visual check**

Run `npm run dev` and verify:
- Homepage: hero → steps → bio, all scroll correctly
- Contact: form validates, character counter works, history section present
- Navigation: Navbar links work, mobile hamburger toggles
- Responsive: resize browser — mobile layout stacks correctly
- Footer: visible at bottom of all pages

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify build and final polish"
```
