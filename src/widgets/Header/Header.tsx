import { PATH } from '@/common/config';
import s from './Header.module.css';
import { Login } from '@/features/auth/ui/Login/Login.tsx';
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi.ts';
import { NavLink } from 'react-router';
import { Button } from '@/common/components';

export const Header = () => {
  const { data: me } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const logoutHandle = () => logout();

  return (
    <header className={s.header}>
      {me && (
        <div className={s.profile}>
          <NavLink to={PATH.PROFILE}>{me.login}</NavLink>
          <Button onClick={logoutHandle}>Logout</Button>
        </div>
      )}
      {!me && <Login />}
    </header>
  );
};
