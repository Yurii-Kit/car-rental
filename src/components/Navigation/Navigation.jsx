import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/catalog" end className={getActiveLinkClass}>
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
