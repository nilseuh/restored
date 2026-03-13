# Restored — Site Web Vitrine & Interactif

## Résumé

Site web vitrine pour "Restored", un espace sécurisé où n'importe qui peut envoyer anonymement ses challenges de vie à Vanessa, une administratrice formée en relation d'aide. Le site est minimaliste, zen, et centré sur la confiance et l'anonymat.

## Stack technique

- **Framework** : React.js via Vite
- **Routeur** : react-router-dom v6
- **CSS** : Tailwind CSS v3
- **Typographie** : Google Font "Lora" (serif, pour titres et logo), sans-serif système pour le corps
- **Base de données** : Firebase Firestore (messages anonymes)
- **Persistance locale** : localStorage (historique côté utilisateur)

## Palette de couleurs — "Terre & Sable"

| Token Tailwind | Rôle | Hex |
|----------------|------|-----|
| `sand-50` | Fond principal | `#FAF7F2` |
| `sand-100` | Fond secondaire / cartes | `#F0E6D6` |
| `sand-300` | Accent moyen / bordures | `#C9B99A` |
| `sand-600` | Accent principal / boutons | `#8B7355` |
| `sand-900` | Texte principal | `#5C4A3A` |

Configurées dans `tailwind.config.js` sous `theme.extend.colors.sand`.

## Architecture des fichiers

```
restored/
├── public/
│   └── index.html
├── src/
│   ├── App.js                  # Routes principales
│   ├── index.js                # Point d'entrée React
│   ├── index.css               # Import Tailwind directives
│   ├── firebase.js             # Configuration Firebase
│   ├── components/
│   │   ├── Navbar.js           # Navigation (logo + liens)
│   │   └── Footer.js           # Pied de page minimaliste
│   └── pages/
│       ├── Home.js             # Page d'accueil (storytelling scroll)
│       └── Contact.js          # Espace d'échange (formulaire + historique)
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Pages

### 1. Accueil (`Home.js`) — Storytelling en scroll

**Section Hero :**
- Titre "Restored" en grand (font serif)
- Sous-titre bienveillant : "Un espace sûr pour déposer ce qui vous pèse, en toute confidentialité"
- Bouton CTA "Écrire un message" → lien vers `/contact`
- Fond `sand-50`, texte `sand-900`

**Section "Comment ça marche" :**
- 3 étapes visuelles avec icônes/numéros circulaires :
  1. **Écrivez** — "Rédigez votre message en toute liberté"
  2. **Envoyez** — "Votre message arrive de manière anonyme"
  3. **Respirez** — "Vous avez fait un pas, c'est déjà beaucoup"
- Fond `sand-100`, numéros en `sand-600`

**Section Bio — Vanessa :**
- Photo placeholder (cercle avec initiale "V") — sera remplacé par une vraie photo ultérieurement (format recommandé : 400x400px, JPEG/WebP)
- Texte biographique réaliste : parcours en psychologie / relation d'aide, motivation pour créer Restored
- Ton chaleureux et professionnel

### 2. Espace d'échange (`Contact.js`)

**Formulaire anonyme :**
- Champ "Sujet" (input texte, optionnel, max 100 caractères)
- Champ "Votre message" (textarea, requis, min 10 / max 5000 caractères, compteur de caractères affiché)
- Bouton "Envoyer anonymement"
- Aucune collecte d'email ou d'identifiant
- À l'envoi : sauvegarde dans Firebase Firestore + localStorage
- Feedback visuel : message de confirmation zen après envoi
- **Gestion des erreurs** : en cas d'échec réseau/Firebase, afficher "Votre message n'a pas pu être envoyé. Vérifiez votre connexion et réessayez." Le message reste dans le formulaire pour ne pas perdre le texte.

**Historique local :**
- Affiché sous le formulaire
- Liste des messages envoyés depuis ce navigateur (localStorage)
- Chaque entrée : date + sujet + aperçu du message
- Possibilité de vider l'historique local
- Note explicative : "Cet historique est stocké uniquement sur votre navigateur"

### 3. Composants partagés

**Navbar (`Navbar.js`) :**
- Logo texte "Restored" (font serif, `sand-900`)
- Liens : Accueil, Espace d'échange
- Responsive : menu hamburger sur mobile
- Fond `sand-50` avec légère ombre

**Footer (`Footer.js`) :**
- Texte : "© 2026 Restored — Un espace de bienveillance"
- Fond `sand-100`, texte `sand-600`

## Firebase — Structure Firestore

**Collection : `messages`**

| Champ | Type | Description |
|-------|------|-------------|
| `subject` | string | Sujet du message (optionnel) |
| `body` | string | Contenu du message |
| `createdAt` | timestamp | Date d'envoi (serverTimestamp) |

Aucun champ d'identification utilisateur. L'anonymat est garanti par conception.

**Règles de sécurité Firestore :**
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
Seule l'écriture (create) est autorisée. La lecture est réservée à la console Firebase (accès admin de Vanessa).

## localStorage — Structure

Clé : `restored_messages`

```json
[
  {
    "id": "generated-via-crypto.randomUUID()",
    "subject": "Mon sujet",
    "body": "Mon message...",
    "date": "2026-03-13T14:30:00.000Z"
  }
]
```

ID généré via `crypto.randomUUID()` (API native des navigateurs modernes, pas de dépendance externe).

## Responsive Design

- **Mobile first** : design optimisé pour smartphones
- **Breakpoints** : sm (640px), md (768px), lg (1024px)
- Hero : texte centré sur mobile, espacement réduit
- Étapes "Comment ça marche" : empilées verticalement sur mobile, en ligne sur desktop
- Formulaire : pleine largeur sur mobile
- Navbar : hamburger menu sur mobile

## Anti-spam

Champ honeypot caché dans le formulaire (champ invisible pour les humains, rempli par les bots). Si le champ est rempli, l'envoi est silencieusement ignoré. Solution légère, sans dépendance externe, adaptée au trafic attendu.

## Dépendances

```
react
react-dom
react-router-dom
firebase
tailwindcss
postcss
autoprefixer
```

Tooling Vite (installé via `npm create vite@latest`).

## Hors périmètre

- Pas d'authentification utilisateur
- Pas de panneau d'administration (peut être ajouté ultérieurement via Firebase)
- Pas d'envoi d'email (les messages sont stockés dans Firestore, consultables depuis la console Firebase)
- Pas de réponses aux messages
