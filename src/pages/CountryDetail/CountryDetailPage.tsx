import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CountryBox,
  FlagImg,
  CountryInfo,
  CountryName,
  ContinentName,
  ContentRow,
  ContinentMap,
  InfoContainer,
} from "./CountryDetailStyle";
import SafeNews from "../../components/layout/NewsComponent";
import PassportComponent from "../../components/layout/PassportComponent";
import EmbassyComponent from "../../components/layout/EmbassyComponent";
import PageHeader from "../../components/common/PageHeader";
import { useAlarmData, AlarmDataItem } from "../../hooks/useLoadAlarm";

const CountryDetailPage: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>(); // URL에서 국가명 추출
  const alarmData = useAlarmData(); // 모든 경고 데이터를 가져옴
  const [country, setCountry] = useState<AlarmDataItem | null>(null); // 특정 국가 데이터를 저장할 상태

  useEffect(() => {
    // 경고 데이터에서 URL의 국가 이름에 해당하는 국가 데이터를 찾음
    if (alarmData.length > 0 && countryName) {
      const foundCountry = alarmData.find(
        (item) => item.country_nm === decodeURIComponent(countryName)
      );
      if (foundCountry) {
        setCountry(foundCountry); // 해당 국가 데이터를 상태에 저장
      } else {
        console.error("국가 데이터를 찾을 수 없습니다.");
      }
    }
  }, [alarmData, countryName]);

  useEffect(() => {
    document.body.classList.add("country-detail");
    return () => {
      document.body.classList.remove("country-detail");
    };
  }, []);

  if (!country) {
    return <div>해당 국가 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <PageHeader
        title={`${country.country_nm} 국가 정보`}
        subtitle={`${country.country_nm}의 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를 제공합니다.`}
      />

      <CountryBox>
        <FlagImg
          style={{ backgroundImage: `url(${country.flag_download_url})` }}
        />
        <CountryInfo>
          <CountryName>
            {country.country_nm} ({country.country_eng_nm})
          </CountryName>
          <ContinentName>{country.continent_nm}</ContinentName>
        </CountryInfo>
      </CountryBox>
      <ContentRow>
        <ContinentMap src={country.dang_map_download_url} alt="Continent Map" />
        <InfoContainer>
          <SafeNews countryName={country.country_nm} />
          <PassportComponent countryName={country.country_nm} />
        </InfoContainer>
      </ContentRow>
      <EmbassyComponent
        countryCode={country.country_iso_alp2}
        countryName={country.country_nm}
      />
    </Container>
  );
};

export default CountryDetailPage;
