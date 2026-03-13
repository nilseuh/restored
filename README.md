# Restored

Un espace sécurisé où n'importe qui peut envoyer anonymement ses challenges de vie à une administratrice bienveillante.

## Stack technique

- **React** via Vite
- **Tailwind CSS** v3 (palette "Terre & Sable" + dark mode)
- **Framer Motion** (animations, transitions, parallaxe, particules)
- **react-router-dom** v6
- **Firebase Firestore** (stockage anonyme des messages)
- **Google Font Lora** (typographie serif)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Hero animé, verset du jour, étapes, témoignages, bio Vanessa, CTA |
| Espace d'échange | `/contact` | Formulaire anonyme avec humeur, catégorie, historique local |
| Ressources | `/ressources` | Lignes d'écoute, conseils bien-être, numéros d'urgence |

## Effets visuels

- Animations au scroll (fade-in / slide-up via Framer Motion)
- Hero avec gradient mouvant (orbes animées)
- Particules dorées flottantes dans le hero
- Parallaxe au scroll (le hero se réduit et s'estompe)
- Titre "Restored" en animation lettre par lettre (3D reveal)
- Curseur personnalisé (cercle + point, desktop uniquement)
- Bandeau défilant (marquee) avec mots-clés
- Navbar glassmorphism (backdrop-blur au scroll)
- Transitions de page fluides (AnimatePresence)
- Effets hover premium (scale, ombre, remplissage, bordure lumineuse)
- Compteurs animés (100% Anonyme, 0 Données, 24/7)
- Carousel de témoignages auto-défilant
- Spinner d'envoi animé
- Mode sombre avec toggle (lune/soleil)
- Scrollbar et sélection personnalisées (light + dark)

## Fonctionnalités

- **Anonymat total** : aucun identifiant collecté, Firestore write-only
- **Sélecteur d'humeur** : 6 emojis animés (Triste, Anxieux·se, En colère, Perdu·e, Fatigué·e, Neutre)
- **Catégories** : Famille, Travail, Amour, Santé, Autre
- **Historique local** : messages envoyés stockés en localStorage avec humeur/catégorie
- **Anti-spam** : champ honeypot invisible
- **Verset du jour** : 12 versets bibliques inspirants, rotation quotidienne
- **Mode sombre** : toggle manuel + détection des préférences système
- **Responsive** : mobile-first, hamburger menu, design adaptatif

## Arborescence

```
restored/
├── index.html                  # Point d'entrée HTML + Google Font Lora
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Palette sand + font Lora + darkMode: 'class'
├── postcss.config.js           # PostCSS + Tailwind
├── firestore.rules             # Règles de sécurité Firestore (write-only)
├── .env.example                # Template des variables d'environnement Firebase
├── package.json
├── src/
│   ├── main.jsx                # Point d'entrée React
│   ├── index.css               # Directives Tailwind + scrollbar + sélection (light/dark)
│   ├── App.jsx                 # Routes + AnimatePresence + ThemeContext + CustomCursor
│   ├── firebase.js             # Config Firebase Firestore (env vars)
│   ├── hooks/
│   │   └── useDarkMode.js      # Hook dark mode (localStorage + préférence système)
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation glassmorphism + toggle dark mode + hamburger
│   │   ├── Footer.jsx          # Pied de page avec fade-in (light/dark)
│   │   ├── CustomCursor.jsx    # Curseur personnalisé (desktop uniquement)
│   │   └── Particles.jsx       # Particules dorées flottantes (Framer Motion)
│   └── pages/
│       ├── Home.jsx            # Hero (parallaxe + particules + text-reveal) + verset
│       │                       #   + marquee + étapes + témoignages + bio + CTA
│       ├── Contact.jsx         # Formulaire (humeur + catégorie + honeypot) + historique
│       └── Resources.jsx       # Lignes d'écoute + conseils bien-être
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
2. **Tailwind** : `tailwind.config.js` avec palette sand, darkMode: 'class' + `index.css`
3. **Firebase** : `src/firebase.js` via env vars + `firestore.rules`
4. **Hooks** : `src/hooks/useDarkMode.js`
5. **Composants** : `CustomCursor.jsx`, `Particles.jsx`, `Navbar.jsx`, `Footer.jsx`
6. **App** : `src/App.jsx` avec ThemeContext + AnimatePresence + CustomCursor
7. **Home** : `src/pages/Home.jsx` (hero complet + verset + marquee + étapes + témoignages + bio + CTA)
8. **Contact** : `src/pages/Contact.jsx` (humeur + catégorie + form + historique)
9. **Ressources** : `src/pages/Resources.jsx` (lignes d'écoute + conseils)
10. **README** : Ce fichier

Chaque étape produit un commit indépendant.
