import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Header from "./components/common/Header";
import styled from "@emotion/styled";
import StarField from "./components/layout/StarField";

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
  overflow: hidden;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <StarField />
        <Header />
        <AppRoutes />
      </AppContainer>
    </Router>
  );
}

export default App;
