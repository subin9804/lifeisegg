import React, { useState } from "react";

export default function ViewModal({ModalOverlay, ModalContent, Message, comments, setViewModalOpen}) {


    return (
        <ModalOverlay onClick={() => setViewModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>전체 방명록</h3>
            {comments.map((msg) => (
              <Message key={msg.id}>
                <b>{msg.user}</b>: {msg.text}
              </Message>
            ))}
          </ModalContent>
        </ModalOverlay>
    
    );
}