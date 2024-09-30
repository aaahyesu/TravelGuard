import React from "react";
import styled from "@emotion/styled";
import exitIcon from "../../styles/image/exitIcon.png";

// 모달 스타일
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  max-height: 80vh;
  overflow-y: auto;
  background: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  border-bottom: 2px solid #7fa9ff; /* 구분선 */
  padding: 0 20px 15px;
  margin-bottom: 16px;
`;

const ModalContent = styled.div`
  font-size: 18px;
  color: #f0f0f0;
  line-height: 1.4;
  padding: 0 20px;
  & p {
    margin: 0;
    padding: 0;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;

  img {
    width: 40px;
    height: 40px;
  }
`;

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent dangerouslySetInnerHTML={{ __html: content }} />
        <CloseButton onClick={onClose}>
          <img src={exitIcon} alt="exitIcon" />
        </CloseButton>
      </ModalContainer>
    </>
  );
};

export default Modal;
