import React, { useRef, useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";
import Date from "./pages/Date";
import HowToGo from "./pages/HowToGo";
import PhotoBook from "./pages/PhotoBook";
import Information from "./pages/Information";
import UploadPhoto from "./pages/UploadPhoto";
import styled, { css } from "styled-components";
import BottomPage from "./pages/BottomPage";

import { useState } from "react";
import { MapPin, MessageSquare, Images, Upload } from "lucide-react";

const Container = styled.div`
  /*height: 100vh;*/
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  flex-direction: column;
  background: white;
  /*border-radius: 1rem;*/
  /*box-shadow: 0 4px 12px rgba(0,0,0,0.1);*/
  overflow: hidden;
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

  &.active {
    color: #e91e63;
  }
  
`;
const Subtitle = styled.h2`
  font-family: "Gowun Batang", serif;
  font-weight: 700;
  font-style: normal;

  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(248, 164, 164, 0.6);
  margin-bottom: 10px;
  text-align: left;
`;
const SubtitleKR = styled.h4`
  color: #535353ff;
  font-weight: 700;
  margin-bottom: 20px;
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
      <Main />
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? "active" : ""}
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
        {activeTab === "upload" && <UploadPhoto />}
      </TabContent>
    </Container>
  );
}