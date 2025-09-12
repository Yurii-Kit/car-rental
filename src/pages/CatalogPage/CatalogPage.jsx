// CatalogPage.jsx
import { useDispatch, useSelector } from 'react-redux';
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
import { selectBrands, selectFilterState } from '../../redux/filters/selectors';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const page = useSelector(selectPageState);
  const totalPages = useSelector(selectTotalPagesState);
  const isLoading = useSelector(selectIsLoadingState);
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilterState);
  const error = useSelector(selectErrorState);

  useEffect(() => {
    if (!brands.length) {
      dispatch(fetchBrands());
    }

    if (!cars.length) {
      dispatch(
        fetchCars({
          page: 1,
          limit: 12,
        }),
      );
    }
  }, [dispatch, cars.length, brands.length]);

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
        <p>Loading car list...</p>
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
      <CarsList cars={cars} />
      {page < totalPages && (
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
