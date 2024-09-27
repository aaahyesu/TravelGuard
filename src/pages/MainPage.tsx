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
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 37.5665, lng: 126.978, altitude: 2 });
    }
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
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
