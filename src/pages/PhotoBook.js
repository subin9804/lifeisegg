import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;

  .slick-slide {
    height: auto;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;

const ThumbnailSlide = styled.div`
  display: inline-block;
  padding: 0 4px;
`;

const ArrowButton = styled.div`
  z-index: 2;
  width: 80px;
  height: 80px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ffffffc9;
  font-size: 100px;
  position: absolute;
  top: 40%;
`;

function NextArrow({ onClick }) {
  return <ArrowButton style={{ right: "-20px" }} onClick={onClick}>›</ArrowButton>;
}

function PrevArrow({ onClick }) {
  return <ArrowButton style={{ left: "-20px" }} onClick={onClick}>‹</ArrowButton>;
}

export default function GalleryCarousel({ Subtitle }) {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(thumbSlider.current);
  }, []);
  const path = "https://res.cloudinary.com/dvjscrttz/image/upload/w_1200,c_fill,q_auto,f_auto";
  const images = [
    "/v1757506037/wedding01_mjzhyd.jpg",
    "/v1757506035/wedding02_cjs2cn.jpg",
    "/v1757506036/wedding03_bbmrqf.jpg",
    "/v1757506038/wedding04_qtu4uh.jpg",
    "/v1757506038/wedding05_oxq0ar.jpg",
    "/v1757506039/wedding06_v5ivvp.jpg",
    "/v1757506039/wedding07_krqpyg.jpg",
    "/v1757506037/wedding08_pi8rla.jpg",
    "/v1757506039/wedding09_qoyyxr.jpg",
    "/v1757506040/wedding10_ylskhq.jpg",

  ];

  const settingsMain = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    asNavFor: nav2, // 여기 연결
  };

  const settingsThumbs = {
    slidesToShow: images.length < 5 ? images.length : 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    asNavFor: nav1, // 여기 연결
  };

  return (
    <GalleryWrapper>
      <Subtitle>사진첩</Subtitle>

      {/* 메인 큰 이미지 */}
      <Slider {...settingsMain} ref={mainSlider} style={{ marginBottom: "20px", boxShadow: "rgb(0 0 0 / 38%) 8px 9px 10px 0px" }}>
        {images.map((src, idx) => (
          <div key={idx}>
            <SlideImage src={`${path}${src}`} alt={`image-${idx}`} />
          </div>
        ))}
      </Slider>

      {/* 하단 썸네일 */}
      <Slider {...settingsThumbs} ref={thumbSlider}>
        {images.map((src, idx) => (
          <ThumbnailSlide key={idx}>
            <ThumbnailImage src={`${path}${src}`} alt={`thumb-${idx}`} />
          </ThumbnailSlide>
        ))}
      </Slider>
    </GalleryWrapper>
  );
}
