import React from "react";
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";


const KakaoAPI = () => {
  return (
    <Map
      center={{ lat: 37.50640157497443, lng: 126.75419588243194 }}
      style={{ width: "80%", height: "200px", border: "1px solid #888", marginBottom: "35px" }}
      level={3}
    >
      <MapMarker
        //onClick={() => window.open("https://place.map.kakao.com/220719399")}
        position={{ lat: 37.506401590, lng: 126.7541958 }}
        level={4}
        image={{
          src: "https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png",
          size: {
            width: 35,
            height: 40,
          },
        }}
        title="라비에벨 웨딩홀"// 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      >
      </MapMarker>
    </Map>
  );
};

export default KakaoAPI;
