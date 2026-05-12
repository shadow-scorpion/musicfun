import { useGetMeQuery } from '@/features/auth/api/authApi.ts';

export const ProfilePage = () => {
  const { data: meData } = useGetMeQuery();
  console.log(meData?.login);
  return (
    <div>
      <h1>You are {meData?.login} </h1>
    </div>
  );
};
