import { useEffect, useState } from "react";

// GeoJSON 타입 정의
export type GeoJSONFeature = {
  type: "Feature";
  properties: {
    ADMIN: string;
    ISO_A2: string;
    LAT: number; // 위도
    LON: number; // 경도
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
};

export type GeoJSONData = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export const useGeoJsonData = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJSONData | null>(null);

  useEffect(() => {
    const loadGeoJsonData = async () => {
      try {
        const response = await fetch("/utils/countries.geojson");
        const data: GeoJSONData = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("GeoJSON 로딩 오류:", error);
      }
    };

    loadGeoJsonData();
  }, []);

  return geoJsonData;
};
