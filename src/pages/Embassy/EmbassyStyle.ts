import styled from "@emotion/styled";

export const Container = styled.div`
  background: transparent;
  min-height: 100vh;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
    width: 110%;
  }
`;
