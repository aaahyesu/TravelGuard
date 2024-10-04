import { useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Header from "./components/common/Header";
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
        <AppRoutes /> {/* 분리된 라우팅 컴포넌트 사용 */}
      </AppContainer>
    </Router>
  );
}

export default App;
