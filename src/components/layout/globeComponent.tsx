/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import { css } from "@emotion/react";
import { useGeoJsonData, GeoJSONFeature } from "../../hooks/useGeoJson";
import { useAlarmData, AlarmDataItem } from "../../hooks/useLoadAlarm";
import LevelColors from "./LevelColors";

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>(null);
  const geoJsonData = useGeoJsonData();
  const alarmData = useAlarmData();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    alarmLevel: number | null;
  } | null>(null);

  // 모바일과 데스크톱에 맞는 크기 설정
  const [globeDimensions, setGlobeDimensions] = useState({
    width: window.innerWidth > 768 ? 900 : 500,
    height: window.innerWidth > 768 ? 900 : 500,
  });

  // 윈도우 리사이즈 이벤트를 통해 동적으로 크기 변경
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setGlobeDimensions({
        width: isMobile ? 500 : 1200,
        height: isMobile ? 500 : 1200,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAlarmLevelColor = useCallback((level: number | null) => {
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
  }, []);

  const globeContainerStyle = css`
    width: 100%;
    height: calc(100vh - 140px);
    background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 55px;
    @media (max-width: 768px) {
      align-items: flex-start;
      padding-top: 20px;
      height: 100vh;
      margin-left: 0;
    }
  `;

  const selectedCountryStyle = css`
    position: absolute;
    top: 20%;
    left: 80%;
    padding: 10px;
    background-color: #1c1c1e;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    transform: translate(-50%, 0);
    z-index: 100;
    width: 200px;
    height: auto;

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
    width: 20px;
    height: 20px;
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
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    p {
      margin: 0;
      font-size: 12px;
      color: #b0b0b0;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  `;

  const handlePolygonHover = useCallback(
    (d: GeoJSONFeature | null) => {
      if (d) {
        const alarm = alarmData.find(
          (a: AlarmDataItem) =>
            a.country_iso_alp2.toUpperCase() ===
            d.properties.ISO_A2.toUpperCase()
        );
        setSelectedCountry({
          name: alarm?.country_nm || d.properties.ADMIN,
          alarmLevel: alarm?.alarm_lvl ?? null,
        });
      } else {
        setSelectedCountry(null);
      }
    },
    [alarmData]
  );

  const handlePolygonClick = useCallback(
    (d: GeoJSONFeature | null) => {
      if (d) {
        const alarm = alarmData.find(
          (a: AlarmDataItem) =>
            a.country_iso_alp2.toUpperCase() ===
            d.properties.ISO_A2.toUpperCase()
        );
        navigate(`/country-detail/${alarm?.country_nm}`, {
          state: { country: alarm },
        });
      }
    },
    [navigate, alarmData]
  );

  return (
    <div css={globeContainerStyle}>
      <Globe
        ref={globeEl}
        width={globeDimensions.width}
        height={globeDimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0, 0, 0, 0)"
        polygonsData={geoJsonData?.features || []}
        polygonAltitude={(d: GeoJSONFeature | null) =>
          d === selectedCountry ? 0.12 : 0.01
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
        onPolygonHover={handlePolygonHover}
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
            <span css={textStyle}>
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
