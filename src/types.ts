export type Role = 'admin' | 'user';

export interface JwtUserClaims {
  sub: string;
  role: Role;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  restricted?: boolean;
}