import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '/logo.png';
import GenderSelectModal from '../components/GenderSelectModal';

const IntroPage = () => {
    const [genderSelect, setGenderSelect] = useState(false);

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
    width: clamp(200px, 32vw, 420px);
    aspect-ratio: 2.1 / 1;
    margin-bottom: 4vh;
`;

const StartButton = styled.button`
    width: clamp(40px, 28vw, 280px);
    aspect-ratio: 5 / 1;
    font-size: clamp(12px, 2vw, 20px);
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