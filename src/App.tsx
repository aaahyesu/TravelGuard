import { useMemo } from "react";
import "./App.css";
import GlobeComponent from "./components/layout/globeComponent";
import Header from "./components/common/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryInfoPage from "./pages/CountryInfoPage";
import CountryDetail from "./pages/CountryDetail";
import PermissionEnter from "./pages/PermissionEnter";
import EmbassyPage from "./pages/EmbassyPage";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const twinkle = keyframes`
  0% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
  overflow: hidden;
`;

const Star = styled.div<{
  size: number;
  top: string;
  left: string;
  delay: string;
}>`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: ${twinkle} 2s infinite alternate;
  animation-delay: ${(props) => props.delay};
`;

const SubContainer = styled.div`
  padding: 0 15%;
  height: 100%;
  overflow: auto;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 12% 0 5%;
  }
`;

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
  }));
};

function App() {
  const stars = useMemo(() => generateStars(50), []);

  return (
    <Router>
      <AppContainer>
        {stars.map((star) => (
          <Star
            key={star.id}
            size={star.size}
            top={star.top}
            left={star.left}
            delay={star.delay}
          />
        ))}
        <Header />
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
      </AppContainer>
    </Router>
  );
}

export default App;
