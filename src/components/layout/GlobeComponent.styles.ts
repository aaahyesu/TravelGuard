import { css } from "@emotion/react";

export const styles = {
  globeContainer: css`
    width: 100%;
    height: calc(100vh - 100px);
    background: linear-gradient(to bottom, #0a0818 45%, #1b3d50);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 55px;
    @media (max-width: 768px) {
      align-items: flex-start;
      padding-top: 20px;
      height: 100vh;
      margin-left: 0;
    }
  `,
  selectedCountryStyle: css`
    position: absolute;
    top: 20%;
    left: 80%;
    padding: 10px;
    background-color: #1c1c1e;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    transform: translate(-50%, 0);
    z-index: 100;
    width: 200px;
    height: auto;

    @media (max-width: 768px) {
      top: 11%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 30px;
      padding: 10px;
    }
  `,
  itemStyle: css`
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
      gap: 8px;
    }
  `,
  boxStyle: (color: string) => css`
    width: 20px;
    height: 20px;
    background-color: ${color};
    border-radius: 4px;

    @media (max-width: 768px) {
      width: 10px;
      height: 10px;
    }
  `,
  textStyle: css`
    color: white;
    span {
      font-weight: 500;
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    p {
      margin: 0;
      font-size: 12px;
      color: #b0b0b0;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  `,
};
