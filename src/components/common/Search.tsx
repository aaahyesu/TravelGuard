import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 50px auto;
`;

const SearchInput = styled.input`
  padding: 10px 50px;
  width: 100%;
  font-size: 20px;
  background-color: transparent;
  border: none;
  color: #f0f0f0;

  &:focus {
    outline: none;
    border-color: #4a4ae9;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange prop 정의
}
const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} size="lg" color="#f0f0f0" />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="국가 명을 입력하세요"
        onChange={onChange}
      />
    </SearchContainer>
  );
};

export default Search;
