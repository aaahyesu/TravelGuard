import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SubContainer from "./components/layout/SubContainer";
import GlobeComponent from "./components/layout/globeComponent";

const CountryInfoPage = lazy(() => import("./pages/CountryInfoPage"));
const CountryDetail = lazy(() => import("./pages/CountryDetail"));
const PermissionEnter = lazy(() => import("./pages/PermissionEnter"));
const EmbassyPage = lazy(() => import("./pages/EmbassyPage"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<GlobeComponent />} />
        <Route
          path="/country-info"
          element={
            <SubContainer>
              <CountryInfoPage />
            </SubContainer>
          }
        />
        <Route
          path="/permission-enter"
          element={
            <SubContainer>
              <PermissionEnter />
            </SubContainer>
          }
        />
        <Route
          path="/embassy-info"
          element={
            <SubContainer>
              <EmbassyPage />
            </SubContainer>
          }
        />
        <Route
          path="/country-detail/:countryName"
          element={
            <SubContainer>
              <CountryDetail />
            </SubContainer>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
