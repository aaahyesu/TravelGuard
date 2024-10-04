import styled from "@emotion/styled";

const SubContainer = styled.div`
  padding: 0 15%;
  height: 100%;
  overflow: auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 12% 0 5%;
  }
`;

export default SubContainer;
