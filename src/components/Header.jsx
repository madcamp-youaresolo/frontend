import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/logo.png';
import RetryIconImage from '../assets/images/retry-icon.png';

const Header = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
        navigate('/');
    };

    return (
        <Wrapper>
            <LogoImage src={Logo} onClick={handleLogo}/>
            <RetryWrapper>
                <RetryIcon src={RetryIconImage} />
                <RetryText>다시하기</RetryText>
            </RetryWrapper>
        </Wrapper>
    );
}

export default Header;

const Wrapper = styled.div`
    padding: 0.5vh 2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.97);
    border-bottom: 1px solid #D9D9D9;
`;

const LogoImage = styled.img`
    width: clamp(60px, 20vw, 120px);
    aspect-ratio: 2 / 1;
    cursor: pointer;
`;

const RetryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7vw;
    cursor: pointer;
`;

const RetryIcon = styled.img`
    width: clamp(4px, 4vw, 24px);
    height: auto;
    display: block;
    object-fit: contain;
`;

const RetryText = styled.span`
    font-size: clamp(14px, 2vw, 20px);
    font-weight: 600;
    color: #FF50B9;
`;