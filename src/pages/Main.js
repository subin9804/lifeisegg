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
  height: 35vh;
  background-image: url('./img/main007.jpg');
  background-size: cover;
  background-position: center;
  text-align: center;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1));
`;

const HeroText = styled.div`
  text-align: center;
  color: #000000ff;
  font-size: 1.2rem;
  font-weight: bold;
  //margin-bottom: 7px;
  display: flex;
  line-height: 2.1rem;
  justify-content:center;
  width: 60%;

  .heart {
    color:#fc5757ff;
  }
`;

const Parents = styled.div`
  line-height: 2rem;
  text-align: left;
  margin-right: 10px;
`;

const InfoWrapper = styled.div`
  align-items: center;
  position: absolute;
 // right: 50%;
//  transform: translateX(60%);
  width: 100%;
  top: 3vh;

`;

const InfoCard = styled.div`
  width: 100%;
  font-weight: 900;
  white-space: nowrap;
  text-align: -webkit-center;

  p {
    font-size: 1rem;
    font-weight: 700;
    color: #777;
  }
  h1 {
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  font-weight: normal;
  text-align: center;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
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
          <h1 style={{color:"white", margin:"10px 0"}}>Wedding Invitation</h1>
          <HeroText>
            <Parents> 
              <p>이말화 · 장양미의 아들</p>
              
              <p>이기홍 · 김송자의 딸</p>
            </Parents>
            <span>이민혁 <br/> 이수빈</span>
            {/* <span className="heart">❤</span> */}
            
        </HeroText>
        <h3 style={{color:"#333"}}>결혼합니다.</h3>

        </InfoCard>
      </InfoWrapper>
    </MainCon>
  );
};

export default Main;
