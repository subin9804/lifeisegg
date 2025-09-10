import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalBox from "../components/ModalBox";
import ModalBoxBride from "../components/ModalBoxBride";
import { ThemeProvider } from "styled-components";
import ViewModal from "../components/ViewModal";
import WriteModal from "../components/WriteModal";
import DeleteModal from "../components/DeleteModal";
import { EllipsisVertical, X } from "lucide-react";

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
  justify-content: space-around;
  gap: 12px;
`;
const InfoInner = styled.div`
  border-radius: 14px;
    padding: 5px 20px;
    box-shadow: none;
    //min-width: 215px;
    border: 1px solid #eee;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    background: #fff;
    cursor: pointer;
    flex-grow: 1;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000;
    justify-content: space-evenly;
    //position: relative;
    //font-size: 1.2rem;
    //padding-left: 22px;
`;

const GuestbookContainer = styled.div`
  //background: #fffcd8ff;
  //border: 2px dashed #d49434ff;
  //border-radius: 16px;
  padding: 30px 12px 50px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MessageList = styled.div`
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Message = styled.div`
  box-shadow: 1px 1px 2px rgb(0 0 0 / 5%);
    position: relative;
    padding: 15px 17px;
    text-align: left;
    line-height: 1.4;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    margin-bottom: 6px;
    //font-size: 1.3rem;
    color: #544f4f;
    width: 100%;
  span { padding-right: 15px;}
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

const ButtonRow = styled.div`
  display: block;
  text-align: -webkit-right;
`;

const Button = styled.button`
    border: 1px solid #eaeaea;
    border-radius: 16px;
    //font-size: 1.3rem;
    background: #fff;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;
    height: 40px;
    width: 100px;
    font-weight: 500;
    margin: 10px 0;
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
  padding: 16px;
  width: 90%;
  max-width: 400px;
  height: 80%;
  overflow-y: auto;
  background-color: #f9f9f9;
  z-index: 100;
`;


const Information = ({ Subtitle, SubtitleKR}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBrideOpen, setIsModalBrideOpen] = useState(false);
  
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isWriteModalOpen, setWriteModalOpen] = useState(false);

  const [newComment, setNewComment] = useState({});
  const [commentList, setCommentList] = useState([]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [password, setPassword] = useState("");

  const deleteModalOpen = (id, password) => {
    setCommentId(id)
    setPassword(password);
    setDeleteModalOpen(true);
  }

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

    if(newObj.name.trim() == '') {
      alert('성함을 입력해주세요'); 
      return 0;
    }
    else if(newObj.comment.trim() == '') {
      alert('내용을 입력해주세요'); 
      return 0;
    }
    else if(newObj.password.trim() == '') {
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
          <SubtitleKR style={{marginBottom: "20px", lineHeight: "2.0rem"}}>
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
              <span>신랑측<br/>계좌번호 보기</span>
            </Title>
            {isModalOpen && <ModalBox onClose={handleCloseModal} />}
          </InfoInner>
          <InfoInner onClick={OpenInfoBride}>
            <Title>
              <img src="./img/MarkerHeart.png" alt="heart" style={{width:"20px"}}/>
              <span>신부측<br/>계좌번호 보기</span>
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
            <TopInfo>
              <div>{msg.name}</div>
              <X style={{color: "#aaa"}} onClick={(e) => deleteModalOpen(msg.id, msg.password)}/>
            </TopInfo>
          
            {msg.comment}
          </Message>
        ))}
        {commentList.length === 0 && (
          <Message style={{textAlign: "center"}}>
            <span>첫 번째 방명록을 남겨주세요!😍</span>
          </Message>
        )}
         {/* <div style={{paddingTop: "10px", textAlign: "center"}}><EllipsisVertical/></div> */}
        <div style={{width: "100%", textAlign: "-webkit-center"}}><Button onClick={() => setViewModalOpen(true)}>전체보기</Button></div>
        {isDeleteModalOpen && (
              <DeleteModal ModalOverlay={ModalOverlay}
                            Button={Button}
                            setDeleteModalOpen={setDeleteModalOpen}
                            deleteComment={deleteComment}
                            commentId={commentId}
                            password={password}/>
        )}
      </MessageList>
      <ButtonRow>
        <Button onClick={() => setWriteModalOpen(true)}>작성</Button>
      </ButtonRow>

      {isViewModalOpen && (<ViewModal ModalOverlay={ModalOverlay} 
                                      ModalContent={ModalContent} 
                                      Button={Button}
                                      Message={Message} 
                                      commentList={commentList} 
                                      setViewModalOpen={setViewModalOpen}
                                      getComments={getComments}
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
                                      /> )}
      </GuestbookContainer>
        
        
    </ThemeProvider>
  
  );
};

export default Information;
