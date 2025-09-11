import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Container from '../../components/Container/Container';
import { fetchCarById } from '../../redux/cars/operations';
import {
  selectIsSelectedCarState,
  selectIsLoadingState,
  selectErrorState,
} from '../../redux/cars/selectors';
import css from './CarPage.module.css';

export default function CarPage() {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const car = useSelector(selectIsSelectedCarState);
  const isLoading = useSelector(selectIsLoadingState);
  const error = useSelector(selectErrorState);

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarById({ carId }));
    }
  }, [dispatch, carId]);

  if (isLoading) {
    return (
      <Container>
        <p>Loading car details...</p>
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

  // Тепер car гарантовано є
  const shortId = carId.slice(-4);
  const location = car.address
    ? car.address.split(', ').slice(-2).join(', ')
    : '';
  const formatMileage = (mileage) => mileage.toLocaleString() + ' km';

  // Formik
  const initialValues = { name: '', email: '', date: '', comment: '' };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    date: Yup.date().nullable(),
  });
  const handleSubmit = (values, { resetForm }) => {
    console.log('Booking data:', values);
    resetForm();
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
            <h2>Book your car now</h2>
            <p>Stay connected! We are always ready to help you.</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className={css.form}>
                <div className={css.formField}>
                  <Field
                    type="text"
                    name="name"
                    className={css.inputField}
                    placeholder="Name*"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>

                <div className={css.formField}>
                  <Field
                    type="email"
                    name="email"
                    className={css.inputField}
                    placeholder="Email*"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>

                <div className={css.formField}>
                  <Field
                    type="text"
                    name="date"
                    className={css.inputField}
                    placeholder="Booking date"
                  />
                </div>
                <div className={css.formField}>
                  <Field
                    as="textarea"
                    name="comment"
                    className={css.inputField}
                    placeholder="Comment"
                  />
                </div>

                <button type="submit" className={css.formBtn}>
                  Send
                </button>
              </Form>
            </Formik>
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
