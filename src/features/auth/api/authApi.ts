import { baseApi } from '@/app/api/baseApi.ts';
import type { LoginArgs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types.ts';
import { AUTH_STORAGE_KEY } from '@/common/constants';
import { loginResponseSchema, meResponseSchema } from '@/features/auth/model/authApi.schema.ts';
import { withZodCatch } from '@/common/utils';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => ({ method: 'get', url: '/auth/me' }),
      ...withZodCatch(meResponseSchema),
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload: LoginArgs) => ({
        url: '/auth/login',
        method: 'post',
        body: { ...payload, accessTokenTTL: '1d' },
      }),
      ...withZodCatch(loginResponseSchema),
      onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem(AUTH_STORAGE_KEY.accessToken, data.accessToken);
        localStorage.setItem(AUTH_STORAGE_KEY.refreshToken, data.refreshToken);

        dispatch(authApi.util.invalidateTags(['Auth']));
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_STORAGE_KEY.refreshToken);
        return { method: 'post', url: '/auth/logout', body: { refreshToken } };
      },
      onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
        localStorage.removeItem(AUTH_STORAGE_KEY.accessToken);
        localStorage.removeItem(AUTH_STORAGE_KEY.refreshToken);
        dispatch(authApi.util.resetApiState());
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;
