import { Request } from 'express';

type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'host' | 'guest' | 'admin';
  validationCode?: string;
  isValidated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

type ExtendedRequest = Request & {
  user?: User;
};

export type { User, ExtendedRequest };
