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

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const page = useSelector(selectPageState);
  const totalPages = useSelector(selectTotalPagesState);
  const isLoading = useSelector(selectIsLoadingState);

  // При монтуванні завантажуємо першу сторінку
  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchCars({ page: page + 1, limit: 12 }));
    }
  };

  return (
    <Container className={css.container}>
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
