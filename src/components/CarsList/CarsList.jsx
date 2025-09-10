import CarCard from '../CarCard/CarCard';
import css from './CarsList.module.css';

export default function CarsList({ cars }) {
  if (!cars || cars.length === 0) {
    return <p>No cars found</p>;
  }

  return (
    <>
      <ul className={css.carslist}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </>
  );
}
