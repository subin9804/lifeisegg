import app from "../firebase.js"
import advancedImage from "../cloudinary";


function UploadPhoto() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

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
    
  }

}



export default UploadPhoto;