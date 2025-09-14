// CatalogPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader/Loader';
import { fetchCars, fetchFilteredCars } from '../../redux/cars/operations';
import {
  selectCarsList,
  selectPageState,
  selectTotalPagesState,
  selectIsLoadingState,
  selectErrorState,
} from '../../redux/cars/selectors';
import Container from '../../components/Container/Container';
import CarsList from '../../components/CarsList/CarsList';
import css from './CatalogPage.module.css';
import { useEffect } from 'react';
import CarsFilterForm from '../../components/CarFilterForm/CarsFilterForm';
import { fetchBrands } from '../../redux/filters/operations';
import {
  selectBrands,
  selectFilterState,
  selectisFiltered,
} from '../../redux/filters/selectors';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const page = useSelector(selectPageState);
  const totalPages = useSelector(selectTotalPagesState);
  const isLoading = useSelector(selectIsLoadingState);
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilterState);
  const error = useSelector(selectErrorState);
  const isFiltered = useSelector(selectisFiltered);

  useEffect(() => {
    // Завантажуємо бренди, якщо вони ще не підвантажені
    if (!brands.length) {
      dispatch(fetchBrands());
    }
    // Завантажуємо всі авто лише якщо список порожній і фільтри не застосовані
    if (!cars.length && !isFiltered) {
      dispatch(
        fetchCars({
          page: 1,
          limit: 12,
        }),
      );
    }
  }, [dispatch, cars.length, brands.length, isFiltered]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(
        fetchFilteredCars({
          page: page + 1,
          limit: 12,
          ...filters, // тут лежать brand, rentalPrice, minMileage, maxMileage
        }),
      );
    }
  };

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

  return (
    <Container className={css.container}>
      <CarsFilterForm brands={brands} />
      {cars.length === 0 && isFiltered ? (
        <p className={css.noCarsMessage}>No cars found for your filters 😢</p>
      ) : (
        <CarsList cars={cars} page={page} limit={12} />
      )}
      {cars.length > 0 && page < totalPages && (
        <button
          className={css.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </Container>
  );
}
