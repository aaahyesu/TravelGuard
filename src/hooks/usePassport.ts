import { useEffect, useState } from "react";
import axios from "axios";

// 여권 데이터 타입 정의
export interface PassportData {
  국가: string;
  비고: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
}

const usePassport = () => {
  const [passportData, setPassportData] = useState<PassportData[]>([]); // 데이터 배열 형태로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPassportData = async () => {
      try {
        const response = await axios.get(
          "https://api.odcloud.kr/api/15076574/v1/uddi:b0a4deac-3443-4e7b-bee1-a6163b1dbc17",
          {
            params: {
              page: 1,
              perPage: 149,
              serviceKey: process.env.REACT_APP_PASSPORTSERVICE_KEY,
            },
          }
        );

        console.log(response);
        setPassportData(response.data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassportData();
  }, []);

  return { passportData, loading, error };
};

export default usePassport;
