import type {
  CreatePlaylistArg,
  CreatePlaylistInput,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArg,
  UpdatePlaylistInput,
} from '@/features/playlists/api/playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({ method: 'get', url: 'playlists' }),
      providesTags: ['Playlists'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistInput>({
      query: (data) => {
        const body = mapPlaylistRequestBody(data);
        return { method: 'post', url: 'playlists', body };
      },
      invalidatesTags: ['Playlists'],
    }),
    removePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
      invalidatesTags: ['Playlists'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; data: UpdatePlaylistInput }>({
      query: ({ playlistId, data }) => {
        const body = mapPlaylistRequestBody(data);
        return { method: 'put', url: `playlists/${playlistId}`, body };
      },
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const { useGetPlaylistsQuery, useCreatePlaylistMutation, useRemovePlaylistMutation, useUpdatePlaylistMutation } = playlistsApi;

const mapPlaylistRequestBody = (data: CreatePlaylistInput | UpdatePlaylistInput): CreatePlaylistArg => {
  return {
    data: {
      type: 'playlists',
      attributes: data,
    },
  };
};
