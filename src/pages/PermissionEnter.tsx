import React, { ChangeEvent, useState } from "react";
import usePassport, { PassportData } from "../hooks/usePassport";
import PageHeader from "../components/common/PageHeader";
import ScrollableTable from "../components/common/ScrollableTable";
import styled from "@emotion/styled";

const Container = styled.div`
  background: transparent;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0;
    width: 110%;
  }
`;

const PermissionEnter: React.FC = () => {
  const { passportData, loading, error } = usePassport();
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        <p>(error.message)</p>
      </Container>
    );
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value); // 입력값을 상태에 저장
  }

  // 검색어에 따라 필터링된 데이터
  const filteredData = passportData.filter((country: PassportData) =>
    country["국가"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <PageHeader
        title="국가별 입국 허가 요건"
        subtitle="국가별 입국가능기간, 입국가능여부, 입국시 소지여부를 확인할 수 있습니다."
        onSearchChange={handleSearchChange}
      />
      <ScrollableTable
        headers={[
          "국가",
          "비고",
          "입국 가능 기간",
          "입국 가능 여부",
          "입국 시 소지 여부",
        ]}
        data={filteredData}
        renderRow={(country: PassportData) => (
          <tr key={country["국가"]}>
            <td>{country["국가"]}</td>
            <td>{country["비고"]}</td>
            <td>{country["일반여권소지자-입국가능기간"]}</td>
            <td>{country["일반여권소지자-입국가능여부"]}</td>
            <td>{country["입국시 소지여부"]}</td>
          </tr>
        )}
      />
    </Container>
  );
};

export default PermissionEnter;
