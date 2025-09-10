// CatalogPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
import {
  selectCarsList,
  selectPageState,
  selectTotalPagesState,
  selectIsLoadingState,
} from '../../redux/cars/selectors';
import Container from '../../components/Container/Container';
import CarsList from '../../components/CarsList/CarsList';
import css from './CatalogPage.module.css';
import { useEffect } from 'react';
import CarsFilterForm from '../../components/CarFilterForm/CarsFilterForm';
import { fetchBrands } from '../../redux/filters/operations';
import { selectBrands } from '../../redux/filters/selectors';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const page = useSelector(selectPageState);
  const totalPages = useSelector(selectTotalPagesState);
  const isLoading = useSelector(selectIsLoadingState);
  const brands = useSelector(selectBrands);

  // При монтуванні завантажуємо першу сторінку
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchCars({ page: page + 1, limit: 12 }));
    }
  };

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
      )}{' '}
    </Container>
  );
}
