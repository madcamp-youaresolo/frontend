import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const result = location.state?.result;
  const gender = location.state?.gender;
  const nickname = location.state?.nickname;

  const femaleData = {
    영숙: {
      name: '영숙',
      image: YoungSook,
      subtitle: '“야무진 리더, 커리어도 사랑도 잡은 여왕”',
      description: '똑부러지고 일도 사랑도 확실한 스타일! 리더십과 책임감으로 어떤 상황도 척척 해결하는 능력자예요. 성공한 커리어우먼의 표본, 당신은 바로 영숙입니다.'
    },
    정숙: {
      name: '정숙',
      image: JungSook,
      subtitle: '“고상하고 깔끔한, 도도한 예술 감성러”',
      description: '겉으로는 조용하고 단정하지만, 속은 누구보다 솔직하고 확고한 스타일! 예술적인 기질이 풍부하고 자신만의 기준이 뚜렷한 당신은 우아한 분위기를 풍기는 정숙이에요.'
    },
    순자: {
      name: '순자',
      image: SoonJa,
      subtitle: '“시크함 그 자체, 도시여자의 정석”',
      description: '감정에 휘둘리지 않고, 러브라인에도 휘둘리지 않는 당신! 도도한 외모와 쿨한 성격으로 마이웨이 인생을 살아가는 모습이 멋져요. 자기 길을 묵묵히 가는 당신은 순자입니다.'
    },
    영자: {
      name: '영자',
      image: YoungJa,
      subtitle: '“에너지 넘치는 귀염둥이 막내”',
      description: '생글생글한 인상에 애교 넘치는 성격! 적극적이고 감정 표현도 풍부해서 주변을 금방 휘어잡는 스타일이에요. 밝고 긍정적인 에너지의 소유자, 당신은 바로 영자!'
    },
    옥순: {
      name: '옥순',
      image: OkSoon,
      subtitle: '“예쁨이 모든 걸 압도하는 솔로계 여신”',
      description: '첫인상에서 압도적인 비주얼로 몰표를 받는 당신. 여성스럽고 사랑스러운 매력으로 주변의 시선을 한몸에 받아요. 당신은 그야말로 나는 솔로의 얼굴, 옥순이에요.'
    },
    현숙: {
      name: '현숙',
      image: HyunSook,
      subtitle: '“편안하고 따뜻한, 친구 같은 연인”',
      description: '부담 없이 다가갈 수 있는 당신만의 따뜻한 분위기. 친구처럼 편안하지만, 알고 보면 센스와 공감력까지 겸비한 에이스! 사람들을 편하게 만드는 진국 같은 당신은 현숙이에요.'
    },
  };

  const maleData ={
    영수: {
      name: '영수',
      image: YoungSu,
      subtitle: '“차분함과 무게감의 대명사, 맏형미 뿜뿜!”',
      description: '당신은 누구보다도 이성적이고 차분한 타입. 지적인 아우라로 신뢰를 얻으며, 사람들을 이끄는 리더십도 갖추고 있어요. 여유 있는 태도에서 풍기는 깊은 멋, 당신은 바로 솔로계의 맏형 영수입니다.'
    },
    상철: {
      name: '상철',
      image: SangChul,
      subtitle: '“든든하고 푸근한 국민 호감형”',
      description: '누구에게나 친근한 당신은 말 그대로 듬직함의 정석! 유쾌한 자유로움 속에 숨겨진 깊은 배려심은 많은 이들의 마음을 사로잡습니다. 입체적인 매력을 지닌 당신, 바로 상철 그 자체예요.'
    },
    광수: {
      name: '광수',
      image: KwangSu,
      subtitle: '“엘리트 괴짜, 나만의 세계에 빠진 천재형”',
      description: '평범함은 거부한다! 똑똑하고 전문적인 당신은 확고한 세계관과 개성을 가진 진정한 사람입니다. 조금은 엉뚱해도 결국 매력으로 승화시키는 타입, 당신은 광수입니다.'
    },
    영식: {
      name: '영식',
      image: YoungSik,
      subtitle: '“잘생기고 반듯한, 완성형 꽃미남”',
      description: '누가 봐도 ‘바른생활 아이콘’. 비주얼과 성실함, 두 마리 토끼를 다 잡은 당신은 모두가 탐내는 이상형! 묵묵히 자신의 길을 가면서도 반짝이는 존재감, 당신은 영식이에요.'
    },
    영철: {
      name: '영철',
      image: YoungChul,
      subtitle: '“직진 본능의 상남자, 마초 포스 폭발!”',
      description: '솔직하고 강단 있는 태도로 밀고 나가는 스타일. 때로는 거침없고 직설적이지만, 그 안엔 확고한 진심이 담겨 있어요. 불도저 같은 추진력의 소유자, 당신은 바로 영철입니다.'
    },
    영호: {
      name: '영호',
      image: YoungHo,
      subtitle: '“귀엽고 수다스러운 친근한 막내”',
      description: '말도 많고, 정 많고, 웃음도 많고! 늘 밝고 긍정적인 에너지로 주변을 활기차게 만드는 당신은 팀의 분위기 메이커예요. 귀여운 막내미 넘치는 당신은 영호 그 자체!'
    },
  };

  const characterData = gender === 'female' ? femaleData[result] : maleData[result];

  if (!characterData) return <p>잘못된 접근입니다.</p>;

  return (
    <Wrapper>
      <HeaderWrapper ref={headerRef}>
        <Header />
      </HeaderWrapper>
      <BodyWrapper $paddingTop={headerHeight}>
        <BoldText size="clamp(16px, 5vw, 32px)">
          {/* user nickname */}
          <Pink>{nickname} </Pink>
          님의 너는솔로 캐릭터 유형은?
        </BoldText>

        {/* character image */}
        <CharacterImage src={characterData.image} />
        
        {/* character name */}
        <CharacterText>{characterData.name}</CharacterText>

        {/* character description */}
        <BoldText size="clamp(13px, 4vw, 26px)">{characterData.subtitle}</BoldText>
        <LightText size="clamp(10px, 3vw, 20px)">
          {characterData.description.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
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