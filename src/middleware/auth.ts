import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { JwtUserClaims } from '../types';

export interface AuthedRequest extends Request {
  user?: JwtUserClaims;
}

const {
  JWT_SECRET = 'dev_only_do_not_use',
  JWT_ISSUER = 'secure-mini-api',
  JWT_AUDIENCE = 'secure-mini-client'
} = process.env;

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER
    }) as jwt.JwtPayload;

    const user: JwtUserClaims = {
      sub: String(payload.sub),
      role: (payload as any).role
    };

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}