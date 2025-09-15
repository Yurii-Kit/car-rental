import { useRef, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import css from './CarsList.module.css';

export default function CarsList({ cars, page, limit }) {
  const firstNewCarRef = useRef(null);

  useEffect(() => {
    //Скролимо тільки якщо це не перша сторінка
    if (page > 1 && firstNewCarRef.current) {
      firstNewCarRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [cars, page, limit]);
  if (!cars || cars.length === 0) {
    return <p>No cars found</p>;
  }

  return (
    <ul className={css.carslist}>
      {cars.map((car, index) => {
        const firstIndexOfPage = (page - 1) * limit;

        return (
          <li
            key={car.id}
            ref={index === firstIndexOfPage ? firstNewCarRef : null}
          >
            <CarCard car={car} />
          </li>
        );
      })}
    </ul>
  );
}
