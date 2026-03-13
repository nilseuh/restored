# Restored

Un espace sécurisé où n'importe qui peut envoyer anonymement ses challenges de vie à une administratrice bienveillante.

## Stack technique

- **React** via Vite
- **Tailwind CSS** v3 (palette "Terre & Sable")
- **Framer Motion** (animations au scroll, transitions de page, effets hover)
- **react-router-dom** v6
- **Firebase Firestore** (stockage anonyme des messages)
- **Google Font Lora** (typographie serif)

## Effets visuels

- Animations au scroll (fade-in / slide-up via Framer Motion)
- Hero avec gradient mouvant (orbes animées)
- Bandeau défilant (marquee) avec mots-clés
- Navbar glassmorphism (backdrop-blur au scroll)
- Transitions de page fluides (AnimatePresence)
- Effets hover premium (scale, ombre, remplissage)
- Compteurs animés (100% Anonyme, 0 Données, 24/7)
- Spinner d'envoi animé
- Scrollbar et sélection personnalisées

## Arborescence

```
restored/
├── index.html                  # Point d'entrée HTML + Google Font
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Palette sand + font Lora
├── postcss.config.js           # PostCSS + Tailwind
├── firestore.rules             # Règles de sécurité Firestore
├── .env.example                # Template des variables d'environnement
├── package.json
├── src/
│   ├── main.jsx                # Point d'entrée React
│   ├── index.css               # Directives Tailwind + scrollbar + sélection
│   ├── App.jsx                 # Routes + transitions de page (AnimatePresence)
│   ├── firebase.js             # Config Firebase Firestore (env vars)
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation glassmorphism + hamburger animé
│   │   └── Footer.jsx          # Pied de page avec fade-in
│   └── pages/
│       ├── Home.jsx            # Hero animé + marquee + étapes + bio + CTA
│       └── Contact.jsx         # Formulaire animé + historique localStorage
└── docs/
    └── superpowers/
        ├── specs/              # Spécification du projet
        └── plans/              # Plan d'implémentation
```

## Installation

```bash
# 1. Cloner le projet
git clone <repo-url>
cd restored

# 2. Installer les dépendances
npm install

# 3. Configurer Firebase
cp .env.example .env.local
# Ouvrir .env.local et remplacer les placeholders par vos identifiants Firebase

# 4. Lancer le serveur de développement
npm run dev
```

## Configuration Firebase

1. Créer un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activer **Firestore Database** en mode production
3. Copier les identifiants du projet dans `.env.local`
4. Appliquer les règles de sécurité depuis `firestore.rules` dans l'onglet Rules de Firestore

## Dépendances

```bash
npm install react react-dom react-router-dom firebase framer-motion
npm install -D tailwindcss@3 postcss autoprefixer
```

## Guide de reprise

Si la génération est interrompue, voici l'ordre de construction :

1. **Scaffolding** : `npm create vite@latest restored -- --template react` + dépendances
2. **Tailwind** : `tailwind.config.js` avec palette sand + `index.css` avec directives + scrollbar
3. **Firebase** : `src/firebase.js` avec config via env vars + `firestore.rules`
4. **Navbar** : `src/components/Navbar.jsx` (glassmorphism + hamburger animé)
5. **Footer** : `src/components/Footer.jsx` (fade-in)
6. **App router** : `src/App.jsx` avec BrowserRouter + AnimatePresence (transitions de page)
7. **Home** : `src/pages/Home.jsx` (hero gradient + marquee + étapes animées + bio + CTA)
8. **Contact** : `src/pages/Contact.jsx` (form animé + honeypot + historique localStorage)
9. **README** : Ce fichier

Chaque étape produit un commit indépendant.
