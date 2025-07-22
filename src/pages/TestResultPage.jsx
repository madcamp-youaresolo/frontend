import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import html2canvas from 'html2canvas';

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
  const bodyRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleDownload = async () => {
    if (!bodyRef.current) return;
    try {
      const canvas = await html2canvas(bodyRef.current, {
        backgroundColor: null,
        scale: 2, // 이미지 해상도 향상
      });

      const dataUrl = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.hef = dataUrl
      a.download = 'test-result.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('이미지 저장 실패:', err);
    }
  };

  const handleShare = async () => {
    if (!bodyRef.current) return;
    // 캡처 후 Blob 으로 변환
    try {
      const canvas = await html2canvas(bodyRef.current, { scale: 1 });
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      const filesArray = [
        new File([blob], 'result.png', { type: 'image/png' })
      ];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({
          files: filesArray,
          title: '나의 너는솔로 결과',
          text: '내 캐릭터 유형을 확인해보세요!'
        });
      } else {
        alert('이 브라우저는 파일 공유를 지원하지 않습니다.');
      }
    } catch (err) {
      console.error('공유 실패', err);
    }
  };



  return (
    <Wrapper>
      <HeaderWrapper ref={headerRef}>
        <Header />
      </HeaderWrapper>
      <BodyWrapper ref={bodyRef} $paddingTop={headerHeight}>
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
        <ButtonRow>
          <IconButton onClick={handleDownload}>
            <img src="public/saveImgIcon.png" alt="이미지 저장" />
            이미지 저장
          </IconButton>
          <IconButton onClick={handleShare}>
            <img src="/shareIcon.png" alt="결과 공유" />
            결과 공유
          </IconButton>
        </ButtonRow>
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


// 버튼 가로 정렬 컨테이너
const ButtonRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
`;

// 아이콘+텍스트 링크
const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  background: none;
  color: #121212;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    text-decoration: underline;
  }
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