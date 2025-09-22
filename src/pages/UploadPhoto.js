import React, {useState, useRef, useEffect} from 'react'
import styled from "styled-components";
import { db } from "../firebase.js"; // firebase config
import { collection, addDoc } from "firebase/firestore";

import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 480px;
  margin: auto;
`;

const Input = styled.input`
  margin-bottom: 12px;
  padding: 8px;
  font-size: 16px;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;
const Preview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CustomButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

const SaveButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;


const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

function UploadPhoto() {
  const [clientId, setClientId] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef('');

  // Cloudinary 설정
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  //const UPLOAD_URL = process.env.CLOUDINARY_URL;

  useEffect(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      const uuid = crypto.randomUUID(); // 간단한 UUID 대체
      id  = `user_${message.trim()}_${id}`;

      localStorage.setItem("clientId", id);
    }
    setClientId(id);
    //fetchImages();
  }, []);

  // 이미지 선택
  const handleImagelChange = (e) => {

    const files = Array.from(e.target.files);
    const imageFiles = [];
    for(let file of files) {
      if(!file.type.startsWith('image/')) {
        alert('이미지가 아닌 파일은 저장되지 않습니다')
        break;
      }
      imageFiles.push(file);
    }
    if(imageFiles.length < 1) return;

    setFiles(imageFiles);

    // 미리보기
    const urls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // 미리보기 삭제
  const handleDelete = (index) => {
    console.log(index);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 저장 버튼 클릭
  const handleSave = async () => {
    if (!message.trim() || files.length === 0) {
      if(files.length === 0) {alert('선택된 이미지가 없습니당');return;}
      if(!message.trim()){alert('보내주시는분 성함을 입력해주세요');return;}
    }

    setUploading(true);

    try {
      // 1. Cloudinary 업로드
      const fileNames = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", clientId); // 사용자별 폴더

        const res = await axios.post(UPLOAD_URL, formData, {
          headers: {"Content-Type" : "multipart/form-data"},
        });

        // cloudinary 업로드 결과
        const uploadFileName = res.data.public_id;
        fileNames.push(uploadFileName);
      }

      // 2. Firestore에 메시지 + 파일명 저장
      await addDoc(collection(db, "posts"), {
        message,
        files: fileNames,
        createdAt: new Date(),
      });

      alert("저장 완료!");
      setMessage("");
      setFiles([]);
      setPreviewUrls([]);
      
      inputRef.current.value = "";
      
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다\n죄송하지만 카톡으로 보내주심 안댈까용,,ㅜㅜ")
    }finally {
      setUploading(false);
    }
  };

  return (

    <Container>
      <Input
        type="text"
        placeholder="짧은 메세지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <HiddenInput 
        type="file"
        ref={inputRef}
        accept="image/*"
        id="file-upload"
        multiple
        onChange={handleImagelChange}
      />
      <CustomButton htmlFor="file-upload">
        파일 업로드
      </CustomButton>
      <PreviewWrapper>
        {previewUrls.map((src, idx) => (
            <Preview key={idx}>
                <PreviewImage src={src} alt={`preview-${idx}`} />
                <DeleteButton onClick={() => handleDelete(idx)}>×</DeleteButton>
            </Preview>
        ))}
      </PreviewWrapper>
      <SaveButton onClick={handleSave} disabled={uploading}>
        {uploading ? "저장 중..." : "저장"}
      </SaveButton>
    </Container>
  );
}



export default UploadPhoto;