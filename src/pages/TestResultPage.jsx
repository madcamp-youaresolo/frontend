import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

// character images
import YoungSook from '../assets/images/characters/youngsook.png';
import JungSook from '../assets/images/characters/jungsook.png';
import SoonJa from '../assets/images/characters/soonja.png';
import YoungJa from '../assets/images/characters/youngja.png';
import OkSoon from '../assets/images/characters/oksoon.png';
import HyunSook from '../assets/images/characters/hyunsook.png';

import YoungSu from '../assets/images/characters/youngsu.png';
import SangChul from '../assets/images/characters/sangchul.png';
import KwangSu from '../assets/images/characters/kwangsu.png';
import YoungSik from '../assets/images/characters/youngsik.png';
import YoungChul from '../assets/images/characters/youngchul.png';
import YoungHo from '../assets/images/characters/youngho.png';

const TestResultPage = () => {
  const  headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper ref={headerRef}>
        <Header />
      </HeaderWrapper>
      <BodyWrapper $paddingTop={headerHeight}>
        <BoldText size="clamp(16px, 5vw, 32px)">
          {/* user nickname */}
          <Pink>원숭이 </Pink>
          님의 너는솔로 캐릭터 유형은?
        </BoldText>

        {/* character image */}
        <CharacterImage src={YoungSook} />
        
        {/* character name */}
        <CharacterText>영숙</CharacterText>

        {/* character description */}
        <BoldText size="clamp(13px, 4vw, 26px)">"야무진 리더, 커리어도 사랑도 잡은 여왕"</BoldText>
        <LightText size="clamp(10px, 3vw, 20px)">
          똑부러지고 일도 사랑도 확실한 스타일!
          <br />
          리더십과 책임감으로 어떤 상황도 척척 해결하는 능력자예요.
          <br />
          성공한 커리어우먼의 표본, 당신은 바로 영숙입니다.
        </LightText>
      </BodyWrapper>
    </Wrapper>
  );
}

export default TestResultPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #FFFFFF, #E3C9DE);
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const BodyWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
  padding-bottom: 10vh;
`;

const BoldText = styled.span`
  font-size: ${({ size }) => size || 'clamp(15px, 4.5vw, 30px)'};
  font-weight: 600;
  color: #121212;
  cursor: default;
`;

const LightText = styled.span`
  font-size: ${({ size }) => size || 'clamp(10px, 3vw, 20px)'};
  font-weight: 400;
  color: #3D3D3D;
  cursor: default;
  text-align: center;
  margin-top: 1.7vh;
`;

const Pink = styled.span`
  color: #FF63C1;
`;

const CharacterText = styled.span`
  font-size: clamp(8px, 4.5vw, 28px);
  font-weight: 600;
  text-align: center;
  color: #121212;
  background-color: #FA8BCE;
  width: clamp(100px, 20vw, 160px);
  aspect-ratio: 7 / 2;
  border-radius: 100px;
  cursor: default;
  margin-bottom: 5vh;
`;

const CharacterImage = styled.img`
  display: block;
  width: clamp(120px, 30vw, 200px);
  aspect-ratio: 4 / 5;
  margin-top: 5vh;
`;