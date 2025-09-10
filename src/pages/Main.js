import React, { useState, useRef } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import music from "../mp3/SellBuyMusic.mp3";
import { styled } from "styled-components";

const MainCon = styled.div`
  width: 100%;
  position: relative;
`;

const Hero = styled.div`
  position: relative;
  height: 30vh;
  background-image: url('./img/main003.jpg');
  background-size: cover;
  background-position: center;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6));
`;

const HeroText = styled.div`
  text-align: center;
  color: #000000ff;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 13px;

  .heart {
    color:#fc5757ff;
  }
`;

const InfoWrapper = styled.div`
  align-items: center;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  top: 6vh;
`;

const InfoCard = styled.div`
  text-align: center;
  width: 100%;
  font-weight: 900;
  white-space: nowrap;

  p:first-child {
    font-size: 1rem;
    font-weight: 00;
    color: #555;
  }
  p:last-child {
    font-size: 1rem;
    margin-top: 0.25rem;
    color: #555;
  }
`;

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
      <Hero>
        <Gradient />
      </Hero>

      <InfoWrapper>
        <InfoCard>
          <HeroText>이민혁 <span className="heart">❤</span> 이수빈</HeroText>
        
          <p>2025. 10. 26 (일) 오후 12시</p>
        
          <p>부천 상동 세이브존 9층<br/>라비에벨 오페라홀</p>
        </InfoCard>
      </InfoWrapper>
    </MainCon>
  );
};

export default Main;
