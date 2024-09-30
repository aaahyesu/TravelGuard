import React, { useState } from "react";
import styled from "@emotion/styled";
import useNews from "../../hooks/useNews";
import Modal from "../common/Modal";

const SafeNewsContainer = styled.div`
  width: 112%;
  height: auto;
  max-height: 260px;
  position: relative;
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

  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 20px;
    width: 98%;
  }
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid rgba(127, 169, 255, 0.6);
  margin: 16px 0;
`;

const NewsList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  background: transparent;

  scrollbar-width: thin;
  scrollbar-color: #8f98ac transparent;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 설정 (웹킷 브라우저) */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤 트랙 투명 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8f98ac; /* 스크롤바 색상 */
    border-radius: 8px;
  }
`;

const NewsItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  line-height: 30px;
  border-bottom: 1px solid #5e5e5e;
  padding-bottom: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    line-height: 24px; /* Adjusted line height for mobile */
  }
`;

const NewsItemTitle = styled.span`
  font-size: 18px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px; /* Smaller font size for news item title on mobile */
  }
`;

const NewsItemDate = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: #d3d3d3;
  margin-left: 10px; /* 날짜와 스크롤바 사이의 간격 */

  @media (max-width: 768px) {
    font-size: 16px; /* Smaller font size for news item date on mobile */
  }
`;

const NewsComponent: React.FC<{ countryName: string }> = ({ countryName }) => {
  const { newsData, loading, error } = useNews(countryName);
  const [selectedNews, setSelectedNews] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openModal = (title: string, content: string) => {
    setSelectedNews({ title, content });
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  return (
    <SafeNewsContainer>
      <NewsTitle>안전 공지</NewsTitle>
      <Divider />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading news data</p>
      ) : newsData.length === 0 ? (
        <p>해당 국가의 안전 공지가 없습니다.</p>
      ) : (
        <NewsList>
          {newsData.map((news, index) => (
            <NewsItem
              key={index}
              onClick={() => openModal(news.title, news.txt_origin_cn)}
            >
              <NewsItemTitle>{news.title}</NewsItemTitle>
              <NewsItemDate>{news.wrt_dt}</NewsItemDate>
            </NewsItem>
          ))}
        </NewsList>
      )}

      {selectedNews && (
        <Modal
          title={selectedNews.title}
          content={selectedNews.content}
          onClose={closeModal}
        />
      )}
    </SafeNewsContainer>
  );
};

export default NewsComponent;
