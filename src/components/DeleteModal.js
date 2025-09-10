import { IoIosCloseCircle } from "react-icons/io";
import { useRef, useState } from "react";
import styled from "styled-components";


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

export default function DeleteModal ({ModalOverlay, Button, setDeleteModalOpen, deleteComment, commentId, password}) {

  const inputRef = useRef(null);

  const handleChange = (e) => {
    if(e.target.value.length > 12) return; 
  };




    const confirmPassword = ( id, password) => {
        const pw = inputRef.current?.value;

        if(pw == password) {
        deleteComment(id)
        } else alert('비밀번호가 틀립니다.')
        
        setDeleteModalOpen(false)
    }
  

    return (
        <ModalOverlay onClick={() => setDeleteModalOpen(false)}>
              <DeleteModalInner onClick={(e) => e.stopPropagation()}>
                <ClosedButton onClick={() => setDeleteModalOpen(false)}>
                    <IoIosCloseCircle />
                </ClosedButton>
                <p style={{marginBottom: "10px"}}>비밀번호를 입력해주세요.</p>
                <Input
                  id="password"
                  placeholder="비밀번호"
                  ref={inputRef}
                  //value={newComments.name || ''}
                  onChange={(e) => handleChange(e)}
                />
                <div style={{width: "100%", textAlign: "-webkit-center"}}>
                  <Button onClick={(e) => confirmPassword(commentId, password)}>확인</Button>
                </div>
              </DeleteModalInner>
        </ModalOverlay>
    )
}