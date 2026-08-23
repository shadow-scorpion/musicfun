export const AUTH_STORAGE_KEY = {
  accessToken: 'musicfun_token',
  refreshToken: 'musicfun_token_refreshToken',
} as const;

export const SOCKET_EVENTS = {
  TRACK_PUBLISHED: 'tracks.track-published',
  TRACK_ADDED_TO_PLAYLIST: 'tracks.track-added-to-playlist',
  TRACK_LIKED: 'tracks.track-liked',
  TRACK_IMAGE_PROCESSED: 'tracks.track-image-processed',
  PLAYLIST_IMAGE_PROCESSED: 'tracks.playlist-image-processed',
  PLAYLIST_CREATED: 'tracks.playlist-created',
  PLAYLIST_UPDATED: 'tracks.playlist-updated',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
