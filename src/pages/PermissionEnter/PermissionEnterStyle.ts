import styled from "@emotion/styled";

export const Container = styled.div`
  background: transparent;
  min-height: 100vh;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
    width: 110%;
  }
`;
