import React, { useState } from "react";
import styled from "@emotion/styled";
import Search from "../components/common/Search";
import { useAlarmData, AlarmDataItem } from "../hooks/useLoadAlarm";

const Container = styled.div`
  color: #f0f0f0;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #f0f0f0;
  font-weight: 700;
  margin-bottom: 20px;
  padding-top: 30px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #d3d3d3;
  margin-bottom: 40px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  color: #f0f0f0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s, opacity 0.3s;
  border: 1px solid rgba(8, 8, 8, 0.5);
  background: ${(props) =>
    props.active
      ? `radial-gradient(
          50% 50% at 50% 50%,
          rgba(127, 169, 255, 0.2),
          rgba(0, 0, 0, 0)
        ), rgba(8, 8, 8, 0.8)`
      : `rgba(8, 8, 8, 0.3)`};
  border: ${(props) =>
    props.active
      ? `1px solid rgba(127, 169, 255, 0.6)`
      : `1px solid rgba(8, 8, 8, 0.5)`};
  opacity: ${(props) => (props.active ? 1 : 0.7)};

  &:hover {
    background-color: ${(props) => (props.active ? "#4a4ae9" : "#2a2a4e")};
    border: ${(props) =>
      props.active
        ? `1px solid rgba(127, 169, 255, 0.8)`
        : `1px solid rgba(8, 8, 8, 0.7)`};
  }
`;

const ColorIcon = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const DataContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  background-color: #1a1a1a;
  border: 1px solid #7fa9ff99;
  border-radius: 10px;
  max-height: 500px; /* 스크롤을 위한 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 활성화 */
`;

const DataBox = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  color: #f0f0f0;
  border-radius: 8px;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s, opacity 0.3s;
  background-color: rgba(8, 8, 8, 0.3);
  border: 1px solid rgba(8, 8, 8, 0.5);
  opacity: 0.7;
  &:hover {
    background-color: #52525e;
    border: 1px solid rgba(127, 169, 255, 0.8);
  }
`;

const CountryInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const alarmData = useAlarmData(); // API로부터 데이터를 가져옴

  const tabs = [
    { text: "1단계 여행유의", color: "#4C8CFF", level: 1 },
    { text: "2단계 여행자제", color: "#5DAA8B", level: 2 },
    { text: "3단계 출국권고", color: "#E4D95D", level: 3 },
    { text: "4단계 여행금지", color: "#D14844", level: 4 },
    { text: "0단계 안전국가", color: "#E0E0E0", level: null },
  ];

  // 현재 활성화된 탭에 해당하는 경고 레벨 데이터 필터링
  const filteredData = alarmData.filter(
    (item: AlarmDataItem) =>
      item.alarm_lvl === tabs[activeTab].level &&
      item.country_nm.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어 필터링
  );

  // 검색 핸들러 함수
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Title>국가별 정보</Title>
      <Subtitle>
        국가별 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를 제공합니다.
      </Subtitle>
      <Search onChange={handleSearchChange} /> {/* 검색어 업데이트 */}
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
            <DataBox key={index} color={tabs[activeTab].color}>
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
