import React, { ChangeEvent, useState } from "react";
import usePassport, { PassportData } from "../../hooks/usePassport";
import PageHeader from "../../components/common/PageHeader";
import ScrollableTable from "../../components/common/ScrollableTable";
import { Container } from "./PermissionEnterStyle";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PermissionEnter: React.FC = () => {
  const { passportData, loading, error } = usePassport();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

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
        <p>{error.message}</p>
      </Container>
    );
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value);
  }

  const filteredData = passportData.filter((country: PassportData) =>
    country["국가"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHomeClick = (country: PassportData) => {
    navigate(`/country-detail/${encodeURIComponent(country["국가"])}`, {
      state: { country },
    });
  };

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
          <tr
            key={country["국가"]}
            onClick={() => handleHomeClick(country)}
            style={{ cursor: "pointer" }}
          >
            <td>{country["국가"]}</td>
            <td>{country["비고"]}</td>
            <td>{country["일반여권소지자-입국가능기간"]}</td>
            <td>{country["일반여권소지자-입국가능여부"]}</td>
            <td style={{ position: "relative" }}>
              {country["입국시 소지여부"]}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#7fa9ff",
                }}
              />
            </td>
          </tr>
        )}
      />
    </Container>
  );
};

export default PermissionEnter;
