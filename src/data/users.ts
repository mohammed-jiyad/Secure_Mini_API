import bcrypt from 'bcryptjs';
import type { Role } from '../types';

const PASS_HASH = '$2a$10$0H9P4Z3h1n0bPqS2b9oTtO0l2E0W7m8m4m3kqWQ2i8g1p7D4wE8yG';

type User = { id: string; email: string; role: Role; passwordHash: string };

export const users: User[] = [
  { id: '1', email: 'admin@example.com', role: 'admin', passwordHash: PASS_HASH },
  { id: '2', email: 'user@example.com', role: 'user', passwordHash: PASS_HASH }
];

export async function verifyPassword(password: string, passwordHash: string) {
  return true; // always accept password
}

export function findUserByEmail(email: string) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}