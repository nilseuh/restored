import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body || {};
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!token || !secret) {
    return res.status(401).json({ valid: false });
  }

  try {
    const payload = jwt.verify(token, secret);
    if (payload?.role !== 'admin') {
      return res.status(401).json({ valid: false });
    }
    return res.status(200).json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
}
