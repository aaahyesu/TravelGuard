import React from "react";
import styled from "@emotion/styled";
import useEmbassy from "../../hooks/useEmbassy";

interface EmbassyComponentProps {
  countryCode: string;
  countryName: string;
}

const EmbassyInfoContainer = styled.div`
  width: 96.5%;
  height: auto;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 40px;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    width: 98%;
    padding: 5px 20px;
    font-size: 10px;
  }
`;

const EmbassyInfoRow = styled.div`
  margin: 10px 0;
  font-weight: 400;
  font-size: 16px;
  color: #f0f0f0;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const EmbassyComponent: React.FC<EmbassyComponentProps> = ({
  countryCode,
  countryName,
}) => {
  const { embassyData, loading, error } = useEmbassy(countryCode);

  if (loading) return <EmbassyInfoContainer>Loading...</EmbassyInfoContainer>;
  if (error)
    return (
      <EmbassyInfoContainer>Error loading embassy data</EmbassyInfoContainer>
    );

  if (!embassyData || embassyData.length === 0)
    return (
      <EmbassyInfoContainer>No embassy data available</EmbassyInfoContainer>
    );

  const embassy = embassyData[0]; // 배열의 첫 번째 요소 사용

  return (
    <EmbassyInfoContainer>
      <EmbassyInfoRow>국가: {countryName}</EmbassyInfoRow>
      <EmbassyInfoRow>재외공관: {embassy.embassyName}</EmbassyInfoRow>
      <EmbassyInfoRow>주소: {embassy.embassyAddress}</EmbassyInfoRow>
      <EmbassyInfoRow>대표전화번호: {embassy.phone}</EmbassyInfoRow>
      <EmbassyInfoRow>긴급전화번호: {embassy.emergencyPhone}</EmbassyInfoRow>
    </EmbassyInfoContainer>
  );
};

export default EmbassyComponent;
