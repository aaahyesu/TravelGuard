import React from "react";
import styled from "@emotion/styled";
import usePassport, { PassportData } from "../../hooks/usePassport";

// 스타일 정의
const PassportInfoContainer = styled.div`
  width: 112%;
  height: auto;
  min-height: 160px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px 40px 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 20px 0px;
    min-height: 130px;
    font-size: 23px;
  }
`;

const PassportItem = styled.p`
  position: relative;
  font-size: 15px;
  line-height: 30%;
  font-family: "Pretendard Variable";
  color: #f0f0f0;
  text-align: left;

  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const NoCountryContainer = styled.div`
  width: 112%;
  height: auto;
  min-height: 190px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
  font-size: 16px;
  color: #f0f0f0;
  font-family: "Pretendard";

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    min-height: 100px;
    font-size: 16px;
  }
`;

interface PassportComponentProps {
  countryName: string;
}

const PassportComponent: React.FC<PassportComponentProps> = ({
  countryName,
}) => {
  const { passportData, loading, error } = usePassport();

  if (loading) return <div>Loading...</div>;

  // error가 string 또는 Error 타입인지 체크
  const isError = (error: any): error is Error => {
    return error instanceof Error;
  };

  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : isError(error)
        ? error.message
        : "알 수 없는 오류 발생";
    return <div>Error: {errorMessage}</div>;
  }

  // passportData가 undefined일 경우 체크
  if (!passportData || !Array.isArray(passportData)) {
    return <NoCountryContainer>여권 데이터가 없습니다.</NoCountryContainer>;
  }

  // passportData에서 해당 국가 정보를 찾기
  const countryInfo = passportData.find(
    (country: PassportData) => country["국가"] === countryName
  );

  if (!countryInfo) {
    return (
      <NoCountryContainer>
        해당 국가의 여권 정보를 찾을 수 없습니다.
      </NoCountryContainer>
    );
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
