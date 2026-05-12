import { useGetMeQuery } from '@/features/auth/api/authApi.ts';

export const MainPage = () => {
  const { data: meData } = useGetMeQuery();
  return (
    <div>
      <h1>Your login: {meData?.login}</h1>
    </div>
  );
};
