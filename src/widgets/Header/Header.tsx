import { PATH } from '@/common/config';
import { NavLink } from 'react-router';
import s from './Header.module.css';

const navItems = [
  { to: PATH.PROFILE, lable: 'Profile' },
  { to: PATH.MAIN, lable: 'Main' },
  { to: PATH.TRACKS, lable: 'Tracks' },
  { to: PATH.PLAYLISTS, lable: 'Playlists' },
];

export const Header = () => {
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
    </header>
  );
};
