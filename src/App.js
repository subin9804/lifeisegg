import React, { useRef } from "react";
import "./App.css";
import Main from "./pages/Main";
import Date from "./pages/Date";
import HowToGo from "./pages/HowToGo";
import PhotoBook from "./pages/PhotoBook";
import Information from "./pages/Information";
import UploadPhotobutton from "./pages/UploadPhotobutton";
import styled, { css } from "styled-components";
import BottomPage from "./pages/BottomPage";

import { useState } from "react";
import { MapPin, MessageSquare, Images, Upload } from "lucide-react";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  flex-direction: column;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const Hero = styled.div`
  position: relative;
  height: 40vh;
  background-image: url('./img/JO__8380.jpg');
  background-size: cover;
  background-position: center;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2), rgba(0,0,0,0.1), rgba(255, 255, 255, 1));
`;

const HeroText = styled.div`
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;

  .heart {color:pink;}
`;

const InfoWrapper = styled.div`
  align-items: center;
  position: absolute;
  transform: translateX(50%);
  top: 10.5rem;
`;

const InfoCard = styled.div`
  
  text-align: center;
  width: 100%;
  font-weight: 900;
  
  p:first-child {
    font-size: 1.125rem;
    font-weight: 00;
    color: #111;
  }
  p:last-child {
    font-size: 1rem;
    margin-top: 0.25rem;
    color: #111;
  }
`;

const TabBar = styled.div`
  height: 10vh;
  display: flex;
  border-top: 1px solid #e5e5e5;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #777;
  background-color: transparent;
  transition: color 0.2s;
  border: 0;

  ${(props) =>
    props.active &&
    css`
      color: #e91e63;
    `}
`;
const Subtitle = styled.h1`
  
  font-family: "Mapo";
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(248, 164, 164, 0.7);
  margin-bottom: 28px;
  text-align: left;
`;
const SubtitleKR = styled.h2`
  font-family: "Mapo";
  font-size: 1.2rem;
  color: #f8a4a4;
  margin: 10px;
`;
const DateInfo = styled.div`
  width: 90%;
  min-width: 280px;
  line-height: 25px;

  p {
    margin: 28px 0;
  }
`;
const TabContent = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 1rem;
  text-align: center;
  font-size: 0.95rem;
`;

export default function App() {
  const [activeTab, setActiveTab] = useState("map");

  const tabs = [
    { key: "map", label: "오시는길", icon: <MapPin size={20} /> },
    { key: "message", label: "모시는글", icon: <MessageSquare size={20} /> },
    { key: "gallery", label: "사진첩", icon: <Images size={20} /> },
    { key: "upload", label: "사진올리기", icon: <Upload size={20} /> },
  ];

  return (
    <Container>
      <Hero>
        <Gradient />
      </Hero>

      <InfoWrapper>
        <InfoCard>
          <HeroText>이민혁 <span class="heart">❤</span> 이수빈</HeroText>
          <p>2025. 10. 05 (일) 오후 1시</p>
          <p>서울 ○○호텔 3층 ○○홀</p>
        </InfoCard>
      </InfoWrapper>
      
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            active={activeTab === tab.key}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </TabButton>
        ))}
      </TabBar>

      <TabContent>
        {activeTab === "map" && 
          <HowToGo
            Subtitle={Subtitle}
            SubtitleKR={SubtitleKR}
            DateInfo={DateInfo}
          />}
        {activeTab === "gallery" && <PhotoBook Subtitle={Subtitle} SubtitleKR={SubtitleKR}/>}
        {activeTab === "message" && <p>마음전하기 댓글창💕</p>}
        {activeTab === "upload" && <UploadPhotobutton />}
      </TabContent>
    </Container>
  );
}