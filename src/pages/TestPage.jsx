import React from 'react';
import styled from 'styled-components';

const questionList = [
  { text: "나는 계획을 세우고 스스로 추진하는 편이다." },
  { text: "팀 프로젝트나 모임에서 리더 역할을 맡는 경우가 많다." },
  { text: "연애보다는 커리어나 자기계발이 더 중요하다고 생각한다." },
  { text: "다른 사람보다 판단력이나 추진력이 뛰어나다는 말을 자주 듣는다." },
];

const TestPage = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <LogoImg src="/logo.png" alt="logo" />
        <Retry>
          <RetryIcon viewBox="0 0 25 27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.6489 7.16994L20.6326 6.14186C18.7078 4.1943 16.1623 3.00068 13.4492 2.77337C10.7361 2.54606 8.03118 3.29981 5.81583 4.9005C3.60049 6.50119 2.01836 8.845 1.35094 11.5149C0.68353 14.1848 0.974117 17.0077 2.171 19.4812C3.36789 21.9548 5.39345 23.9185 7.88728 25.0232C10.3811 26.1278 13.1815 26.3016 15.7901 25.5137C18.3987 24.7258 20.6465 23.0273 22.1333 20.7204C23.6202 18.4134 24.2498 15.6477 23.9101 12.9153M21.6489 7.16994L15.5496 7.17139M21.6489 7.16994V1"
              stroke="#FF50B9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </RetryIcon>
          <RetryText>다시하기</RetryText>
        </Retry>
      </HeaderWrapper>

      <Content>
        {questionList.map((q, idx) => (
          <QuestionBlock key={idx}>
            <Question>{q.text}</Question>
            <ChoiceRow>
              {["전혀 아니다", "", "", "", "매우 그렇다"].map((label, i) => (
                <Choice key={i}>
                  <Heart>💗</Heart>
                  <Label>{label}</Label>
                </Choice>
              ))}
            </ChoiceRow>
          </QuestionBlock>
        ))}
      </Content>
    </Wrapper>
  );
};

export default TestPage;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #fffafc, #fde6f2);
`;

const RetryIcon = styled.svg`
  width: 25px;
  height: 27px;
  margin-right: 5px;
`;

const RetryText = styled.span`
  color: #ff50b9;
  font-weight: bold;
  font-size: 1rem;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #ffffff, #fff0f5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Retry = styled.button`
  background: none;
  border: none;
  color: hotpink;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 60px;
  padding: 1rem;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;

const QuestionBlock = styled.div`
  margin-bottom: 2rem;
`;

const Question = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ChoiceRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Choice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heart = styled.span`
  font-size: 2rem;
  color: pink;
`;

const Label = styled.span`
  font-size: 0.75rem;
  margin-top: 0.3rem;
  color: #777;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #ffffff, #fff0f5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LogoImg = styled.img`
  height: 35px;
`;
