import { Route, Routes } from 'react-router';
import { MainPage } from '@/app/ui/MainPage';
import { ProfilePage } from '@/features/auth';
import { PlaylistsPage } from '@/features/playlists';
import { TracksPage } from '@/features/tracks';
import { PageNotFound } from '@/common/components';
import { PATH } from '@/common/config';

export const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.MAIN} element={<MainPage />} />
        <Route path={PATH.PROFILE} element={<ProfilePage />} />
        <Route path={PATH.PLAYLISTS} element={<PlaylistsPage />} />
        <Route path={PATH.TRACKS} element={<TracksPage />} />
        <Route path={PATH.ERROR} element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
