import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Restored2026';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('restored_admin', 'true');
      navigate('/admin-inbox');
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-sand-900/40 rounded-2xl p-8 shadow-lg border border-sand-300/30 dark:border-sand-600/20"
      >
        <h1 className="text-2xl font-serif text-sand-900 dark:text-sand-100 mb-6 text-center">
          Espace Admin
        </h1>

        <label
          htmlFor="password"
          className="block text-sm text-sand-600 dark:text-sand-300 mb-2"
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="w-full px-4 py-3 rounded-lg bg-sand-50 dark:bg-[#1a1612] border border-sand-300/50 dark:border-sand-600/30 text-sand-900 dark:text-sand-100 placeholder-sand-300 focus:outline-none focus:ring-2 focus:ring-sand-600/40"
          placeholder="Entrez le mot de passe"
          autoFocus
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">
            Mot de passe incorrect.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-lg bg-sand-900 dark:bg-sand-600 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
