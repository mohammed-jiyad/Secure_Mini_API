import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail, verifyPassword } from '../data/users';
import type { Role } from '../types';

const router = Router();

const {
  JWT_SECRET = 'dev_only_do_not_use',
  JWT_ISSUER = 'secure-mini-api',
  JWT_AUDIENCE = 'secure-mini-client',
  JWT_EXPIRES_IN = '15m'
} = process.env;

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const payload = { sub: user.email, role: user.role as Role };
  const token = jwt.sign(payload, JWT_SECRET, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    expiresIn: JWT_EXPIRES_IN
  });

  res.json({ access_token: token, token_type: 'Bearer', expires_in: JWT_EXPIRES_IN, role: user.role });
});

export default router;