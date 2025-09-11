import React from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import InnerContent from "./InnerContent";

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow-y: hidden;
`;

const ModalInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  height: auto;
  padding: 28px 16px;
  background-color: #f9f9f9;
  z-index: 100;
  font-family: "Mapo";
  font-size: 14px;
`;

const ClosedButton = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 28px;
  color: #000;
  cursor: pointer;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
const InnerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  img {
    width: 22px;
    height: 22px;
  }
  h3 {
    color: ${({ theme }) => theme.color.bride};
  }
`;

const ModalBoxBride = ({ onClose, theme }) => {
  return (
    <Container>
      <ModalInner onClick={(e) => e.stopPropagation()}>
        <ClosedButton onClick={onClose}>
          <IoIosCloseCircle />
        </ClosedButton>
        <InnerWrap>
          <InnerTitle>
            <img src="./img/MarkerHeart.png" alt="heart"/>
            <h3>신부측</h3>
          </InnerTitle>
          <InnerContent
            theme={theme}
            title="신부"
            name="이수빈"
            bank="국민은행 000000-00-000000"
          />
          <InnerContent
            theme={theme}
            title="아버지"
            name="이기홍"
            bank="국민은행 000000-00-000000"
          />
          <InnerContent
            theme={theme}
            title="어머니"
            name="김송자"
            bank="국민은행 000000-00-000000"
          />
        </InnerWrap>
      </ModalInner>
    </Container>
  );
};

export default ModalBoxBride;
