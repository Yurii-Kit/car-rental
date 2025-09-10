// CarCard.jsx
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import css from './CarCard.module.css';
import { selectFavorites } from '../../redux/cars/selectors';
import { addFavorite, removeFavorite } from '../../redux/cars/slice';

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(car.id);
  if (!car) return null;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car.id));
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((id) => id !== car.id)),
      );
    } else {
      dispatch(addFavorite(car.id));
      localStorage.setItem('favorites', JSON.stringify([...favorites, car.id]));
    }
  };

  const location = car.address.split(', ').slice(-2).join(' | ');

  const formatMileage = (mileage) => {
    return mileage.toLocaleString() + ' km';
  };

  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />
      <div className={css.info}>
        <h3 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h3>
        <p className={css.carPrice}>${car.rentalPrice}</p>
      </div>
      <div className={css.additionalInfo}>
        <p>
          {location} | {car.rentalCompany} |
        </p>
        <p>
          {car.type} | {formatMileage(car.mileage)}
        </p>
      </div>
      <Link className={css.detailsLink} to={`/catalog/${car.id}`}>
        Read More
      </Link>
      <button
        type="button"
        className={clsx(css.favoriteBtn, { [css.active]: isFavorite })}
        onClick={handleFavorite}
      >
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-heart" />
        </svg>
      </button>
    </div>
  );
}
