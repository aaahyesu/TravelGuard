/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const containerStyle = css`
  position: fixed;
  bottom: 40px;
  left: 5%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: #1c1c1e;
  border-radius: 10px;
  width: calc(100% - 40px);
  max-width: 300px;
  z-index: 100;

  @media (max-width: 768px) {
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, 50%);
    width: calc(100% - 40px);
    max-width: 450px;
    padding: 15px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const itemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1 1 auto;

  @media (max-width: 768px) {
    gap: 8px;
    flex: 1 1 40%;
  }
`;

const boxStyle = (color: string) => css`
  width: 20px;
  height: 20px;
  background-color: ${color};
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const textStyle = css`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  span {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #b0b0b0;

    @media (max-width: 768px) {
      font-size: 9px;
    }
  }
`;

const LevelColors = () => {
  const levels = [
    {
      color: "#4C8CFF",
      label: "1단계 여행유의",
      description: "신변안전 위험 요인 숙지 대비",
    },
    {
      color: "#5DAA8B",
      label: "2단계 여행자제",
      description:
        "(여행예정자) 불필요한 여행 자제 (체류자) 신변안전 특별 유의",
    },
    {
      color: "#E4D95D",
      label: "3단계 출국권고",
      description:
        "(여행예정자) 불필요한 여행 자제 (체류자) 신변안전 특별 유의",
    },
    {
      color: "#D14844",
      label: "4단계 여행금지",
      description:
        "(여행예정자) 불필요한 여행 자제 (체류자) 신변안전 특별 유의",
    },
    {
      color: "#E0E0E0",
      label: "0단계 안전 국가",
      description: "특이 사항 없음",
    },
  ];

  return (
    <div css={containerStyle}>
      {levels.map((level, index) => (
        <div key={index} css={itemStyle}>
          <div css={boxStyle(level.color)}></div>
          <div css={textStyle}>
            <span>{level.label}</span>
            <p>{level.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LevelColors;
