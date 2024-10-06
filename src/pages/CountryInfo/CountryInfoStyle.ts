import styled from "@emotion/styled";

export const Container = styled.div`
  color: #f0f0f0;
  min-height: 100vh;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
    width: 110%;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 10px 20px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
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

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const ColorIcon = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

export const DataContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  background-color: #1a1a1a;
  border: 1px solid #7fa9ff99;
  border-radius: 10px;
  max-height: 350px;
  overflow-y: auto;

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

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    max-height: 350px;
    padding: 10px 5px;
  }
`;

export const DataBox = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  color: #f0f0f0;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s, opacity 0.3s;
  background-color: rgba(8, 8, 8, 0.3);
  border: 1px solid rgba(8, 8, 8, 0.5);
  opacity: 0.7;

  &:hover {
    background-color: #52525e;
    border: 1px solid rgba(127, 169, 255, 0.8);
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 10px;
  }
`;
