import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Talk from 'talkjs';
import { Session, Inbox } from '@talkjs/react';

const TALKJS_APP_ID = import.meta.env.VITE_TALKJS_APP_ID || 'YOUR_TALKJS_APP_ID';
const ADMIN_ID = 'admin-vanessa';

export default function AdminInbox() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('restored_admin') !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: ADMIN_ID,
        name: 'Vanessa',
        role: 'admin',
        welcomeMessage:
          'Bienvenue sur Restored. Comment puis-je vous aider ?',
      }),
    [],
  );

  function handleLogout() {
    localStorage.removeItem('restored_admin');
    navigate('/admin-login');
  }

  return (
    <div className="flex flex-col h-screen bg-sand-50 dark:bg-[#1a1612]">
      {/* Header bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-sand-300/30 dark:border-sand-600/20 bg-white dark:bg-sand-900/40">
        <h1 className="text-lg font-serif text-sand-900 dark:text-sand-100">
          Inbox — Vanessa
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-sand-600 dark:text-sand-300 hover:text-sand-900 dark:hover:text-sand-100 transition-colors"
        >
          Deconnexion
        </button>
      </header>

      {/* TalkJS Inbox — takes all remaining height */}
      <div className="flex-1 min-h-0">
        <Session appId={TALKJS_APP_ID} syncUser={syncUser}>
          <Inbox style={{ width: '100%', height: '100%' }} />
        </Session>
      </div>
    </div>
  );
}
