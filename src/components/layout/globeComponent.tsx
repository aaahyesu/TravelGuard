/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";

import { useGeoJsonData } from "../../hooks/useGeoJson";
import { useAlarmData } from "../../hooks/useLoadAlarm";
import { useAlarmColor } from "../../hooks/useAlarmColor";
import { useGlobeEvents } from "../../hooks/useGlobeEvent";
import { useDebouncedResize } from "../../hooks/useDebouncedResize";

import LevelColors from "./LevelColors";
import { styles } from "./GlobeComponent.styles";

interface GeoJSONFeature {
  type: "Feature";
  properties: {
    ADMIN?: string; // 국가 이름
    ISO_A2?: string; // 국가 코드
    [key: string]: any; // 추가 속성 허용
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>(null);
  const geoJsonData = useGeoJsonData();
  const alarmData = useAlarmData();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    alarmLevel: number | null;
  } | null>(null);

  const { getAlarmLevelColor } = useAlarmColor();

  // 🌎 Globe 크기 상태 관리 (디바운스 적용)
  const [globeDimensions, setGlobeDimensions] = useState({
    width: window.innerWidth > 768 ? 900 : 500,
    height: window.innerWidth > 768 ? 900 : 500,
  });

  useDebouncedResize(() => {
    const isMobile = window.innerWidth <= 768;
    setGlobeDimensions({
      width: isMobile ? 500 : 1200,
      height: isMobile ? 500 : 1200,
    });
  }, 150);

  const { handlePolygonHover, handlePolygonClick, polygonCapColor } =
    useGlobeEvents({
      alarmData,
      setSelectedCountry,
      navigate,
      getAlarmLevelColor,
    });

  useEffect(() => {
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };
    preloadImage("//unpkg.com/three-globe/example/img/earth-dark.jpg");
    preloadImage("//unpkg.com/three-globe/example/img/earth-topology.png");
  }, []);

  return (
    <div css={styles.globeContainer}>
      <Globe
        ref={globeEl}
        width={globeDimensions.width}
        height={globeDimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0, 0, 0, 0)"
        polygonsData={geoJsonData?.features || []}
        polygonSideColor={() => "rgba(255, 255, 255, 0.3)"}
        polygonStrokeColor={() => "#FFFFFF"}
        polygonStrokeWidth={0.5}
        polygonCapColor={polygonCapColor}
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        polygonAltitude={(d: GeoJSONFeature | null) =>
          selectedCountry?.name === d?.properties?.ADMIN ? 0.12 : 0.01
        }
        polygonLabel={() =>
          selectedCountry
            ? `${selectedCountry.name} (경고 단계: ${
                selectedCountry.alarmLevel ?? "정보 없음"
              })`
            : ""
        }
      />
      {selectedCountry && (
        <div css={styles.selectedCountryStyle}>
          <div css={styles.itemStyle}>
            <div
              css={styles.boxStyle(
                getAlarmLevelColor(selectedCountry.alarmLevel)
              )}
            ></div>
            <span css={styles.textStyle}>
              <span>{selectedCountry.name}</span>
              <p>경고 단계: {selectedCountry.alarmLevel ?? "정보 없음"}</p>
            </span>
          </div>
        </div>
      )}
      <LevelColors />
    </div>
  );
};

export default React.memo(GlobeComponent);
