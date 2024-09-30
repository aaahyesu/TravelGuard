import { useState, useEffect } from "react";
import axios from "axios";

interface EmbassyData {
  embassyName: string;
  embassyAddress: string;
  phone: string;
  emergencyPhone: string;
}

const useEmbassy = (countryCode: string) => {
  const [embassyData, setEmbassyData] = useState<EmbassyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmbassyData = async () => {
      try {
        console.log("Fetching embassy data for country code:", countryCode);
        const response = await axios.get(
          `https://api.odcloud.kr/api/15076569/v1/uddi:7692653c-21f9-4396-b6b3-f3f0cdbe9370?page=1&perPage=255&returnType=JSON&serviceKey=${process.env.REACT_APP_EMBASSY_API_KEY}`
        );

        const embassy = response.data.data.find(
          (embassy: any) => embassy["국가코드(ISO 2자리 코드)"] === countryCode
        );

        if (embassy) {
          setEmbassyData({
            embassyName: embassy["재외공관명"],
            embassyAddress: embassy["재외공관주소"],
            phone: embassy["전화번호"],
            emergencyPhone: embassy["긴급전화번호"],
          });
        } else {
          setEmbassyData(null);
        }

        setLoading(false);
      } catch (err) {
        setError("재외공간 정보 찾기 실패");
        setLoading(false);
      }
    };

    fetchEmbassyData();
  }, [countryCode]);

  return { embassyData, loading, error };
};

export default useEmbassy;
