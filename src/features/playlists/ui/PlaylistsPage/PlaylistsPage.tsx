import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx';
import s from './PlaylistsPage.module.css';

export const PlaylistsPage = () => {
  const removePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure want to delete playlist?')) {
      console.log('Playlist delete');
    }
  };
  const updatePlaylistHandler = (playlistId: string) => {
    const body = {
      title: 'update title',
      description: 'some new',
      tagIds: [],
    };
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.playlistsWrap}>
        {dataPlaylts.data.map((playlist) => (
          <div key={playlist.id} className={s.playlistWrap}>
            <div>title: {playlist.attributes.title}</div>
            <div>duration:</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <div className={s.buttonWrap}>
              <button onClick={() => removePlaylistHandler(playlist.id)}>Delete</button>
              <button onClick={() => updatePlaylistHandler(playlist.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const dataPlaylts = {
  data: [
    {
      id: '1',
      type: 'playlists',
      attributes: {
        title: 'First playlist',
        addedAt: '2026-03-27T13:13:22.993Z',
        updatedAt: '2026-03-27T13:13:22.993Z',
        order: 0,
        user: {
          id: 'string',
          name: 'string',
        },
        images: {
          main: [
            {
              type: 'original',
              width: 0,
              height: 0,
              fileSize: 0,
              url: 'string',
            },
          ],
        },
        tags: [
          {
            id: 'string',
            name: 'string',
          },
        ],
        likesCount: 0,
        dislikesCount: 0,
        currentUserReaction: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
    {
      id: '2',
      type: 'playlists',
      attributes: {
        title: 'Second playlist',
        addedAt: '2026-03-27T13:13:22.993Z',
        updatedAt: '2026-03-27T13:13:22.993Z',
        order: 0,
        user: {
          id: 'string',
          name: 'John',
        },
        images: {
          main: [
            {
              type: 'original',
              width: 0,
              height: 0,
              fileSize: 0,
              url: 'string',
            },
          ],
        },
        tags: [
          {
            id: 'string',
            name: 'string',
          },
        ],
        likesCount: 0,
        dislikesCount: 0,
        currentUserReaction: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
    {
      id: '3',
      type: 'playlists',
      attributes: {
        title: 'Third playlist',
        addedAt: '2026-03-27T13:13:22.993Z',
        updatedAt: '2026-03-27T13:13:22.993Z',
        order: 0,
        user: {
          id: 'string',
          name: 'Steve',
        },
        images: {
          main: [
            {
              type: 'original',
              width: 0,
              height: 0,
              fileSize: 0,
              url: 'string',
            },
          ],
        },
        tags: [
          {
            id: 'string',
            name: 'string',
          },
        ],
        likesCount: 0,
        dislikesCount: 0,
        currentUserReaction: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
    {
      id: '4',
      type: 'playlists',
      attributes: {
        title: 'Fourth playlist',
        addedAt: '2026-03-27T13:13:22.993Z',
        updatedAt: '2026-03-27T13:13:22.993Z',
        order: 0,
        user: {
          id: 'string',
          name: 'Maximus',
        },
        images: {
          main: [
            {
              type: 'original',
              width: 0,
              height: 0,
              fileSize: 0,
              url: 'string',
            },
          ],
        },
        tags: [
          {
            id: 'string',
            name: 'string',
          },
        ],
        likesCount: 0,
        dislikesCount: 0,
        currentUserReaction: 0,
        tracksCount: 0,
        duration: 0,
      },
    },
  ],
  meta: {
    totalCount: 0,
    page: 0,
    pageSize: 0,
    pagesCount: 0,
  },
};
