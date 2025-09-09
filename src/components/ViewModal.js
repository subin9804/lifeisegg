import React, { useState, useRef } from "react";
import { Trash2 } from "lucide-react";
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

const DeleteModal = styled.div`
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


const Message = styled.div`
  background: white;
  padding: 8px 8px;
  font-size: 0.9rem;
  border: 2px dashed #d49434ff;
  word-break: break-word;

  text-align: left;
  span { padding-right: 15px;}
`;

export default function ViewModal({ModalOverlay, ModalContent, MessageList, commentList, setViewModalOpen, deleteComment}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (value) => {
    //setPassword(value);
  }
  const inputRef = useRef(null)

  const deleteModalOpen = (id, password) => {
    setCommentId(id)
    setPassword(password);
    setDeleteModalOpen(true);
  }

  const confirmPassword = ( id, password) => {
    const pw = inputRef.current?.value;
    //console.log(pw)
    //console.log(password)
    if(pw == password) {
      deleteComment(id)
    } else alert('비밀번호가 틀립니다.')
    
    setDeleteModalOpen(false)
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
                <span><b>{msg.name}</b>: {msg.comment}</span>
                <Trash2 style={{float:"right", color: "#999"}}
                        onClick={() => deleteModalOpen(msg.id, msg.password)}/>
              </Message>
            ))}
            </MessageList>
            {isDeleteModalOpen && (
              <ModalOverlay onClick={() => setDeleteModalOpen(false)}>
              <DeleteModal onClick={(e) => e.stopPropagation()}>
                <ClosedButton onClick={() => setDeleteModalOpen(false)}>
                    <IoIosCloseCircle />
                </ClosedButton>
                <p>비밀번호를 입력해주세요.</p>
                <Input
                  id="password"
                  placeholder="비밀번호(숫자 6자리)"
                  ref={inputRef}
                  //value={newComments.name || ''}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <button onClick={(e) => confirmPassword(commentId, password)}>확인</button>
              </DeleteModal>
              </ModalOverlay>
            )}
          </ModalContent>
        </ModalOverlay>
    
    );
}