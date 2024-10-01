import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import SafeNews from "../components/layout/NewsComponent";
import PassportComponent from "../components/layout/PassportComponent";
import EmbassyComponent from "../components/layout/EmbrassyComponent";
import PageHeader from "../components/common/PageHeader";

const Container = styled.div`
  color: #f0f0f0;
  min-height: 100vh;
  padding: 17px;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const CountryBox = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 16px;
  text-align: left;
  font-size: 24px;

  @media (min-width: 768px) {
    padding: 30px;
    gap: 32px;
    font-size: 32px;
  }
`;

const FlagImg = styled.span`
  width: 130px;
  height: 75px;
  border-radius: 4px;
  background-color: #fff;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100px;
    height: 60px;
  }
`;

const CountryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CountryName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #f0f0f0;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const ContinentName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #d3d3d3;
  margin-top: 8px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContinentMap = styled.img`
  width: 110%;
  max-height: 436px;
  border-radius: 8px;
  background: transparent;
  border: 2px solid rgba(127, 169, 255, 0.6);
  object-fit: contain;

  @media (min-width: 768px) {
    width: 50%;
    height: 630px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-height: 300px;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const CountryDetail: React.FC = () => {
  const location = useLocation();
  const { country } = location.state || {};

  useEffect(() => {
    document.body.classList.add("country-detail");
    return () => {
      document.body.classList.remove("country-detail");
    };
  }, []);

  return (
    <Container>
      <PageHeader
        title={`${country?.country_nm} 국가 정보`}
        subtitle={`${country?.country_nm}의 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를 제공합니다.`}
      />

      <CountryBox>
        <FlagImg
          style={{ backgroundImage: `url(${country?.flag_download_url})` }}
        />
        <CountryInfo>
          <CountryName>
            {country?.country_nm} ({country?.country_eng_nm})
          </CountryName>
          <ContinentName>{country?.continent_nm}</ContinentName>
        </CountryInfo>
      </CountryBox>
      <ContentRow>
        <ContinentMap
          src={country?.dang_map_download_url}
          alt="Continent Map"
        />
        <InfoContainer>
          <SafeNews countryName={country?.country_nm} />
          <PassportComponent countryName={country?.country_nm} />
        </InfoContainer>
      </ContentRow>
      <EmbassyComponent
        countryCode={country?.country_iso_alp2}
        countryName={country?.country_nm}
      />
    </Container>
  );
};

export default CountryDetail;
