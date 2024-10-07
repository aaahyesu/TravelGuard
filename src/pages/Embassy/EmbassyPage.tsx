import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useEmbassy from "../../hooks/useEmbassy";
import PageHeader from "../../components/common/PageHeader";
import ScrollableTable from "../../components/common/ScrollableTable";
import { Container } from "./EmbassyStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface EmbassyData {
  countryName: string;
  embassyName: string;
  embassyAddress: string;
  phone: string;
  emergencyPhone: string;
}

const EmbassyPage: React.FC = () => {
  const { embassyData, loading, error } = useEmbassy();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

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

  // 국가명 클릭 시 이동하는 함수
  const handleCountryClick = (countryName: string) => {
    navigate(`/country-detail/${encodeURIComponent(countryName)}`);
  };

  return (
    <Container>
      <PageHeader
        title="국가별 대사관 정보"
        subtitle="국가명 검색을 통해 비상시 필요한 대사관 정보를 얻을 수 있습니다."
        onSearchChange={handleSearchChange}
      />
      {filteredData.length > 0 ? (
        <ScrollableTable
          headers={["국가명", "대사관명", "주소", "전화번호", "긴급전화번호"]}
          data={filteredData}
          renderRow={(embassy: EmbassyData) => (
            <tr
              key={embassy.countryName}
              onClick={() => handleCountryClick(embassy.countryName)} // 행 클릭 이벤트 추가
              style={{ cursor: "pointer" }}
            >
              <td>{embassy.countryName}</td>
              <td>{embassy.embassyName}</td>
              <td>{embassy.embassyAddress}</td>
              <td>{embassy.phone}</td>
              <td>{embassy.emergencyPhone}</td>
              <td>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ cursor: "pointer", color: "#7fa9ff" }}
                  onClick={() => handleCountryClick(embassy.countryName)}
                  title={`${embassy.countryName} 정보 보기`}
                />
              </td>
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
