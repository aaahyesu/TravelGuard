import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import Header from "../components/common/Header";

// Globe 인스턴스를 위한 타입을 정의
interface GlobeInstance {
  pointOfView: (params: { lat: number; lng: number; altitude: number }) => void;
}

// GlobeComponent 정의
const GlobeComponent: React.FC = () => {
  // Globe 인스턴스를 위한 useRef 선언, 초기 값은 null
  const globeEl = useRef<GlobeInstance | null>(null); // GlobeInstance를 사용

  useEffect(() => {
    // globeEl.current가 null이 아닌 경우에만 pointOfView 메서드 호출
    const timeout = setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.pointOfView({
          lat: 37.5665, // 대한민국의 위도
          lng: 126.978, // 대한민국의 경도
          altitude: 2, // 줌 레벨 (1이 기본값, 더 작을수록 확대됨)
        });
      }
    }, 500); // 지연을 조금 주어 렌더링이 끝난 후 호출

    return () => clearTimeout(timeout); // 컴포넌트가 언마운트될 때 타이머 클리어
  }, []);

  return (
    <>
      <div>
        <Header />
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        />
      </div>
    </>
  );
};

export default GlobeComponent;
