import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FemaleIcon from '../assets/images/female.png';
import MaleIcon from '../assets/images/male.png';
import Panel from '../assets/images/panel.png';

const GenderSelectModal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleSelect = (gender) => {
        navigate(`/test-${gender}`)
    };
    
    return (
        <Overlay onClick={onClose}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Text>당신의 성별은 ?</Text>
                <ButtonWrapper>
                    <Button onClick={() => handleSelect('female')}>
                        <img src={FemaleIcon} className="female-icon" />
                        여성
                    </Button>
                    <Button onClick={() => handleSelect('male')}>
                        <img src={MaleIcon} className="male-icon" />
                        남성
                    </Button>
                </ButtonWrapper>
                <PanelImage src={Panel} />
            </Wrapper>
        </Overlay>
    );
}

export default GenderSelectModal;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const Wrapper = styled.div`
    width: clamp(280px, 80vw, 480px);
    aspect-ratio: 100 / 109;
    background-color: #FAFAFA;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

const Text = styled.span`
    font-size: clamp(24px, 4vw, 32px);
    font-weight: bold;
    color: #121212;
    margin-top: 4vh;
    margin-bottom: 2.5vh;
    cursor: default;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flew-direction: row;
    justify-content: center;
    gap: 1.5vw;
    margin-bottom: 0.5vh;
`;

const Button = styled.button`
    width: clamp(10px, 20vw, 120px);
    aspect-ratio: 2.6 / 1;
    font-size: clamp(12px, 2vw, 18px);
    color: #FAFAFA;
    background-color: #707070;
    border-radius: 100px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8vw;
    transition: filter 0.2s ease-in-out;

    &:hover {
        filter: brightness(0.7);
    }

    &:focus {
        outline: none;
    }

    img.female-icon {
        width: 11px;
        height: 16px;
    }

    img.male-icon {
        width: 15px;
        height: 15px;
    }
`;

const PanelImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;