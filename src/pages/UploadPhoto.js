import React, {useState} from 'react'
import styled from "styled-components";
import { db } from "./firebase.js"; // firebase config
import { collection, addDoc } from "firebase/firestore";

function UploadPhoto() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);


  // Cloudinary 설정
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


  // 이미지 선택
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startWith('image/'));
    setImage(imageFiles);

    // 미리보기
    const urls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };


  // 저장 버튼 클릭
  const handleSave = async () => {
    if (!message.trim() || files.length === 0) return;
    
    setUploading(true);

    try {
      // 1. Cloudinary 업로드
      const fileNames = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(UPLOAD_URL, formData, {
          headers: {"Content-Type" : "multipart/form-data"},
        });

        // cloudinary 업로드 결과
        const uploadFileName = res.data.public_id;
        fileNames.push(uploadFileName);
      }

      // 2. Firestore에 메시지 + 파일명 저장
      await addDoc(collection(db, "posts"))
    }
    
  }

}



export default UploadPhoto;