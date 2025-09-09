import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalBox from "../components/ModalBox";
import ModalBoxBride from "../components/ModalBoxBride";
import { ThemeProvider } from "styled-components";
import ViewModal from "../components/ViewModal";
import WriteModal from "../components/WriteModal";
import { EllipsisVertical } from "lucide-react";

import { db } from "../firebase.js"; // firebase config
import { collection, addDoc, doc, getDocs, orderBy, query, limit, where, updateDoc } from "firebase/firestore";

import axios from "axios";

const theme = {
  color: {
    groom: "#88e5f9",
    bride: "#f8a4a4",
  },
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const InfoInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-template-columns: 24px;
  background: #ebf4f6;
  height: 60px;
  width: 86%;
  font-family: "Mapo";
  font-weight: 600;
  color: #222;
  font-size: 14px;
  &:last-child {
    background: rgba(248, 164, 164, 0.2);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuestbookContainer = styled.div`
  background: #fffcd8ff;
  //border: 2px dashed #d49434ff;
  //border-radius: 16px;
  padding: 12px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MessageList = styled.div`
  flex: 1;
  //overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: #b1823cff;
  color: white;
  border: 1px solid #b1823cff;
  //border-radius: 8px;
  
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;


  button:first-of-type {
    background: "#ff4d8d";
    color: "white";
  }

  button:nth-of-type(2) {
    background: "white";
    color: "#ff4d8d";
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fffcd8ff;
  border-radius: 16px;
  padding: 16px;
  width: 90%;
  max-width: 400px;
  height: 80%;
  overflow-y: auto;
`;


const Information = ({ Subtitle, SubtitleKR}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBrideOpen, setIsModalBrideOpen] = useState(false);
  
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isWriteModalOpen, setWriteModalOpen] = useState(false);

  const [newComment, setNewComment] = useState({});
  const [commentList, setCommentList] = useState([]);

  const [renderCnt, setRenderCnt] = useState(0);

  const OpenInfoGroom = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const OpenInfoBride = () => {
    setIsModalBrideOpen(true);
  };
  const handleCloseBrideModal = () => {
    setIsModalBrideOpen(false);
  };

  const handleCommentsChange = (e) => {
    if(e.target.id === "name") {
      if(e.target.value.length > 15) return; 
      setNewComment({...newComment, name: e.target.value});
    } else if (e.target.id === "comment") {
      if(e.target.value.length > 130) return; 
      setNewComment({...newComment, comment: e.target.value});
    }else if(e.target.id === "password") {
      if(e.target.value.length > 12) return; 
      setNewComment({...newComment, password: e.target.value});
    }
  };

  const addComments = async () => {
    let newObj = {
      name: document.getElementById("name").value,
      comment: document.getElementById("comment").value,
      password: document.getElementById("password").value,
      useYn: "Y"
    }

    if(newObj.name == '') {
      alert('성함을 입력해주세요'); 
      return 0;
    }
    else if(newObj.comment == '') {
      alert('내용을 입력해주세요'); 
      return 0;
    }
    else if(newObj.password == '') {
      alert('삭제시에 필요한 비밀번호를 입력해주세요'); 
      return 0;
    }

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        ...newObj,
        createdAt: new Date(),
      });

      alert("저장 완료!");
      setNewComment({...newComment, id: docRef.id});
      setCommentList((prev) => [newComment, ...prev])
      setNewComment(null);
      //console.log(newComment)
     } catch (err) {
      console.error(err);
      alert("오류가 발생하여 메세지가 저장되지 않았습니다.")
    }finally {
      setWriteModalOpen(false)
    }
  };

  const getComments = async () => {

    try {
      const getComments = await getDocs(query(collection(db, "comments"), orderBy("createdAt", "desc"), where("useYn", "==", "Y")));
      
      const commentData = [];
      getComments.forEach((doc) => {
      
        //console.log(doc.id, " => ", doc.data() );
        commentData.push({
          id: doc.id, 
          name: doc.data().name, 
          comment: doc.data().comment, 
          password: doc.data().password
        });
      });
      setCommentList(commentData);

    } catch (err) {
      console.error(err);
      alert("오류가 발생하여 메세지를 가져올 수 없습니다.")
    //} finally {
    }
  };

  useEffect(() => {
    getComments();
  }, [commentList]);
  
  const deleteComment = async (id) => {
    
    try {
      // comments 컬렉션에서 id에 해당하는 문서 가져오기
      const docRef = doc(db, "comments", id);

      // use_yn 값을 'N'으로 업데이트
      await updateDoc(docRef, {
        useYn: "N",
      });

      alert('삭제되었습니다.')

      const newCommentList = commentList.filter((msg) => msg.id != id);
      setCommentList(newCommentList);

    } catch (err) {
      console.error("업데이트 실패:", err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Subtitle>모시는 글</Subtitle>
          <SubtitleKR style={{marginBottom: "20px"}}>
            저희 둘의 시작을 축하해 주시는
            <br />
            모든 분들에게 진심으로 감사드리며
            <br />
            전해주신 따뜻한 마음, <br />
            오래도록 간직하겠습니다.
          </SubtitleKR>
        <Info>
          <InfoInner onClick={OpenInfoGroom}>
            <Title>
              <img src="./img/MarkerHeart.png" alt="heart" style={{width:"20px"}}/>
              <span>신랑측 계좌번호 보기</span>
            </Title>
            {isModalOpen && <ModalBox onClose={handleCloseModal} />}
          </InfoInner>
          <InfoInner onClick={OpenInfoBride}>
            <Title>
              <img src="./img/MarkerHeart.png" alt="heart" style={{width:"20px"}}/>
              <span>신부측 계좌번호 보기</span>
            </Title>
            {isModalBrideOpen && (
              <ModalBoxBride onClose={handleCloseBrideModal} />
            )}
          </InfoInner>
        </Info>
      </Container>

      <GuestbookContainer>
      <h3 style={{marginBottom: "10px"}}>· 방명록 ·</h3>
      <MessageList>
        {commentList.slice(0,4).map((msg) => (
          <Message key={msg.id}>
            <b>{msg.name}</b>: {msg.comment}
          </Message>
        ))}
         <div style={{paddingTop: "10px", textAlign: "center"}}><EllipsisVertical/></div>
      </MessageList>
      <ButtonRow>
        <Button onClick={() => setViewModalOpen(true)}>전체보기</Button>
        <Button onClick={() => setWriteModalOpen(true)}>작성</Button>
      </ButtonRow>

      {isViewModalOpen && (<ViewModal ModalOverlay={ModalOverlay} 
                                      ModalContent={ModalContent} 
                                      MessageList={MessageList}
                                      Message={Message} 
                                      commentList={commentList} 
                                      setViewModalOpen={setViewModalOpen}
                                      getComments={getComments}
                                      setRenderCnt={setRenderCnt}
                                      deleteComment={deleteComment}/> )}

      {isWriteModalOpen && (<WriteModal ModalOverlay={ModalOverlay} 
                                        ModalContent={ModalContent} 
                                        Message={Message} 
                                        commentList={commentList} 
                                        Button={Button} 
                                        setWriteModalOpen={setWriteModalOpen}
                                        addComments={addComments}
                                        handleCommentsChange={handleCommentsChange}
                                        newComment={newComment}
                                        setRenderCnt={setRenderCnt}/> )}
      </GuestbookContainer>
    </ThemeProvider>
  
  );
};

export default Information;
