import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import css from './HeroSection.module.css';
import { fetchCars } from '../../redux/cars/operations';

export default function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(fetchCars());
    navigate('/catalog');
  };

  return (
    <div className={css.heroSection}>
      <div className={css.titlewrapper}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
      </div>

      <button type="button" className={css.mainButton} onClick={handleClick}>
        View Catalog
      </button>
    </div>
  );
}
