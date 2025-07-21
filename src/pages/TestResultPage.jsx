import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const TestResultPage = () => {
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
        <p style={{textAlign: 'center'}}>test result page</p>
      </BodyWrapper>
    </Wrapper>
  );
}

export default TestResultPage;

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
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
`;