import React, { useState } from "react";
import styled from "styled-components";


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

export default function WriteModal({ModalOverlay, ModalContent, setWriteModalOpen, messages, setMessages, Button}) {
  const [nickname, setNickname] = useState("");
  const [newMessage, setNewMessage] = useState("");
    
  const handleSubmit = () => {
    if (!nickname.trim() || !newMessage.trim()) return;
    setMessages([{ id: Date.now(), user: nickname, text: newMessage }, ...messages]);
    setNickname("");
    setNewMessage("");
    setWriteModalOpen(false);
  };

    return (
        <ModalOverlay onClick={() => setWriteModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>방명록 작성</h3>
            <Input
              placeholder="성함"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Textarea
              placeholder="메시지를 입력하세요"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button primary onClick={handleSubmit}>등록</Button>
          </ModalContent>
        </ModalOverlay>
    );
}