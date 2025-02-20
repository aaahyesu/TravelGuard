import { useEffect, useState } from "react";

// 경고 데이터 타입 정의
export type AlarmDataItem = {
  alarm_lvl: number | null; // 경보 단계
  continent_cd: string;
  continent_eng_nm: string; // 나라 명 (영어)
  continent_nm: string; // 대륙 명
  country_eng_nm: string;
  country_iso_alp2: string; // ISO 두자리
  country_nm: string; // 나라 명(한글)
  dang_map_download_url: string; // 국가 지도 사진
  flag_download_url: string; // 국기 사진 url
  map_download_url: string; // 지도 다운로드 URL
  region_ty: string; // 지역 타입
  remark: string; // 비고
  written_dt: string; // 작성 날짜
};

export const useAlarmData = () => {
  const [alarmData, setAlarmData] = useState<AlarmDataItem[]>([]);

  useEffect(() => {
    const loadAlarmData = async () => {
      const serviceKey = process.env.REACT_APP_ALARMSERVICE_KEY;
      const pageNo = 1;
      const perPage = 197;

      try {
        const response = await fetch(
          `https://apis.data.go.kr/1262000/TravelAlarmService0404/getTravelAlarm0404List?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${perPage}&returnType=JSON`
        );

        if (!response.ok) {
          console.error("HTTP 오류:", response.status);
          return;
        }

        const data = await response.json();
        console.log("API 응답:", data);

        // 데이터 구조에 맞게 설정
        if (
          data.response &&
          data.response.body &&
          data.response.body.items &&
          Array.isArray(data.response.body.items.item)
        ) {
          console.log("데이터:", data.response.body.items.item);
          setAlarmData(data.response.body.items.item);
        } else {
          console.error("데이터 구조 오류: 예상치 못한 데이터 형식");
        }
      } catch (error) {
        console.error("경고 데이터 가져오기 오류:", error);
      }
    };

    loadAlarmData(); // 컴포넌트가 마운트될 때 데이터 로드

    const intervalId = setInterval(() => {
      loadAlarmData(); // 일정 시간마다 데이터 로드
    }, 3600000); // 1시간

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return alarmData;
};
