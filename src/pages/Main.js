import React, { useState, useRef } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import music from "../mp3/SellBuyMusic.mp3";
import { styled } from "styled-components";

const MainCon = styled.div`
  width: 100%;

`;

const Wrap = styled.div`
  position: relative;
  width: 70%;

`;

const TopName = styled.div`
  margin: 50px 0 10px;
  font-family: "Mapo";
  font-weight: 600;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: end;
  span{font-size: 20px;}
`;
const Music = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 150;
  animation: volume alternate 2s infinite;

  @keyframes volume {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const WeddingMainImg = styled.img`
  width: 100%;
  height: 200;
  object-fit:cover;
`;

const MainText = styled.div`
  p.title {
    text-align: left;
    display: block;
    margin-top: 12px;
    font-size: 24px;
    font-weight: 600;
    color: #222;
  }
  p:not(.title) {
  text-align: left;
    display: block;
    font-size: 16px;
    line-height: 25px;
    font-weight: 600;
  }
`;

const PinkBlock = styled.div`
  background-color: #f8e2e2ff;
  margin: 5px 0;
  padding: 5px 10px 10px;
`

const Main = ({ Subtitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(<FaVolumeMute />);
  const audioRef = useRef(new Audio(music));

  const playMusic = () => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    audio.loop = true;
    if (audio.paused) {
      audio.play();
      setVolume(<FaVolumeHigh />);
    } else {
      audio.pause();
      setVolume(<FaVolumeMute />);
      audio.currentTime = 0;
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <MainCon>
      {/*<Music onClick={playMusic}>{volume}</Music> */}
      <WeddingMainImg src="./img/JO__8380.jpg"></WeddingMainImg>
      <Wrap>
        <TopName><h1>이민혁 <br/><span>그리고</span><br/> 이수빈</h1>
        <Subtitle>결혼합니다.</Subtitle></TopName>
      
        {/* <WeddingMainImg src="./img/JO__8380.jpg" alt="wedding-img" /> */}
        <MainText>
          <p className="title">- 일시 </p>
          <p style={{paddingLeft: '20px'}}>2025년 10월 26일 일요일<br /> 오후 12시</p>
          
          <p className="title">- 장소</p>
          <p style={{paddingLeft: '20px'}}>부천 상동 세이브존 9층
            <br /> 라비에벨 웨딩홀</p>
        </MainText>
      </Wrap>
    </MainCon>
  );
};

export default Main;
