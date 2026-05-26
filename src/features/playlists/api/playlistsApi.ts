import type {
  PlaylistData,
  PlaylistsResponse,
  PlaylistInput,
  PlaylistRequestBody,
  FetchPlaylistsArgs,
} from '@/features/playlists/api/playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => ({ method: 'get', url: 'playlists', params }),
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
        return { method: 'put', url: `playlists/${playlistId + '55'}`, body };
      },
      onQueryStarted: async ({ playlistId, data }, { dispatch, queryFulfilled, getState }) => {
        const patchCollection: any[] = [];
        const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'getPlaylists');
        args.forEach((arg) => {
          patchCollection.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                'getPlaylists',
                { search: arg.search, pageNumber: arg.pageNumber, pageSize: arg.pageSize },
                (draft) => {
                  const playlist = draft.data.findIndex((p) => p.id === playlistId);
                  if (playlist !== -1) {
                    draft.data[playlist].attributes = {
                      ...draft.data[playlist].attributes,
                      ...data,
                    };
                  }
                },
              ),
            ),
          );
        });

        try {
          await queryFulfilled;
        } catch (e) {
          patchCollection.forEach((patch) => patch.undo());
        }
      },
      invalidatesTags: ['Playlists'],
    }),
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
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
