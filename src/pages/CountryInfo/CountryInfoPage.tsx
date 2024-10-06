import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { useAlarmData, AlarmDataItem } from "../../hooks/useLoadAlarm";
import {
  Container,
  TabContainer,
  Tab,
  ColorIcon,
  DataContainer,
  DataBox,
} from "./CountryInfoStyle"; // 스타일 임포트

const CountryInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const alarmData = useAlarmData(); // API로부터 데이터를 가져옴
  const navigate = useNavigate();

  const tabs = [
    { text: "1단계 여행유의", color: "#4C8CFF", level: 1 },
    { text: "2단계 여행자제", color: "#5DAA8B", level: 2 },
    { text: "3단계 출국권고", color: "#E4D95D", level: 3 },
    { text: "4단계 여행금지", color: "#D14844", level: 4 },
    { text: "0단계 안전국가", color: "#E0E0E0", level: null },
  ];

  const filteredData = alarmData.filter(
    (item: AlarmDataItem) =>
      item.alarm_lvl === tabs[activeTab].level &&
      item.country_nm.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어 필터링
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryClick = (country: AlarmDataItem) => {
    navigate(`/country-detail/${encodeURIComponent(country.country_nm)}`, {
      state: { country },
    });
  };

  return (
    <Container>
      <PageHeader
        title="국가별 정보"
        subtitle="국가별 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를 제공합니다."
        onSearchChange={handleSearchChange}
      />
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <ColorIcon color={tab.color} />
            {tab.text}
          </Tab>
        ))}
      </TabContainer>
      <DataContainer>
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <DataBox
              key={index}
              color={tabs[activeTab].color}
              onClick={() => handleCountryClick(data)}
            >
              <ColorIcon color={tabs[activeTab].color} />
              {data.country_nm}
            </DataBox>
          ))
        ) : (
          <p>해당 단계에 해당하는 데이터가 없습니다.</p>
        )}
      </DataContainer>
    </Container>
  );
};

export default CountryInfoPage;
