import { useState, useEffect } from "react";
import axios from "axios";

interface EmbassyData {
  countryName: string;
  embassyName: string;
  embassyAddress: string;
  phone: string;
  emergencyPhone: string;
}

const useEmbassy = (countryCode?: string) => {
  const [embassyData, setEmbassyData] = useState<EmbassyData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmbassyData = async () => {
      try {
        console.log("Fetching embassy data");
        const response = await axios.get(
          `https://api.odcloud.kr/api/15076569/v1/uddi:7692653c-21f9-4396-b6b3-f3f0cdbe9370?page=1&perPage=255&returnType=JSON&serviceKey=${process.env.REACT_APP_EMBASSY_API_KEY}`
        );

        const data = response.data.data;

        if (countryCode) {
          const embassy = data.find(
            (embassy: any) =>
              embassy["국가코드(ISO 2자리 코드)"] === countryCode
          );

          if (embassy) {
            setEmbassyData([
              {
                countryName: embassy["국가명"],
                embassyName: embassy["재외공관명"],
                embassyAddress: embassy["재외공관주소"],
                phone: embassy["전화번호"],
                emergencyPhone: embassy["긴급전화번호"],
              },
            ]);
          } else {
            setEmbassyData(null);
          }
        } else {
          const allEmbassies = data.map((embassy: any) => ({
            countryName: embassy["국가명"],
            embassyName: embassy["재외공관명"],
            embassyAddress: embassy["재외공관주소"],
            phone: embassy["전화번호"],
            emergencyPhone: embassy["긴급전화번호"],
          }));
          setEmbassyData(allEmbassies);
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
