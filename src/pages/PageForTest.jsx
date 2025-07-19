// page for test
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import QuestionItem from '../components/QuestionItem';

const PageForTest = () => {

    return (
        <Wrapper>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <BodyWrapper>
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
            </BodyWrapper>
        </Wrapper>
    );
}

export default PageForTest;

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
    display: flex;
    flex-direction: column;
    gap: 4vh;
    overflow-y: auto;
    margin: 8vh 0vw;
`;