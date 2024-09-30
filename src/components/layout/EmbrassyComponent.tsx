import React from "react";
import styled from "@emotion/styled";
import useEmbassy from "../../hooks/useEmbassy";

interface EmbassyComponentProps {
  countryCode: string;
  countryName: string;
}

const EmbassyInfoContainer = styled.div`
  width: 97%;
  height: auto;
  border-radius: 8px;
  background: linear-gradient(to bottom, #2c2f33, #23272a);
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px 40px;
  text-align: left;
  font-size: 24px;
  color: #f0f0f0;
  font-family: "Pretendard";
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 112%;
    padding: 16px 0px;
    font-size: 23px;
  }
`;

const EmbassyInfoRow = styled.div`
  margin: 0 20px 25px;
  font-weight: 400;
  font-size: 20px;
  color: #7fa9ff;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Smaller font size for mobile */
  }
`;

const EmbassyComponent: React.FC<EmbassyComponentProps> = ({
  countryCode,
  countryName,
}) => {
  console.log("Country Code:", countryCode); // Log the country code
  console.log("Country Name:", countryName); // Log the country name if used

  const { embassyData, loading, error } = useEmbassy(countryCode);

  if (loading) return <EmbassyInfoContainer>Loading...</EmbassyInfoContainer>;
  if (error)
    return (
      <EmbassyInfoContainer>Error loading embassy data</EmbassyInfoContainer>
    );

  console.log("Embassy Data:", embassyData); // Log fetched data

  if (!embassyData)
    return (
      <EmbassyInfoContainer>No embassy data available</EmbassyInfoContainer>
    );

  return (
    <EmbassyInfoContainer>
      <EmbassyInfoRow>국가: {countryName}</EmbassyInfoRow>
      <EmbassyInfoRow>재외공관: {embassyData.embassyName}</EmbassyInfoRow>
      <EmbassyInfoRow>주소: {embassyData.embassyAddress}</EmbassyInfoRow>
      <EmbassyInfoRow>대표전화번호: {embassyData.phone}</EmbassyInfoRow>
      <EmbassyInfoRow>
        긴급전화번호: {embassyData.emergencyPhone}
      </EmbassyInfoRow>
    </EmbassyInfoContainer>
  );
};

export default EmbassyComponent;
