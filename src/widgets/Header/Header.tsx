import { PATH } from '@/common/config';
import { NavLink } from 'react-router';
import s from './Header.module.css';
import { Login } from '@/features/auth/ui/Login/Login.tsx';
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi.ts';

const navItems = [
  { to: PATH.PROFILE, lable: 'Profile' },
  { to: PATH.MAIN, lable: 'Main' },
  { to: PATH.TRACKS, lable: 'Tracks' },
  { to: PATH.PLAYLISTS, lable: 'Playlists' },
];

export const Header = () => {
  const { data: me } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const logoutHandle = () => logout();

  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? s.activeLink : '')}>
                {item.lable}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {me && (
        <div className={s.profile}>
          <p>{me.login}</p>
          <button onClick={logoutHandle}>Logout</button>
        </div>
      )}
      {!me && <Login />}
    </header>
  );
};
