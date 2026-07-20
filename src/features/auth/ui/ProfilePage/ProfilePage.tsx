import { useGetMeQuery } from '@/features/auth/api/authApi.ts';
import s from './ProfilePage.module.css';
import { CreatePlaylistForm } from '@/features/auth/ui/ProfilePage/CreatePlaylistForm/CreatePlaylistForm.tsx';
import { useGetPlaylistsQuery } from '@/features/playlists';
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList.tsx';
import { Navigate } from 'react-router';
import { PATH } from '@/common/config';

export const ProfilePage = () => {
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
  const { data: playlistsData, isLoading } = useGetPlaylistsQuery(
    {
      userId: meData?.userId || '',
    },
    { skip: !meData?.userId },
  );

  if (!isMeLoading && !meData) return <Navigate to={PATH.PLAYLISTS} />;

  return (
    <div className={s.container}>
      <h1>You are {meData?.login} </h1>
      <CreatePlaylistForm />
      <PlaylistsList playlist={playlistsData?.data || []} isLoading={isMeLoading || isLoading} />
    </div>
  );
};
