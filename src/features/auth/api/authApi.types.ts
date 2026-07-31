import { loginResponseSchema, type meResponseSchema } from '@/features/auth/model/authApi.schema.ts';
import * as z from 'zod';

export type LoginArgs = {
  code: string;
  redirectUri: string;
  accessTokenTTL?: string;
  rememberMe: boolean;
};

export type MeResponse = z.infer<typeof meResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
