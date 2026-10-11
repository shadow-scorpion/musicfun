import type {
  PlaylistRequestBody,
  FetchPlaylistsArgs,
  FieldInputArgs,
  CreatePlaylistResponse,
  PlaylistEvent,
} from '@/features/playlists/api/playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { Images } from '@/common/types';
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas.ts';
import { withZodCatch } from '@/common/utils';
import { imagesSchema } from '@/common/schemas';
import { SOCKET_EVENTS } from '@/common/constants';
import { subscribeToEvent } from '@/common/socket';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Because of the Zod schema we don't need to use type PlaylistsResponse in the query, because the schema
    // will validate the response and throw an error if it doesn't match the expected structure. The same  FetchPlaylistsArgs, but use it in args: params.
    getPlaylists: build.query({
      query: (params: FetchPlaylistsArgs) => {
        return { method: 'get', url: 'playlists', params };
      },
      ...withZodCatch(playlistsResponseSchema),
      keepUnusedDataFor: 0,
      onCacheEntryAdded: async (_args, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) => {
        await cacheDataLoaded;

        const unsubscribes = [
          subscribeToEvent<PlaylistEvent>(SOCKET_EVENTS.PLAYLIST_CREATED, (msg: PlaylistEvent) => {
            const newPlaylist = msg.payload.data;
            updateCachedData((draft) => {
              draft.data.pop();
              draft.data.unshift(newPlaylist);
              draft.meta.totalCount = draft.meta.totalCount + 1;
              draft.meta.pagesCount = Math.ceil(draft.meta.totalCount / draft.meta.pageSize);
            });
          }),
          subscribeToEvent<PlaylistEvent>(SOCKET_EVENTS.PLAYLIST_UPDATED, (msg: PlaylistEvent) => {
            const updatedPlaylist = msg.payload.data;
            updateCachedData((draft) => {
              const index = draft.data.findIndex((p) => p.id === updatedPlaylist.id);
              console.log(index);
              if (index !== -1) {
                draft.data[index].attributes.title = updatedPlaylist.attributes.title;
              }
            });
          }),
        ];

        await cacheEntryRemoved;

        unsubscribes.forEach((unsubscribe) => unsubscribe());
        // unsubscribe.disconnect();
      },
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
    likePlaylist: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => {
        return { method: 'post', url: `/playlists/${playlistId}/likes` };
      },
      invalidatesTags: ['Playlists'],
    }),
    dislikePlaylist: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => {
        return { method: 'post', url: `/playlists/${playlistId}/dislikes` };
      },
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
  useLikePlaylistMutation,
  useDislikePlaylistMutation,
} = playlistsApi;

const mapPlaylistRequestBody = (data: FieldInputArgs): PlaylistRequestBody => {
  return {
    data: {
      type: 'playlists',
      attributes: data,
    },
  };
};
