import React, { useState } from "react";

export default function ViewModal({ModalOverlay, ModalContent, Message, messages, setViewModalOpen}) {


    return (
        <ModalOverlay onClick={() => setViewModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>전체 방명록</h3>
            {messages.map((msg) => (
              <Message key={msg.id}>
                <b>{msg.user}</b>: {msg.text}
              </Message>
            ))}
          </ModalContent>
        </ModalOverlay>
    
    );
}