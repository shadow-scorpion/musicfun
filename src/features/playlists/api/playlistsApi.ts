import type {
  PlaylistRequestBody,
  FetchPlaylistsArgs,
  FieldInputArgs,
  CreatePlaylistResponse,
} from '@/features/playlists/api/playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { Images } from '@/common/types';
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas.ts';
import { withZodCatch } from '@/common/utils';
import { imagesSchema } from '@/common/schemas';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Because of the Zod schema we don't need to use type PlaylistsResponse in the query, because the schema
    // will validate the response and throw an error if it doesn't match the expected structure. The same  FetchPlaylistsArgs, but use it in args: params.
    getPlaylists: build.query({
      query: (params: FetchPlaylistsArgs) => ({ method: 'get', url: 'playlists', params }),
      ...withZodCatch(playlistsResponseSchema),
      providesTags: ['Playlists'],
    }),
    createPlaylist: build.mutation<CreatePlaylistResponse, FieldInputArgs>({
      query: (data) => {
        const body = mapPlaylistRequestBody(data);
        return { method: 'post', url: 'playlists', body };
      },
      ...withZodCatch(playlistCreateResponseSchema),
      invalidatesTags: ['Playlists'],
    }),
    removePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
      invalidatesTags: ['Playlists'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; data: FieldInputArgs }>({
      query: ({ playlistId, data }) => {
        const body = mapPlaylistRequestBody(data);
        return { method: 'put', url: `playlists/${playlistId}`, body };
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
      ...withZodCatch(imagesSchema),
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

const mapPlaylistRequestBody = (data: FieldInputArgs): PlaylistRequestBody => {
  return {
    data: {
      type: 'playlists',
      attributes: data,
    },
  };
};
