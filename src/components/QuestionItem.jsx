import React, { useState } from 'react';
import styled from 'styled-components';
import EmptyHeartGray from '../assets/images/heart/empty-heart-gray.png';
import EmptyHeartPink from '../assets/images/heart/empty-heart-pink.png';
import FilledHeartGray from '../assets/images/heart/filled-heart-gray.png';
import FilledHeartPink from '../assets/images/heart/filled-heart-pink.png';

const QuestionItem = () => {
    const [select, setSelect] = useState(null);

    const renderHeart = (index) => {
        let src;
        let size;

        if (index === 0 || index === 4) size = 'large';
        else if (index === 2) size = 'smallest';
        else size = 'medium';

        if (select === index) {
            if (index === 2) src = FilledHeartGray;
            else src = FilledHeartPink;
        } else {
            if (index === 2) src = EmptyHeartGray;
            else src = EmptyHeartPink;
        }

        return (
            <HeartImage 
                key={index}
                src={src}
                size={size}
                onClick={() => setSelect(index)}
            />
        );
    };

    return (
        <Wrapper>
            <QuestionText>나는 계획을 세우고 스스로 추진하는 편이다.</QuestionText>
            <HeartContainer>
                <HeartIcon>
                    {[0, 1, 2, 3, 4].map((index) => renderHeart(index))}
                </HeartIcon>
                <LabelContainer>
                    <Label index={0}>전혀 아니다</Label>
                    <Label index={1} />
                    <Label index={2} />
                    <Label index={3} />
                    <Label index={4}>매우 그렇다</Label>
                </LabelContainer>
            </HeartContainer>
        </Wrapper>
    );
}

export default QuestionItem;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const QuestionText = styled.span`
    color: #121212;
    font-size: clamp(8px, 4vw, 26px);
    font-weight: 600;
    text-align: center;
    margin-bottom: 2.5vh;
    cursor: default;
`;

const HeartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeartIcon = styled.div`
    display: flex;
    gap: 3vw;
    margin-bottom: 0.3vh;
`;

const HeartImage = styled.img`
    cursor: pointer;
    width: ${({ size }) =>
        size === 'large'
            ? 'clamp(28px, 4vw, 48px)'
            : size === 'medium'
            ? 'clamp(24px, 3.5vw, 42px)'
            : 'clamp(20px, 3vw, 36px)'};
    aspect-ratio: 1 / 1;
    object-fit: contain;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 3.02vw;
    cursor: default;
    margin-top: 0.5vh;
`;

const Label = styled.span`
    color: #121212;
    display: flex;
    justify-content: center;
    width: ${({ index }) =>
        index === 0 || index === 4 ? 'clamp(28px, 4vw, 48px)' :
        index === 2 ? 'clamp(20px, 3vw, 36px)' :
        'clamp(24px, 3.5vw, 42px)'};
    font-size: clamp(10px, 2.5vw, 16px);
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
`;