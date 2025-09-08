import React, {useRef} from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TextAlignment } from "@cloudinary/url-gen/qualifiers";

const GalleryWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;

  .slick-slide {
    height: auto;
  }

//  .thumbnail-slider {
//    margin-top: 0; // 위쪽 여백 없애기
//  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ThumbnailImage = styled.img`
  width: 100%; // 부모 div 폭에 맞춤
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;

const ThumbnailSlide = styled.div`
  display: inline-block; // slick-slide 기본 문제 해결
  padding: 0 4px; // 슬라이드 간격
`;

const ArrowButton = styled.div`
  z-index: 2;
  width: 40px;
  height: 40px;
  background: rgba(255, 77, 141, 0.8);
  border-radius: 50%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  position: absolute;
  top: 45%;
  &:hover {
    background: #ff4d8d;
  }
`;

function NextArrow(props) {
  const { onClick } = props;
  return <ArrowButton style={{ right: "-20px" }} onClick={onClick}>›</ArrowButton>;
}

function PrevArrow(props) {
  const { onClick } = props;
  return <ArrowButton style={{ left: "-20px" }} onClick={onClick}>‹</ArrowButton>;
}

export default function GalleryCarousel({Subtitle}) {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);

  const images = [
    "./img/wedding02.jpg",
    "./img/wedding03.jpg",
    "./img/wedding04.jpg",
    "./img/wedding05.jpg",
    "./img/wedding06.jpg",
    "./img/wedding07.jpg",
  ];

  const settingsMain = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    asNavFor: thumbSlider.current,
  };

  const settingsThumbs = {
    slidesToShow: images.length < 5 ? images.length : 5,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    asNavFor: mainSlider.current,
  };

  return (
    <GalleryWrapper>
      <Subtitle>사진첩</Subtitle>
      {/* 메인 큰 이미지 */}
      <Slider {...settingsMain} ref={mainSlider} style={{marginBottom:"20px", boxShadow: "rgb(0 0 0 / 38%) 8px 9px 10px 0px"}}>
        {images.map((src, idx) => (
          <div key={idx}>
            <SlideImage src={src} alt={`image-${idx}`} />
          </div>
        ))}
      </Slider>

      {/* 하단 썸네일 */}
      <Slider {...settingsThumbs} ref={thumbSlider}>
        {images.map((src, idx) => (
          <ThumbnailSlide key={idx}>
            <ThumbnailImage src={src} alt={`thumb-${idx}`} />
          </ThumbnailSlide>
        ))}
      </Slider>
    </GalleryWrapper>
  );
}