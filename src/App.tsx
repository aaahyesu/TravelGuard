import "./App.css";
import GlobeComponent from "./components/layout/globeComponent";
import Header from "./components/common/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryInfoPage from "./pages/CountryInfoPage";
import PermissionEnter from "./pages/PermissionEnter";
import EmbassyPage from "./pages/EmbassyPage";
import styled from "@emotion/styled";

const SubContainer = styled.div`
  padding: 0 15%;
  height: 100%;
  /* background: linear-gradient(to bottom, #0a033a 0%, #040019 43%, #040019 100%); */
  /* background: #040019; */
  background: linear-gradient(to bottom, #0a0818, #1b3d50);

  overflow: auto;
`;

function App() {
  return (
    <Router>
      <div className="App">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
