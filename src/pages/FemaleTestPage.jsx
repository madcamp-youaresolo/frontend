import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import QuestionItem from '../components/QuestionItem';

const originalQuestions = [
    { id: 1, text: "나는 계획을 세우고 스스로 추진하는 편이다.", group: "영숙" },
    { id: 2, text: "팀 프로젝트나 모임에서 리더 역할을 맡는 경우가 많다.", group: "영숙" },
    { id: 3, text: "연애보다는 커리어나 자기계발이 더 중요하다고 생각한다.", group: "영숙" },
    { id: 4, text: "다른 사람보다 판단력이나 추진력이 뛰어나다는 말을 자주 듣는다.", group: "영숙" },
    { id: 5, text: "예의를 중시하고 말과 행동에 조심스러운 편이다.", group: "정숙" },
    { id: 6, text: "주변 사람의 감정이나 분위기를 잘 살피는 편이다.", group: "정숙" },
    { id: 7, text: "감정을 직접적으로 표현하기보단 돌려 말하는 편이다.", group: "정숙" },
    { id: 8, text: "솔직하되 상처주지 않도록 배려하는 편이다.", group: "정숙" },
    { id: 9, text: "타인의 시선을 별로 신경 쓰지 않는다", group: "순자" },
    { id: 10, text: "나만의 가치관과 스타일을 고수하는 편이다.", group: "순자" },
    { id: 11, text: "표현보다는 행동으로 보여주는 타입이다.", group: "순자" },
    { id: 12, text: "인간관계에서 거리를 두는 편이다", group: "순자" },
    { id: 13, text: "첫인상이나 외모에 대한 칭찬을 자주 듣는다.", group: "옥순" },
    { id: 14, text: "외출할 때 스타일링이나 메이크업에 신경 쓰는 편이다.", group: "옥순" },
    { id: 15, text: "관심을 받을 때 더 에너지가 나는 편이다.", group: "옥순" },
    { id: 16, text: "외모나 이미지로 승부를 보는 타입이라는 말을 들은 적 있다.", group: "옥순" },
    { id: 17, text: "기쁨, 슬픔, 서운함 같은 감정을 솔직하게 표현하는 편이다.", group: "영자" },
    { id: 18, text: "귀엽다는 말을 자주 듣는다.", group: "영자" },
    { id: 19, text: "상대에게 애교 섞인 말투나 행동을 자연스럽게 한다.", group: "영자" },
    { id: 20, text: "상대방에게 감정적으로 많이 기대는 편이다.", group: "영자" },
    { id: 21, text: "나는 모임이나 행사에서 자연스럽게 분위기를 이끄는 편이다.", group: "현숙" },
    { id: 22, text: "친구들이 고민을 털어놓으면 적극적으로 공감하고 위로해 준다.", group: "현숙" },
    { id: 23, text: "새로운 사람과 대화할 때 편안하고 친근한 인상을 준다는 말을 자주 듣는다.", group: "현숙" },
    { id: 24, text: "팀이나 그룹 과제를 할 때 ‘내가 있으면 든든하다’는 평가를 받는다.", group: "현숙" }
];

function shuffleArray(arr) {
    const a = [...arr];

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

const FemaleTestPage = () => {
    const navigate = useNavigate();
    
    const location = useLocation();
    const nickname = location.state?.nickname;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

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
            영숙: 0,
            정숙: 0,
            순자: 0,
            옥순: 0,
            영자: 0,
            현숙: 0
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
                onClick={() => {
                    if (!allAnswered) {
                        return alert("모든 문항에 답하지 않았습니다.");
                    }
                    const result = calculateResult();
                    navigate('/test-result', { state: { result, nickname, gender: 'female' } });
                }}
            >
                결과 보기
            </ResultButton>
        </Wrapper>
    );
}

export default FemaleTestPage;

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
    padding-top: ${({ $paddingTop }) => `${$paddingTop + 20}px`};
    padding-right: 2vw;
    padding-left: 2vw;
`;

const QuestionList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
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
    display : block;
    margin: 8vh auto 12vh auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #F575C2;
    }

    &:focus {
        outline: none;
    }
`;