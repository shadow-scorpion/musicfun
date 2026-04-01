import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreatePlaylistArg, PlaylistsResponse, UpdatePlaylistArg } from '@/features/playlists/api/playlistsApi.types.ts';

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      API_KEY: import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Playlists'],
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({ method: 'get', url: 'playlists' }),
      providesTags: ['Playlists'],
    }),
    createPlaylist: build.mutation<PlaylistsResponse, CreatePlaylistArg>({
      query: (body) => ({ method: 'post', url: 'playlists', body }),
      invalidatesTags: ['Playlists'],
    }),
    removePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
      invalidatesTags: ['Playlists'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArg }>({
      query: ({ playlistId, body }) => ({ method: 'put', url: `playlists${playlistId}`, body }),
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const { useGetPlaylistsQuery, useCreatePlaylistMutation, useRemovePlaylistMutation, useUpdatePlaylistMutation } = playlistsApi;
