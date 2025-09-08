import React, {useState, useEffect} from "react";
import styled from "styled-components";
import KakaoAPI from "../components/KakaoAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh; /* 화면의 70% 높이 */
  width: 100%;
  max-width: 480px; /* 모바일 화면 가로폭 제한 (선택사항) */
  margin: 0 auto;
  background: #fff;
`;

const IconRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const IconWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;

  #naver_map {
    background: url('./img/nmap_image.jpg');
    background-size: cover;
    background-position: center;
  }
    
  #kakao_map {
    background: url('./img/kmap_image.png');
    background-size: cover;
    background-position: center;
  }
    
  #t_map {
    background: url('./img/tmap_image.png');
    background-size: cover;
    background-position: center;
  }
`;

const CircleIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; /* 아이콘 대신 글자 넣는 경우 */


`;

const IconLabel = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;

const MapImage = styled.img`
  flex: 1;
  width: 100%;
  object-fit: cover;
  border-top: 1px solid #ddd;
`;

export default function HowToGo({Subtitle, SubtitleKR}) {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_CLOUD_NAME}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3,
          };
          new window.kakao.maps.Map(container, options);
        });
      };
    }, []);

  const [center, setCenter] = useState({
    lat: 37.5665, // 초기 위도 (서울 시청)
    lng: 126.9780, // 초기 경도
  });

  return (
    <Container>
      <Subtitle>오시는 길</Subtitle>
      <SubtitleKR>아래 버튼을 클릭하시면 해당 맵으로 이동합니다.</SubtitleKR>
      <IconRow>
        <IconWrapper href="https://naver.me/5XJyLFiZ">
          <CircleIcon id="naver_map"></CircleIcon>
          <IconLabel>네이버맵</IconLabel>
        </IconWrapper>
        <IconWrapper href="https://place.map.kakao.com/98780839">
          <CircleIcon id="kakao_map"></CircleIcon>
          <IconLabel>카카오맵</IconLabel>
        </IconWrapper>
        <IconWrapper href="https://tmap.life/6718f8fd">
          <CircleIcon id="t_map"></CircleIcon>
          <IconLabel>티맵</IconLabel>
        </IconWrapper>
      </IconRow>
      <KakaoAPI/>
  
      <MapImage
        src="./img/map.jpg"
        alt="지도"
      />
    </Container>
  );
}