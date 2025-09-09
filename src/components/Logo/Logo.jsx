// Logo.jsx
import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export default function Logo({ width = 208, height = 32, className = '' }) {
  return (
    <Link to="/" className={`${css.link} ${className}`}>
      <svg
        className={css.logo}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-Logo" />
      </svg>
    </Link>
  );
}
