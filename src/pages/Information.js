import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalBox from "../components/ModalBox";
import ModalBoxBride from "../components/ModalBoxBride";
import { ThemeProvider } from "styled-components";
import ViewModal from "../components/ViewModal";
import WriteModal from "../components/WriteModal";

import { db } from "../firebase.js"; // firebase config
import { collection, addDoc, doc, getDocs } from "firebase/firestore";

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
  background: #fff0f5;
  border: 2px solid #ff4d8d;
  border-radius: 16px;
  padding: 12px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Message = styled.div`
  background: white;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #ffd6e8;
  word-break: break-word;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Button = styled.button`
  //background: ${(props) => (props.primary ? "#ff4d8d" : "white")};
  //color: ${(props) => (props.primary ? "white" : "#ff4d8d")};
  border: 1px solid #ff4d8d;
  padding: 6px 12px;
  border-radius: 8px;
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
  background: white;
  border-radius: 16px;
  padding: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;


const Information = ({ Subtitle, SubtitleKR}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBrideOpen, setIsModalBrideOpen] = useState(false);
  
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isWriteModalOpen, setWriteModalOpen] = useState(false);


  const [newComments, setNewComments] = useState([]);
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "안녕하세요! 👋" },
    { id: 2, user: "Bob", text: "좋은 하루 되세요!" },
    { id: 3, user: "Cathy", text: "핑크테마 귀엽다 💕" },
  ]);

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
    if(e.target.id === "name") setNewComments({...newComments, name: e.target.value});
    else if(e.target.id === "comment") setNewComments({...newComments, comment: e.target.value});

    console.log(newComments.name)
    console.log(newComments.comment)
  };

  const addComments = async () => {
    let newCommentss = {
      name: document.getElementById("name").value,
      comment: document.getElementById("comment").value
    }
    try {
      await addDoc(collection(db, "comments"), {
      ...newCommentss,
      createdAt: new Date(),
    });

      alert("저장 완료!");
      setNewComments({});
      
      
     } catch (err) {
      console.error(err);
      alert("오류가 발생하여 메세지가 저장되지 않았습니다.")
    }finally {
      //setUploading(false);
    }
  };

    const getComments = async () => {
      console.log("되긴되냐")
      try {
        //const docRef = doc();
        const getComments = await getDocs(collection(db, "comments"));
        if (getComments.length > 0) {
          console.log("일로 안오나,,")
          console.log("Document data:", getComments.data());
        }
        
        getComments.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data() );
          let commentData = {id: doc.id, name: doc.data().name, comment: doc.data().comment};
          setComments((prevComments) => [commentData, ...prevComments]);
        });
      } catch (err) {
        console.error(err);
        alert("오류가 발생하여 메세지를 가져올 수 없습니다.")
      }finally {
        //setUploading(false);
      }
    };

    //getComments();
    useEffect(() => {
      getComments();
    }, []);
    

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
      <Title>방명록</Title>
      <MessageList>
        {comments.slice(0, 3).map((msg) => (
          <Message key={msg.id}>
            <b key={msg.id}>{msg.name}</b>: {msg.comment}
          </Message>
        ))}
      </MessageList>
      <ButtonRow>
        <Button onClick={() => setViewModalOpen(true)}>더보기</Button>
        <Button onClick={() => setWriteModalOpen(true)}>작성</Button>
      </ButtonRow>

      {isViewModalOpen && (<ViewModal ModalOverlay={ModalOverlay} ModalContent={ModalContent} Message={Message} comments={comments} setViewModalOpen={setViewModalOpen}/> )}
      {isWriteModalOpen && (<WriteModal ModalOverlay={ModalOverlay} 
                                        ModalContent={ModalContent} 
                                        Message={Message} 
                                        comments={comments} 
                                        setComments={setComments} 
                                        Button={Button} 
                                        setWriteModalOpen={setWriteModalOpen}
                                        addComments={addComments}
                                        handleCommentsChange={handleCommentsChange}
                                        newComments={newComments}/> )}
      </GuestbookContainer>
    </ThemeProvider>
  
  );
};

export default Information;
