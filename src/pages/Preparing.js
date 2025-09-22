import React, {useState, useRef, useEffect} from 'react'
import styled from "styled-components";
import UploadPhoto from './UploadPhoto';


function Preparing({setActiveTab}) {
  const [active, setActive] = useState(false);
  
  const handleChange =(e) => {
    const value = e.target.value;

    if(value === "openSesame"){
      setActive(true);
    } else if (value.length > 10) console.log("틀렸습니다");
  }

  useEffect(() => {
    document.querySelector('input[name="hiddenDoor"]').focus();
    document.querySelector('input[name="hiddenDoor"]').addEventListener('input', handleChange);
  }, []);

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", height:"50%", justifyContent: "center"}}>
      
          <p>예식 당일에 오픈 예정인 탭입니다.</p>
          <p>감사합니다!</p>
          <input type="text" name="hiddenDoor" style={{position: "relative", top:"0",width: "0", height: "0", left: "-100px"}} autoComplete='false'/>
      </div>
      {active && <UploadPhoto />}
    </>
  );
}



export default Preparing;