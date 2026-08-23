import {
  fieldInputSchema,
  playlistAttributesSchema,
  playlistCreateResponseSchema,
  playlistDataSchema,
  playlistMetaSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas.ts';
import { z } from 'zod';

export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>;
export type PlaylistData = z.infer<typeof playlistDataSchema>;
export type PlaylistMeta = z.infer<typeof playlistMetaSchema>;
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>;

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'addedAt' | 'likesCount';
  sortDirection?: 'asc' | 'desc';
  tagsIds?: string[];
  userId?: string;
  trackId?: string;
};

export type CreatePlaylistResponse = z.infer<typeof playlistCreateResponseSchema>;

export type FieldInputArgs = z.infer<typeof fieldInputSchema>;

export type PlaylistRequestBody = {
  data: {
    type: string;
    attributes: {
      title: string;
      description?: string;
      tagIds?: string[];
    };
  };
};

// Params for uploading a playlist cover image
export type UploadPlaylistCoverArgs = {
  playlistId: string;
  file: File;
};

// Websockts events

export type PlaylistEvent = {
  type: 'tracks.playlist-created' | 'tracks.playlist-updated';
  payload: {
    data: PlaylistData;
  };
};
