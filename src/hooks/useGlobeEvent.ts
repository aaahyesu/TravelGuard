import { useCallback } from "react";
import { AlarmDataItem } from "./useLoadAlarm";
import { GeoJSONFeature } from "./useGeoJson";

export const useGlobeEvents = ({
  alarmData,
  setSelectedCountry,
  navigate,
  getAlarmLevelColor,
}: {
  alarmData: AlarmDataItem[];
  setSelectedCountry: (
    data: { name: string; alarmLevel: number | null } | null
  ) => void;
  navigate: any;
  getAlarmLevelColor: (level: number | null) => string;
}) => {
  const polygonCapColor = useCallback(
    (d: GeoJSONFeature | null) => {
      if (!d) return "rgba(255, 255, 255, 0.1)";
      const alarm = alarmData.find(
        (a) =>
          a.country_iso_alp2.toUpperCase() ===
          d?.properties?.ISO_A2?.toUpperCase()
      );
      return alarm
        ? getAlarmLevelColor(alarm.alarm_lvl)
        : "rgba(255, 255, 255, 0.1)";
    },
    [alarmData, getAlarmLevelColor]
  );

  const handlePolygonHover = useCallback(
    (d: GeoJSONFeature | null) => {
      if (d) {
        const alarm = alarmData.find(
          (a) =>
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
    [alarmData, setSelectedCountry]
  );

  const handlePolygonClick = useCallback(
    (d: GeoJSONFeature | null) => {
      if (d) {
        const alarm = alarmData.find(
          (a) =>
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

  return { polygonCapColor, handlePolygonHover, handlePolygonClick };
};
