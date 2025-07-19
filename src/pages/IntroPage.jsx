import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '/logo.png';
import GenderSelectModal from '../components/GenderSelectModal';

const IntroPage = () => {
    const [genderSelect, setGenderSelect] = useState(false);

    // 스크롤 차단
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <GradientBackground>
            <LogoImage src={Logo} />
            <StartButton onClick={() => setGenderSelect(true)}>
                테스트 시작하기
            </StartButton>
            {genderSelect && (
                <GenderSelectModal onClose={() => setGenderSelect(false)} />
            )}
        </GradientBackground>
    );
}

export default IntroPage;

const GradientBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #FFFFFF, #D49DCA);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LogoImage = styled.img`
    width: clamp(240px, 34vw, 440px);
    aspect-ratio: 2.1 / 1;
    margin-bottom: 4vh;
`;

const StartButton = styled.button`
    width: clamp(200px, 36vw, 300px);
    aspect-ratio: 5 / 1.1;
    font-size: clamp(14px, 2vw, 22px);
    font-weight: 400;
    color: #FAFAFA;
    background-color: #121212;
    border-radius: 100px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.4s ease-in-out;

    &:hover {
        background-color: #F575C2;
    }

    &:focus {
        outline: none;
    }
`;