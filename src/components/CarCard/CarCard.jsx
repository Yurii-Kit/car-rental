// CarCard.jsx
import { Link } from 'react-router-dom';
import css from './CarCard.module.css';

export default function CarCard({ car }) {
  const location = car.address.split(', ').slice(-2).join(' | ');
  if (!car) return null;

  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />
      <div className={css.info}>
        <h3 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>,{car.year}
        </h3>
        <p className={css.carPrice}>${car.rentalPrice}</p>
      </div>
      <div className={css.additionalInfo}>
        <p>
          {location} | {car.rentalCompany} |
        </p>
        <p>
          {car.type} | {car.mileage}
        </p>
      </div>
      <Link className={css.detailsLink} to={`/catalog/${car.id}`}>
        Read More
      </Link>
      <button type="button" className={css.favoriteBtn}>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-heart" />
        </svg>
      </button>
    </div>
  );
}
