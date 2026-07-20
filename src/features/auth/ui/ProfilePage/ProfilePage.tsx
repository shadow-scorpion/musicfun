import { useGetMeQuery } from '@/features/auth/api/authApi.ts';
import { CreatePlaylistForm } from '@/features/auth/ui/ProfilePage/CreatePlaylistForm/CreatePlaylistForm.tsx';

export const ProfilePage = () => {
  const { data: meData } = useGetMeQuery();
  console.log(meData?.login);
  return (
    <div>
      <h1>You are {meData?.login} </h1>
      <CreatePlaylistForm />
      <PlaylistsList playlist={playlistsData?.data || []} isLoading={isMeLoading || isLoading} />
    </div>
  );
};
