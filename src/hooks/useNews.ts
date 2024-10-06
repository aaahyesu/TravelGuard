import { useEffect, useState } from "react";
import axios from "axios";

export interface NewsData {
  country_nm: string;
  country_iso_alp2: string;
  file_download_url: string;
  title: string;
  txt_origin_cn: string;
  wrt_dt: string;
}

const useNews = (countryName: string) => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          "https://apis.data.go.kr/1262000/CountrySafetyService6/getCountrySafetyList6",
          {
            params: {
              serviceKey: process.env.REACT_APP_NEWSDATA_KEY,
              numOfRows: 10,
              "cond[country_nm::EQ]": countryName,
              pageNo: 1,
            },
          }
        );
        setNewsData(response.data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [countryName]);

  return { newsData, loading, error };
};

export default useNews;
