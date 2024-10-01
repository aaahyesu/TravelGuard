import React, { useState, ChangeEvent } from "react";
import useEmbassy from "../hooks/useEmbassy";
import PageHeader from "../components/common/PageHeader";
import ScrollableTable from "../components/common/ScrollableTable";
import styled from "@emotion/styled";

interface EmbassyData {
  countryName: string;
  embassyName: string;
  embassyAddress: string;
  phone: string;
  emergencyPhone: string;
}

const Container = styled.div`
  background: transparent;
  min-height: 100vh;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
    width: 110%;
  }
`;

const EmbassyPage: React.FC = () => {
  const { embassyData, loading, error } = useEmbassy();
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  }

  if (loading) {
    return (
      <Container>
        <p>페이지를 불러오는 중 입니다 . . .</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  const filteredData = embassyData
    ? embassyData.filter((embassy: EmbassyData) =>
        embassy.countryName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 중복 제거
  const uniqueData = Array.from(
    new Map(
      filteredData.map((embassy) => [embassy.countryName, embassy])
    ).values()
  );

  return (
    <Container>
      <PageHeader
        title="국가별 대사관 정보"
        subtitle="국가명 검색을 통해 비상시 필요한 대사관 정보를 얻을 수 있습니다."
        onSearchChange={handleSearchChange}
      />
      {uniqueData.length > 0 ? (
        <ScrollableTable
          headers={["국가명", "대사관명", "주소", "전화번호", "긴급전화번호"]}
          data={uniqueData}
          renderRow={(embassy: EmbassyData) => (
            <tr key={embassy.countryName}>
              <td>{embassy.countryName}</td>
              <td>{embassy.embassyName}</td>
              <td>{embassy.embassyAddress}</td>
              <td>{embassy.phone}</td>
              <td>{embassy.emergencyPhone}</td>
            </tr>
          )}
        />
      ) : (
        <p>대사관 정보가 없습니다.</p>
      )}
    </Container>
  );
};

export default EmbassyPage;
