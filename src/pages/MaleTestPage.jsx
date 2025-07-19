import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const MaleTestPage = () => {

    return (
        <Wrapper>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <BodyWrapper>
                <p style={{textAlign: 'center', fontSize: '50px'}}>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                    <br/>
                    male test page
                </p>
            </BodyWrapper>
        </Wrapper>
    );
}

export default MaleTestPage;

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
`;

const BodyWrapper = styled.div`
    overflow-y: auto;
    padding: 2vh;
`;