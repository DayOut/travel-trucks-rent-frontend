import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Header, Loader } from "@/components";
import "./App.css";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("@/pages/DetailsPage/DetailsPage"));
const Reviews = lazy(() => import("@/components/Reviews/Reviews"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader className="app-content-loader" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage />}>
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
