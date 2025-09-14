import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader/Loader';
import Container from '../../components/Container/Container';
import { fetchCarById } from '../../redux/cars/operations';
import {
  selectIsSelectedCarState,
  selectIsLoadingState,
  selectErrorState,
} from '../../redux/cars/selectors';
import css from './CarPage.module.css';
import OrderForm from '../../components/OrdreForm/OrderForm';

export default function CarPage() {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const car = useSelector(selectIsSelectedCarState);
  const isLoading = useSelector(selectIsLoadingState);
  const error = useSelector(selectErrorState);

  useEffect(() => {
    if (!car || car.id !== carId) {
      dispatch(fetchCarById({ carId }));
    }
  }, [dispatch, carId, car]);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Something went wrong 😢</p>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container>
        <p>Car not found</p>
      </Container>
    );
  }

  //Тепер car гарантовано є
  const shortId = carId.slice(-4);
  const location = car.address
    ? car.address.split(', ').slice(-2).join(', ')
    : '';
  const formatMileage = (mileage) => mileage.toLocaleString() + ' km';

  const handleSubmit = (newValues) => {
    console.log('Booking:', newValues);
  };

  return (
    <Container>
      <div className={css.carPage}>
        {/* ліва колонка */}
        <div className={css.leftCol}>
          <img
            className={css.carPage_image}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
          />

          <aside className={css.carPage__booking}>
            <div className={css.titleForm}>
              <h2>Book your car now</h2>
              <p>Stay connected! We are always ready to help you.</p>
            </div>
            <OrderForm onSubmit={handleSubmit} />
          </aside>
        </div>

        {/* права колонка */}
        <div className={css.carPage_info}>
          <div className={css.carPage_title}>
            <h2>
              {car.brand} {car.model}, {car.year} <span>Id: {shortId}</span>
            </h2>
            <p className={css.carPage_location}>
              <svg width="16" height="16" aria-hidden="true">
                <use href="#icon-Location" />
              </svg>
              {location} <span>Mileage: {formatMileage(car.mileage)}</span>
            </p>
            <p className={css.carPage_price}>${car.rentalPrice}</p>
            <p className={css.carPage_description}>{car.description}</p>
          </div>

          <div className={css.carPage_details}>
            <div className={css.carPage_section}>
              <h3>Rental Condition:</h3>
              <ul>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Minimum age : 25
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Security deposit required
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Valid driver's license
                </li>
              </ul>
            </div>

            <div className={css.carPage_section}>
              <h3>Car Specification:</h3>
              <ul>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-calendar" />
                  </svg>
                  Year: {car.year}
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-car" />
                  </svg>
                  Type: {car.type}
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-gear" />
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={css.carPage_section}>
              <h3>Accessories and functionalities:</h3>
              <ul>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Leather seats
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Panoramic sunroof
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Remote start
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Blind-spot monitoring
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Power liftgate
                </li>
                <li>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="#icon-check-circle" />
                  </svg>
                  Premium audio system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
