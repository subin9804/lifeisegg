import React, {useState} from "react";
import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";

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
      <div className="relative w-full h-[500px]">
        {/* 카카오맵 */}
        <Map
          center={center}
          style={{ width: "100%", height: "100%" }}
          level={3}
          onCenterChanged={(map) => {
            // 지도가 움직일 때마다 현재 좌표 업데이트
            setCenter({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            });
          }}
        />

        {/* 중앙 고정 핀 아이콘 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            className="w-8 h-8 drop-shadow-lg"
          >
            <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5 14.5 7.6 14.5 9 13.4 11.5 12 11.5z" />
          </svg>
        </div>

        {/* 현재 좌표 표시 */}
        <div className="absolute bottom-2 left-2 bg-white shadow px-3 py-1 rounded-lg text-sm">
          {center.lat.toFixed(6)}, {center.lng.toFixed(6)}
        </div>
      </div>
  
      <MapImage
        src="./img/map.jpg"
        alt="지도"
      />
    </Container>
  );
}