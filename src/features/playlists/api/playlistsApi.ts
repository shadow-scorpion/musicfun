import type { PlaylistData, PlaylistsResponse, PlaylistInput, PlaylistRequestBody } from '@/features/playlists/api/playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({ method: 'get', url: 'playlists' }),
      providesTags: ['Playlists'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, PlaylistInput>({
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
    updatePlaylist: build.mutation<void, { playlistId: string; data: PlaylistInput }>({
      query: ({ playlistId, data }) => {
        const body = mapPlaylistRequestBody(data);
        return { method: 'put', url: `playlists/${playlistId}`, body };
      },
      invalidatesTags: ['Playlists'],
    }),
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        // console.log(formData.get('file'));
        // console.log(formData);
        return { method: 'post', url: `/playlists/${playlistId}/images/main`, body: formData };
      },
      invalidatesTags: ['Playlists'],
    }),
    deletePlaylistCover: build.mutation<void, string>({
      query: (playlistId) => ({ method: 'delete', url: `/playlists/${playlistId}/images/main` }),
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useRemovePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;

const mapPlaylistRequestBody = (data: PlaylistInput): PlaylistRequestBody => {
  return {
    data: {
      type: 'playlists',
      attributes: data,
    },
  };
};
