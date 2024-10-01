/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { css } from "@emotion/react";
import { useGeoJsonData, GeoJSONFeature } from "../../hooks/useGeoJson";
import { useAlarmData, AlarmDataItem } from "../../hooks/useLoadAlarm";
import LevelColors from "./LevelColors";

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>(null);
  const geoJsonData = useGeoJsonData();
  const alarmData = useAlarmData();
  const [hoveredPolygon, setHoveredPolygon] = useState<GeoJSONFeature | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    alarmLevel: number | null;
  } | null>(null);

  // 모바일과 데스크톱에 맞는 크기 설정
  const [globeDimensions, setGlobeDimensions] = useState({
    width: window.innerWidth > 768 ? 1200 : 500,
    height: window.innerWidth > 768 ? 1200 : 500,
  });

  // 윈도우 리사이즈 이벤트를 통해 동적으로 크기 변경
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setGlobeDimensions({
        width: isMobile ? 500 : 1200, // 모바일: 500, 데스크톱: 1200
        height: isMobile ? 500 : 1200,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAlarmLevelColor = (level: number | null) => {
    switch (level) {
      case 0:
        return "#E0E0E0";
      case 1:
        return "#4C8CFF";
      case 2:
        return "#5DAA8B";
      case 3:
        return "#E4D95D";
      case 4:
        return "#D14844";
      case null:
        return "#E0E0E0";
      default:
        return "#7F7F7F";
    }
  };

  const globeContainerStyle = css`
    width: 100%;
    height: calc(100vh - 140px);
    background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      align-items: flex-start;
      padding-top: 20px;
      height: 100vh;
    }
  `;
  const starFieldStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  `;

  const starStyle = css`
    position: absolute;
    background-color: white;
    border-radius: 50%;
    animation: twinkle 2s infinite alternate;

    @keyframes twinkle {
      0% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  `;
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));
  };

  const stars = generateStars(50);

  const selectedCountryStyle = css`
    position: absolute;
    top: 20%;
    left: 75%;
    padding: 20px;
    background-color: #1c1c1e;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    transform: translate(-50%, 0);
    z-index: 100;
    width: 300px;

    @media (max-width: 768px) {
      top: 11%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 30px;
      padding: 10px;
    }
  `;

  const itemStyle = css`
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
      gap: 8px;
    }
  `;

  const boxStyle = (color: string) => css`
    width: 24px;
    height: 24px;
    background-color: ${color};
    border-radius: 4px;

    @media (max-width: 768px) {
      width: 10px;
      height: 10px;
    }
  `;

  const textStyle = css`
    color: white;
    span {
      font-weight: 500;
      font-size: 22px;

      @media (max-width: 768px) {
        font-size: 13px;
      }
    }
    p {
      margin: 0;
      font-size: 20px;
      color: #b0b0b0;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  `;

  const handlePolygonClick = (d: GeoJSONFeature | null) => {
    if (d) {
      const alarm = alarmData.find(
        (a: AlarmDataItem) =>
          a.country_iso_alp2.toUpperCase() === d.properties.ISO_A2.toUpperCase()
      );
      setSelectedCountry({
        name: alarm?.country_nm || d.properties.ADMIN,
        alarmLevel: alarm?.alarm_lvl ?? null,
      });
    } else {
      setSelectedCountry(null);
    }
  };

  return (
    <div css={globeContainerStyle}>
      <div css={starFieldStyle}>
        {stars.map((star) => (
          <div
            key={star.id}
            css={css`
              ${starStyle}
              width: ${star.size}px;
              height: ${star.size}px;
              left: ${star.left};
              top: ${star.top};
              animation-delay: ${star.animationDelay};
            `}
          />
        ))}
      </div>
      <Globe
        ref={globeEl}
        width={globeDimensions.width}
        height={globeDimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0, 0, 0, 0)"
        polygonsData={geoJsonData?.features || []}
        polygonAltitude={(d: GeoJSONFeature | null) =>
          d === hoveredPolygon ? 0.12 : 0.01
        }
        polygonCapColor={(d: GeoJSONFeature | null) => {
          if (!d) return "rgba(255, 255, 255, 0.1)";

          const alarm = alarmData.find(
            (a: AlarmDataItem) =>
              a.country_iso_alp2.toUpperCase() ===
              d?.properties?.ISO_A2?.toUpperCase()
          );

          return alarm
            ? getAlarmLevelColor(alarm.alarm_lvl)
            : "rgba(255, 255, 255, 0.1)";
        }}
        polygonSideColor={() => "rgba(255, 255, 255, 0.3)"}
        polygonStrokeColor={() => "#FFFFFF"}
        polygonStrokeWidth={0.5}
        onPolygonHover={setHoveredPolygon}
        onPolygonClick={handlePolygonClick}
        polygonLabel={() => {
          if (selectedCountry) {
            return `${selectedCountry.name} (경고 단계: ${
              selectedCountry.alarmLevel !== null
                ? selectedCountry.alarmLevel
                : "정보 없음"
            })`;
          }
          return "";
        }}
      />
      {selectedCountry && (
        <div css={selectedCountryStyle}>
          <div css={itemStyle}>
            <div
              css={boxStyle(getAlarmLevelColor(selectedCountry.alarmLevel))}
            ></div>
            <div css={textStyle}>
              <span>{selectedCountry.name}</span>
              <p>
                경고 단계:{" "}
                {selectedCountry.alarmLevel !== null
                  ? selectedCountry.alarmLevel
                  : "정보 없음"}
              </p>
            </div>
          </div>
        </div>
      )}
      <LevelColors />
    </div>
  );
};

export default GlobeComponent;
