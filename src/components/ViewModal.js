import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import DeleteModal from "../components/DeleteModal";

const ClosedButton = styled.div`
  position: relative;
  left: 45%;
  font-size: 28px;
  color: #000;
  cursor: pointer;
  display:inline;
`;

const DeleteModalInner = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const MessageList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 700;
    line-height: 1.4;
    font-size: inherit;
`;

export default function ViewModal({ModalOverlay, ModalContent, Message, commentList, setViewModalOpen, deleteComment, Button}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [commentId, setCommentId] = useState("");
  const [password, setPassword] = useState("");

  const deleteModalOpen = (id, password) => {
    setCommentId(id)
    setPassword(password);
    setDeleteModalOpen(true);
  }
    

    return (
        <ModalOverlay onClick={() => setViewModalOpen(false)}>
          <ModalContent style={{overFlowY:"auto"}} onClick={(e) => e.stopPropagation()}>
          <ClosedButton onClick={() => setViewModalOpen(false)}>
              <IoIosCloseCircle />
          </ClosedButton>
            <h3 style={{marginBottom:"20px"}}>· 전체 방명록 ·</h3>
            <MessageList>
              {commentList.map((msg) => (
                <Message key={msg.id}>
                  <TopInfo>
                    <div>{msg.name}</div>
                    <X style={{color: "#aaa"}} onClick={(e) => deleteModalOpen(msg.id, msg.password)}/>
                  </TopInfo>
                
                  {msg.comment}
                </Message>
              ))}
            </MessageList>
            {isDeleteModalOpen && (
              <DeleteModal ModalOverlay={ModalOverlay}
                           Button={Button}
                           setDeleteModalOpen={setDeleteModalOpen}
                           deleteComment={deleteComment}
                            commentId={commentId}
                            password={password}/>
            )}
          </ModalContent>
        </ModalOverlay>
    
    );
}