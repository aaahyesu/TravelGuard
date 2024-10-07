import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.div`
  margin: auto;
  color: #f0f0f0;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 28px;
  color: #f0f0f0;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-top: 15px;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #d3d3d3;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 40px auto;
`;

const SearchInput = styled.input`
  padding: 10px 50px;
  width: 94%;
  background-color: transparent;
  border-radius: 16px;
  background-color: #020010;
  border: 2px solid rgba(127, 169, 255, 0.6);
  color: #f0f0f0;
  padding: 12px 16px 12px 55px;
  font-size: 18px;

  &:focus {
    outline: none;
    border-color: #4a4ae9;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    width: 77%;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const BackIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-right: 10px;
`;

interface SearchProps {
  title: string;
  subtitle: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 선택적 속성으로 변경
}

const PageHeader: React.FC<SearchProps> = ({
  title,
  subtitle,
  onSearchChange,
}) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <TitleContainer>
        <BackIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
        <Title>{title}</Title>
      </TitleContainer>
      <Subtitle>{subtitle}</Subtitle>
      {onSearchChange && (
        <SearchContainer>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} size="lg" color="#f0f0f0" />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="국가명을 입력하세요"
            onChange={onSearchChange}
          />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;
