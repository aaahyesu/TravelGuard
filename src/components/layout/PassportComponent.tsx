import React from "react";
import styled from "@emotion/styled";
import usePassport, { PassportData } from "../../hooks/usePassport";

// 스타일 정의
const PassportInfoContainer = styled.div`
  width: 112%;
  height: auto;
  min-height: 270px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(to bottom, #2c2f33, #23272a);
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 40px 40px 0;
  text-align: left;
  font-size: 28px;
  color: #f0f0f0;
  font-family: "Pretendard";

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px 20px 0px;
    min-height: 200px;
    font-size: 23px;
  }
`;

const PassportItem = styled.p`
  position: relative;
  font-size: 20px;
  line-height: 50%;
  font-family: "Pretendard Variable";
  color: #7fa9ff;
  text-align: left;

  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Smaller font size for mobile */
  }
`;

interface PassportComponentProps {
  countryName: string; // CountryDetail에서 국가 이름을 prop으로 받아온다.
}

const PassportComponent: React.FC<PassportComponentProps> = ({
  countryName,
}) => {
  const { passportData, loading, error } = usePassport();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // passportData에서 해당 국가 정보를 찾는다.
  const countryInfo = passportData.find(
    (country: PassportData) => country["국가"] === countryName
  );

  if (!countryInfo) {
    return <div>해당 국가의 여권 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <PassportInfoContainer>
      <PassportItem>국가: {countryInfo["국가"]}</PassportItem>
      <PassportItem>비고: {countryInfo["비고"]}</PassportItem>
      <PassportItem>
        일반여권 소지자 - 입국 가능 기간:{" "}
        {countryInfo["일반여권소지자-입국가능기간"]}
      </PassportItem>
      <PassportItem>
        일반여권 소지자 - 입국 가능 여부:{" "}
        {countryInfo["일반여권소지자-입국가능여부"]}
      </PassportItem>
      <PassportItem>
        입국 시 소지 여부: {countryInfo["입국시 소지여부"]}
      </PassportItem>
    </PassportInfoContainer>
  );
};

export default PassportComponent;
