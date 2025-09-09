import { useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import { selectCarsList } from '../../redux/cars/selectors';
import CarCard from '../CarCard/CarCard';
import css from './CarsList.module.css';

export default function CarsList() {
  const cars = useSelector(selectCarsList);

  if (!cars || cars.length === 0) {
    return <p>No cars found</p>;
  }

  return (
    <Container>
      <ul className={css.carslist}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
