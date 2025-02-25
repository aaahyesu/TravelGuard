import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Header from "./components/common/Header";
import styled from "@emotion/styled";
import StarField from "./components/layout/StarField";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
  overflow: hidden;
`;

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContainer>
          {/* SEO를 위한 메타 태그 추가 */}
          <Helmet>
            <title>Travel Guard - 해외여행 안전 정보</title>
            <meta
              name="description"
              content="전세계 국가별 여행 경보, 입국 정보, 대사관 정보를 제공하는 해외여행 안전 정보 서비스입니다."
            />
            <meta
              name="keywords"
              content="해외여행,여행경보,입국정보,대사관,여행안전"
            />
            <meta
              property="og:title"
              content="Travel Guard - 해외여행 안전 정보"
            />
            <meta
              property="og:description"
              content="전세계 국가별 여행 경보, 입국 정보, 대사관 정보를 제공하는 해외여행 안전 정보 서비스입니다."
            />
            <link rel="canonical" href="https://travelguard-jade.vercel.app/" />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://travelguard-jade.vercel.app/"
            />
            <meta property="og:image" content="https://ibb.co/20QfSDWv" />
            <meta name="robots" content="index,follow" />
            <meta
              name="google-site-verification"
              content="google83f1ddad107d1633.html"
            />
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Travel Guard",
                  "description": "전세계 국가별 여행 경보, 입국 정보, 대사관 정보를 제공하는 해외여행 안전 정보 서비스",
                  "url": "https://travelguard-jade.vercel.app/"
                }
              `}
            </script>
          </Helmet>
          <StarField />
          <Header />
          <AppRoutes />
        </AppContainer>
      </Router>
    </HelmetProvider>
  );
}

export default App;
