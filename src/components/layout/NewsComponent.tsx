import React, { useState } from "react";
import styled from "@emotion/styled";
import useNews from "../../hooks/useNews";
import Modal from "../common/Modal";

const SafeNewsContainer = styled.div`
  width: 112%;
  height: auto;
  max-height: 200px;
  position: relative;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 40px;
  font-family: "Pretendard";

  @media (max-width: 768px) {
    padding: 5px 20px;
    width: 98%;
  }
`;

const NoSafeNewsContainer = styled.div`
  width: 112%;
  height: auto;
  min-height: 225px;
  position: relative;
  border-radius: 8px;
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
    padding: 0 20px;
    min-height: 100px;
    font-size: 16px;
    width: 98%;
  }
`;

const NewsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 0;
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
    line-height: 20px;
  }
`;

const NewsItemTitle = styled.span`
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const NewsItemDate = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #d3d3d3;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
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

  if (loading) {
    return <NoSafeNewsContainer>Loading...</NoSafeNewsContainer>;
  }

  if (error) {
    return <NoSafeNewsContainer>Error: {error.message}</NoSafeNewsContainer>;
  }

  if (newsData.length === 0) {
    return (
      <NoSafeNewsContainer>
        해당 국가의 안전 공지가 없습니다.
      </NoSafeNewsContainer>
    );
  }

  return (
    <SafeNewsContainer>
      <NewsTitle>안전 공지</NewsTitle>
      <Divider />
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
