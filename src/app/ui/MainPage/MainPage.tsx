import { useGetMeQuery } from '@/features/auth/api/authApi.ts';

export const MainPage = () => {
  const { data: meData, isError } = useGetMeQuery();

  return (
    <div>
      <div>
        <h1>Your login: {!isError ? meData?.login : 'User not found'}</h1>
      </div>
      <div></div>
    </div>
  );
};
