import React, { useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";


const ClosedButton = styled.div`
  position: relative;
  left: 45%;
  font-size: 28px;
  color: #000;
  cursor: pointer;
  display:inline;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  min-height: 80px;
  font-size: 0.9rem;
  resize: none;
  margin-bottom: 8px;
`;

export default function WriteModal({ModalOverlay, ModalContent, setWriteModalOpen, newComment, Button, addComments, handleCommentsChange}) {


    return (
        <ModalOverlay onClick={() => setWriteModalOpen(false)}>
          <ModalContent style={{height:"auto"}} onClick={(e) => e.stopPropagation()}>
          <ClosedButton onClick={() => setWriteModalOpen(false)}>
              <IoIosCloseCircle />
          </ClosedButton>
            <h3 style={{marginBottom: "10px"}}>· 방명록 작성 ·</h3>
            <Input
              id="name"
              placeholder="성함"
              value={newComment.name || ''}
              onChange={(e) => handleCommentsChange(e)}
            />
            <Textarea
              id="comment"
              placeholder="메시지를 입력하세요.(최대 1000자)"
              value={newComment.comment || ''}
              onChange={(e) => handleCommentsChange(e)}
            />
            <Input
              id="password"
              placeholder="비밀번호(최대 12자)"
              value={newComment.password || ''}
              onChange={(e) => handleCommentsChange(e)}
            />
            <Button primary onClick={(e) => addComments(e)}>등록</Button>
          </ModalContent>
        </ModalOverlay>
    );
}