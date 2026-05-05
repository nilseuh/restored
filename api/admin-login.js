import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'Mot de passe requis' });
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!hash || !secret) {
    return res.status(500).json({ error: 'Configuration serveur manquante' });
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ role: 'admin' }, secret, {
    expiresIn: TOKEN_TTL_SECONDS,
  });

  return res.status(200).json({ token, expiresIn: TOKEN_TTL_SECONDS });
}
