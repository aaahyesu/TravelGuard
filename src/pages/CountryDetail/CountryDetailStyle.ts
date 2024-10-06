import styled from "@emotion/styled";

export const Container = styled.div`
  color: #f0f0f0;
  min-height: 100vh;
  padding: 17px;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

export const CountryBox = styled.div`
  width: 99%;
  height: 50px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(127, 169, 255, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 16px;
  text-align: left;
  font-size: 24px;

  @media (min-width: 768px) {
    padding: 30px;
    gap: 32px;
    font-size: 32px;
  }
`;

export const FlagImg = styled.span`
  width: 130px;
  height: 75px;
  border-radius: 4px;
  background-color: #fff;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100px;
    height: 60px;
  }
`;

export const CountryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CountryName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #f0f0f0;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const ContinentName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #d3d3d3;
  margin-top: 8px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }
`;

export const ContinentMap = styled.img`
  width: 100%;
  max-height: 436px;
  border-radius: 8px;
  background: transparent;
  border: 2px solid rgba(127, 169, 255, 0.6);
  object-fit: cover;

  @media (max-width: 768px) {
    width: 105%;
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 600px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-height: 300px;

  @media (min-width: 768px) {
    width: 40%;
  }
`;
