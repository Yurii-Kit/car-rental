import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';

import SvgSprite from '../SvgSprite/SvgSprite';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const CarPage = lazy(() => import('../../pages/CarPage/CarPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);

export default function App() {
  return (
    <>
      <SvgSprite /> {/* ✅ один раз у DOM */}
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
