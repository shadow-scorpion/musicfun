import { baseApi } from '@/app/api/baseApi.ts';
import type { LoginArgs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types.ts';
import { AUTH_STORAGE_KEY } from '@/common/constants';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => ({ method: 'get', url: '/auth/me' }),
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload) => ({
        url: '/auth/login',
        method: 'post',
        body: { ...payload, accessTokenTTL: '10m' },
      }),
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
    authRefresh: build.mutation<LoginResponse, { refreshToken: string }>({
      query: (body) => {
        return { method: 'post', url: '/auth/refresh', body };
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useAuthRefreshMutation } = authApi;
