import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FemaleGray from '../assets/images/female-gray.png';
import FemaleWhite from '../assets/images/female-white.png';
import MaleGray from '../assets/images/male-gray.png';
import MaleWhite from '../assets/images/male-white.png';
import Panel from '../assets/images/panel.png';

const IntroModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState(null);

    const handleStart = () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        if (!gender) {
            alert('성별을 선택해주세요.');
            return;
        }
        navigate(`/test-${gender}`, {
            state: {
                nickname,
                gender,
            },
        });
    };
    
    return (
        <Overlay onClick={onClose}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Title>여기서 잠깐,</Title>

                <Row>
                    <Label>닉네임</Label>
                    <FieldContainer>
                        <Input
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </FieldContainer>
                </Row>

                <Row>
                    <Label>성별</Label>
                    <FieldContainer>
                        <ButtonWrapper>
                            <Button 
                                onClick={() => setGender('female')}
                                $active={gender === 'female'}
                            >
                                <img 
                                    src={gender === 'female' ? FemaleWhite : FemaleGray}
                                    className="female-icon" 
                                />
                                여자
                            </Button>
                            <Button 
                                onClick={() => setGender('male')}
                                $active={gender === 'male'}
                            >
                                <img 
                                    src={gender === 'male' ? MaleWhite : MaleGray}
                                    className="male-icon" 
                                />
                                남자
                            </Button>
                        </ButtonWrapper>
                    </FieldContainer>
                </Row>

                <StartButton onClick={handleStart}>
                    테스트 시작하기
                </StartButton>
                <PanelImage src={Panel} />
            </Wrapper>
        </Overlay>
    );
}

export default IntroModal;

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
    width: clamp(200px, 76vw, 460px);
    aspect-ratio: 4 / 5.5;
    background-color: #FAFAFA;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

const Title = styled.span`
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 600;
    color: #121212;
    margin: 3vh 0vw;
    cursor: default;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    max-width: 400px;
    margin-bottom: 1.5vh;
    gap: clamp(1vh, 1vh, 3vh);
`;

const Label = styled.label`
    color: #121212;
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 600;
    width: clamp(40px, 14vw, 80px);
    flex-shrink: 0;
`;

const FieldContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
`;

const Input = styled.input`
    height: clamp(8px, 2vw, 20px);
    aspect-ratio: 12 / 1;
    padding: clamp(8px, 1vh, 10px) clamp(10px, 1.5vw, 16px);
    border: clamp(1px, 0.5vw, 2px) solid #707070;
    border-radius: 999px;
    font-size: clamp(12px, 2vw, 18px);
    align-items: center;
    justify-content: center;
    background-color: #FAFAFA;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #A4A4A4;
        font-size: clamp(10px, 1.8vw, 15px);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flew-direction: row;
    gap: 1vw;
`;

const Button = styled.button`
    height: clamp(8px, 7vw, 36px);
    aspect-ratio: 2.6 / 1;
    font-size: clamp(7px, 2.8vw, 14px);
    color: ${({ $active }) => ($active ? '#FAFAFA' : '#707070')};
    background-color: ${({ $active }) => ($active ? '#707070' : '#FAFAFA')};
    border-radius: 100px;
    border: clamp(1px, 0.5vw, 2px) solid #707070;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 0.7vw;

    &:hover {
        border: clamp(1px, 0.5vw, 2px) solid #707070;
    }

    &:focus {
        outline: none;
        background-color: #707070;
        border: clamp(1px, 0.5vw, 2px) solid #707070;
    }

    img.female-icon,
    img.male-icon
    {
        width: clamp(11px, 2vw, 18px);
        aspect-ratio: 1 / 1;
    }
`;

const StartButton = styled.button`
    width: clamp(100px, 18vw, 180px);
    aspect-ratio: 5 / 1;
    font-size: clamp(10px, 1.5vw, 16px);
    font-weight: 400;
    color: #FAFAFA;
    background-color: #121212;
    border-radius: 100px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.4s ease-in-out;
    margin-top: 2vh;

    &:hover {
        background-color: #F575C2;
    }

    &:focus {
        outline: none;
    }
`;

const PanelImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;