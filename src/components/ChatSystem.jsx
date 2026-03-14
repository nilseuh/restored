import { useEffect, useMemo } from 'react';
import { Chatbox } from '@talkjs/react-components';
import '@talkjs/react-components/default.css';
import { getTalkSession } from '@talkjs/core';

// ─── Configuration ──────────────────────────────────────────
// Remplacez par votre appId TalkJS (Dashboard → Settings → App ID)
const TALKJS_APP_ID = import.meta.env.VITE_TALKJS_APP_ID || 'YOUR_TALKJS_APP_ID';

// ID fixe de l'admin — doit correspondre à l'utilisateur créé dans le dashboard TalkJS
const ADMIN_ID = 'admin-vanessa';
const ADMIN_NAME = 'Vanessa';

// ─── Visiteur anonyme (ID persisté en sessionStorage) ───────
function getVisitorId() {
  const key = 'restored_visitor_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = 'visitor-' + crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// ─── Composant principal ────────────────────────────────────
export default function ChatSystem() {
  const visitorId = useMemo(() => getVisitorId(), []);
  const conversationId = useMemo(() => `restored-conv-${visitorId}`, [visitorId]);

  const session = getTalkSession({
    appId: TALKJS_APP_ID,
    userId: visitorId,
  });

  useEffect(() => {
    // Créer le visiteur anonyme s'il n'existe pas
    session.currentUser.createIfNotExists({
      name: 'Visiteur anonyme',
      role: 'visitor',
    });

    // Créer l'admin s'il n'existe pas (sera aussi créé depuis le dashboard)
    session.user(ADMIN_ID).createIfNotExists({
      name: ADMIN_NAME,
      role: 'admin',
      welcomeMessage: 'Bienvenue sur Restored 🌿 Vous pouvez me parler en toute confidentialité. Comment puis-je vous aider ?',
    });

    // Créer la conversation et ajouter les participants
    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists({
      subject: 'Espace d\'échange — Restored',
    });
    conversation.participant(visitorId).createIfNotExists();
    conversation.participant(ADMIN_ID).createIfNotExists();
  }, [session, visitorId, conversationId]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl shadow-sand-300/20 dark:shadow-black/30 border border-sand-300/30 dark:border-sand-600/20">
      <Chatbox
        appId={TALKJS_APP_ID}
        userId={visitorId}
        conversationId={conversationId}
        style={{ width: '100%', height: '500px' }}
        showChatHeader={true}
      />
    </div>
  );
}
