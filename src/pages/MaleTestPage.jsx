import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import QuestionItem from '../components/QuestionItem';
import { saveProfile } from '../api';

const originalQuestions = [
  { id: 1, text: '나는 책임감 있고 신중한 편이다.', group: '영수' },
  { id: 2, text: '말보다 경청하는 자세를 중요하게 생각한다.', group: '영수' },
  { id: 3, text: '연애에서도 먼저 리드하고 싶어 하는 편이다.', group: '영수' },
  { id: 4, text: '조급하게 행동하기보다는 한 템포 두고 생각하는 스타일이다.', group: '영수' },
  { id: 5, text: '사람들과 쉽게 친해지고 잘 어울리는 편이다.', group: '상철' },
  { id: 6, text: '나는 계획보다는 즉흥적인 선택을 더 선호한다.', group: '상철' },
  { id: 7, text: '감정을 잘 표현하고 털털하다는 말을 자주 듣는다.', group: '상철' },
  { id: 8, text: '편안한 분위기를 만들어 주변 사람들과의 관계가 좋은 편이다.', group: '상철' },
  { id: 9, text: '나는 일이나 공부에 몰입할 때 완전히 빠져드는 편이다.', group: '광수' },
  { id: 10, text: '전문 분야에서 인정받고 싶은 욕구가 있다.', group: '광수' },
  { id: 11, text: '체계적으로 계획하고 분석적으로 사고하는 스타일이다.', group: '광수' },
  { id: 12, text: '연애 상대에게도 지적 자극을 중요하게 생각한다.', group: '광수' },
  { id: 13, text: '외모나 첫인상에 대해 긍정적인 평가를 자주 받는다.', group: '영식' },
  { id: 14, text: '청결, 예절, 자기관리 같은 것에 신경을 많이 쓰는 편이다.', group: '영식' },
  { id: 15, text: '연애에서 신뢰와 성실함이 가장 중요하다고 생각한다.', group: '영식' },
  { id: 16, text: '남들에게 모범적인 인상을 주는 게 중요하다.', group: '영식' },
  { id: 17, text: '마음에 드는 사람이 생기면 적극적으로 표현하는 편이다.', group: '영철' },
  { id: 18, text: '결정할 때 망설임 없이 빠르게 행동한다.', group: '영철' },
  { id: 19, text: '이성 앞에서 주도권을 잡고 싶은 마음이 강한 편이다.', group: '영철' },
  { id: 20, text: '강한 인상, 남성적인 분위기라는 말을 자주 듣는다.', group: '영철' },
  { id: 21, text: '감정에 솔직하고, 상대방에게 애정 표현을 자주 한다.', group: '영호' },
  { id: 22, text: '귀엽다거나 친근하다는 말을 종종 듣는다.', group: '영호' },
  { id: 23, text: '편안한 연애를 추구하고, 상대에게 기댈 줄 안다.', group: '영호' },
  { id: 24, text: '사람들과 금방 가까워지고, 밝은 에너지가 있다는 소리를 듣는다.', group: '영호' }
];

function shuffleArray(arr) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    ;[a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

const MaleTestPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const nickname = location.state?.nickname;

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  
  useEffect(() => {
    setShuffledQuestions(shuffleArray(originalQuestions));
  }, []);

  const allAnswered =
    shuffledQuestions.length > 0 &&
    Object.keys(answers).length === shuffledQuestions.length;

  const handleAnswer = (id, score) => {
    setAnswers(prev => {
      const next = { ...prev, [id]: score };
            
      const firstUnansweredIndex = shuffledQuestions.findIndex(q => next[q.id] === undefined);
        setCurrentIndex(
          firstUnansweredIndex === -1
            ? shuffledQuestions.length
            : firstUnansweredIndex
        );
        return next;
    });
  };

  const calculateResult = () => {
    const scores = {
      영수: 0,
      상철: 0,
      광수: 0,
      영식: 0,
      영철: 0,
      영호: 0
    };

    shuffledQuestions.forEach((q) => {
      const score = answers[q.id] || 0;
      scores[q.group] += score;
    });

    const maxGroup = Object.entries(scores).reduce((max, curr) => {
      return curr[1] > max[1] ? curr : max;
    });

    return maxGroup[0];
  };

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
        <QuestionList>
          {shuffledQuestions.map((q, index) => (
            <QuestionItem
              key={q.id}
              question={q.text}
              index={index}
              selected={answers[q.id]}
              isActive={index === currentIndex}
              isPast={index < currentIndex}
              isFuture={index > currentIndex}
              onSelect={(score) => handleAnswer(q.id, score)}
            />
          ))}
        </QuestionList>
      </BodyWrapper>
      <ResultButton
        onClick={async () => {
          if (!allAnswered) {
            return alert("모든 문항에 답하지 않았습니다.");
          }
          const result = calculateResult();
          try {
            await saveProfile({ nickname, gender: 'male', resultType: result });
            navigate(`/test-result?nickname=${encodeURIComponent(nickname)}&gender=male&result=${result}`);
          } catch (err) {
            console.error('프로필 저장 실패:', err);
            alert('결과 저장 중 오류가 발생했습니다. 다시 시도해주세요');
          }
        }}
      >
        결과 보기
      </ResultButton>
    </Wrapper>
  );
}

export default MaleTestPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #e3c9de);
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
  padding-top: ${({ $paddingTop }) => `${$paddingTop + 36}px`};
  padding-right: 2vw;
  padding-left: 2vw;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6vh;
`;

const ResultButton = styled.button`
  width: clamp(200px, 36vw, 300px);
  aspect-ratio: 5 / 1.1;
  font-size: clamp(14px, 2vw, 22px);
  font-weight: 400;
  color: #FAFAFA;
  background-color: #121212;
  border-radius: 100px;
  border: none;
  display: block;
  margin: 8vh auto 12vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f575c2;
  }

  &:focus {
    outline: none;
  }
`;