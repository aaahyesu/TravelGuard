import React from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import SafeNews from "../components/layout/NewsComponent";
import PassportComponent from "../components/layout/PassportComponent";
import EmbassyComponent from "../components/layout/EmbrassyComponent";

const Container = styled.div`
  color: #f0f0f0;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #f0f0f0;
  font-weight: 700;
  margin-bottom: 20px;
  padding-top: 30px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-top: 15px;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #d3d3d3;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const CountryBox = styled.div`
  width: 98%;
  border-radius: 8px;
  background: linear-gradient(to bottom, #2c2f33, #23272a);
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
  width: 86px;
  height: 54px;
  border-radius: 4px;
  background-color: #fff;
  background-size: cover;
  background-position: center;

  @media (min-width: 768px) {
    width: 172px;
    height: 108px;
  }
`;

const CountryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CountryName = styled.div`
  font-size: 24px; /* Default font size for mobile */
  font-weight: 700;
  color: #f0f0f0;

  @media (min-width: 768px) {
    font-size: 32px; /* Larger font size for desktop */
  }
`;

const ContinentName = styled.div`
  font-size: 14px; /* Default font size for mobile */
  font-weight: 400;
  color: #d3d3d3;
  margin-top: 8px;

  @media (min-width: 768px) {
    font-size: 18px; /* Larger font size for desktop */
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column; /* Stack elements on mobile */
  gap: 20px;
  margin-top: 40px;

  @media (min-width: 768px) {
    flex-direction: row; /* Row layout for desktop */
  }
`;

const ContinentMap = styled.img`
  width: 110%;
  border-radius: 8px;
  background: transparent;
  border: 2px solid rgba(127, 169, 255, 0.6);
  object-fit: contain;

  @media (min-width: 768px) {
    width: 50%; /* Half width for desktop */
    height: 630px; /* Fixed height for desktop */
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* Full width for mobile */

  @media (min-width: 768px) {
    width: 40%; /* Reduced width for desktop */
  }
`;

const CountryDetail: React.FC = () => {
  const location = useLocation();
  const { country } = location.state || {};

  return (
    <Container>
      <Title>국가별 정보</Title>
      <Subtitle>
        {country?.country_nm} 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를
        제공합니다.
      </Subtitle>
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
