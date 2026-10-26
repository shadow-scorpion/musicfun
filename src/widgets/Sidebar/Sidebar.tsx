import { PATH } from '@/common/config';
import { NavLink } from 'react-router';
import s from './Sidebar.module.css';
import { SlHome, SlMusicTone, SlPlaylist } from 'react-icons/sl';

export const Sidebar = () => {
  const navItems = [
    { to: PATH.MAIN, lable: 'Home', Component: SlHome },
    { to: PATH.TRACKS, lable: 'Tracks', Component: SlMusicTone },
    { to: PATH.PLAYLISTS, lable: 'Playlists', Component: SlPlaylist },
  ];

  return (
    <aside className={s.sidebar}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to} className={s.listItem}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? `${s.activeLink} ${s.link}` : `${s.link}`)}
              >
                <item.Component />
                {item.lable}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
// <SlMusicTone />