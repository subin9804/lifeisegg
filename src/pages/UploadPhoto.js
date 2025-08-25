import React, {useState} from 'react'

import app from "../firebase.js"
//import advancedImage from "../cloudinary";
//import { Cloudinary } from '@cloudinary/url-gen';
//import { auto } from '@cloudinary/url-gen/actions/resize';
//import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
//import { AdvancedImage } from '@cloudinary/react';


function UploadPhoto() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);


  // Cloudinary 설정
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  //const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_KEY;
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

    // try {
    //   // 1. Cloudinary 업로드
    //   const fileNames = [];
    //   for (const file of files) {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("upload_preset", UPLOAD_PRESET)
    //   }
    // }
    
  }

}



export default UploadPhoto;