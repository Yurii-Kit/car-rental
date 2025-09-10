import { useNavigate } from 'react-router-dom';
import css from './HeroSection.module.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
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
