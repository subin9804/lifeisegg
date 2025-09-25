import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import axios from "axios";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Container = styled.div`
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover button {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

export default function Gallery({clientId}) {
  
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const folderName = "my-folder"; // Cloudinary 폴더 이름

  useEffect(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("clientId", id);
    }
    setClientId(id);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${folderName}.json`;
      const res = await axios.get(url);

      let fetchedImages = res.data.resources || [];

      // 최신순 정렬
      fetchedImages.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));

      if (nextCursor) {
        // 무한 스크롤 → 커서 기반 필터
        const startIndex = fetchedImages.findIndex((img) => img.public_id === nextCursor);
        fetchedImages = fetchedImages.slice(startIndex + 1, startIndex + 1 + 12);
      } else {
        fetchedImages = fetchedImages.slice(0, 12);
      }

      if (fetchedImages.length < 12) setHasMore(false);
      setNextCursor(fetchedImages[fetchedImages.length - 1]?.public_id);
      setImages((prev) => [...prev, ...fetchedImages]);
    } catch (err) {
      console.error("Cloudinary fetch error", err);
    }
  };

  const handleDelete = async (image) => {
    if (!clientId) return;

    // Firestore에서 clientId와 public_id 매칭 확인
    const q = query(
      collection(db, "uploads"),
      where("clientId", "==", clientId),
      where("public_id", "==", image.public_id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      try {
        // Cloudinary delete_by_token
        await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`, {
          token: image.delete_token,
        });

        // Firestore에서도 삭제
        snapshot.forEach(async (doc) => await deleteDoc(doc.ref));

        setImages((prev) => prev.filter((img) => img.public_id !== image.public_id));
      } catch (err) {
        console.error("Cloudinary delete failed", err);
      }
    } else {
      alert("삭제 권한이 없습니다.");
    }
  };

  return (
    <Container>
      <h1>📸 갤러리</h1>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>불러오는 중...</p>}
      >
        <Grid>
          {images.map((img) => (
            <ImageWrapper key={img.public_id}>
              <Img src={img.secure_url} alt={img.public_id} />
              <DeleteButton onClick={() => handleDelete(img)}>삭제</DeleteButton>
            </ImageWrapper>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}