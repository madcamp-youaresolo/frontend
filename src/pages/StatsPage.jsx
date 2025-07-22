// src/pages/StatsPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import * as d3 from 'd3';
import styled from 'styled-components';
import YoungSook from '../assets/images/characters/youngsook.png';
import JungSook from '../assets/images/characters/jungsook.png';
import SoonJa from '../assets/images/characters/soonja.png';
import YoungJa from '../assets/images/characters/youngja.png';
import OkSoon from '../assets/images/characters/oksoon.png';
import HyunSook from '../assets/images/characters/hyunsook.png';
import YoungSu from '../assets/images/characters/youngsu.png';
import SangChul from '../assets/images/characters/sangchul.png';
import KwangSu from '../assets/images/characters/kwangsu.png';
import YoungSik from '../assets/images/characters/youngsik.png';
import YoungChul from '../assets/images/characters/youngchul.png';
import YoungHo from '../assets/images/characters/youngho.png';


const femaleList = [
  { name: '영숙', src: YoungSook, subtitle: '리더형 / 커리어' },
  { name: '정숙', src: JungSook, subtitle: '배려심 / 감성적' },
  { name: '순자', src: SoonJa, subtitle: '독립성 / 쿨함' },
  { name: '영자', src: YoungJa, subtitle: '막내 / 에너지' },
  { name: '옥순', src: OkSoon, subtitle: '화제성 / 아름다움' }, 
  { name: '현숙', src: HyunSook, subtitle: '온화형 / 따뜻함' },
];
  
const maleList = [
  { name: '영수', src: YoungSu, subtitle: '차분함 / 무게감' },
  { name: '상철', src: SangChul, subtitle: '자유분방 / 털털함' },
  { name: '광수', src: KwangSu, subtitle: '엘리트 / 지성' },
  { name: '영식', src: YoungSik, subtitle: '비주얼 / 에너지' },
  { name: '영철', src: YoungChul, subtitle: '직진 / 상남자' },
  { name: '영호', src: YoungHo, subtitle: '부드러움 / 안정감' },
];

// 더미 데이터
const dummyStats = [
  { gender: 'female', result_type: '영숙', count: 5 },
  { gender: 'female', result_type: '정숙', count: 3 },
  { gender: 'female', result_type: '순자', count: 4 },
  { gender: 'female', result_type: '영자', count: 6 },
  { gender: 'female', result_type: '옥순', count: 2 },
  { gender: 'female', result_type: '현숙', count: 1 },
  { gender: 'male',   result_type: '영수', count: 7 },
  { gender: 'male',   result_type: '상철', count: 2 },
  { gender: 'male',   result_type: '광수', count: 4 },
  { gender: 'male',   result_type: '영식', count: 3 },
  { gender: 'male',   result_type: '영철', count: 5 },
  { gender: 'male',   result_type: '영호', count: 1 },
];

const femaleCategories = ['영숙','정숙','순자','영자','옥순','현숙'];
const maleCategories   = ['영수','상철','광수','영식','영철','영호'];

export default function StatsPage() {
  const [stats, setStats] = useState(dummyStats);
  const femaleRef = useRef(null);
  const maleRef   = useRef(null);

  // 차트 렌더링
  useEffect(() => {
    if (!stats) return;

    const femaleData = femaleCategories.map(name => ({
      name,
      count: +(stats.find(s => s.gender === 'female' && s.result_type === name)?.count || 0)
    }));
    const maleData = maleCategories.map(name => ({
      name,
      count: +(stats.find(s => s.gender === 'male' && s.result_type === name)?.count || 0)
    }));

    drawBarChart(femaleRef.current, femaleData);
    drawBarChart(maleRef.current,   maleData);
  }, [stats]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Container $paddingTop={HEADER_HEIGHT}>
        {stats ? (
          <ChartGrid>
            <ChartSection>
              <h2>여성 유형별 분포</h2>
              <ChartWrapper ref={femaleRef} />
            </ChartSection>
            <ChartSection>
              <h2>남성 유형별 분포</h2>
              <ChartWrapper ref={maleRef} />
            </ChartSection>
          </ChartGrid>
        ) : (
          <p>로딩 중…</p>
        )}
        <ImageGrid>
          {femaleList.map(c => (
            <ImageCard key={c.name}>
              <Avatar src={c.src} alt={c.name}/>
              <Name>{c.name}</Name>
              <Subcaption>{c.subtitle}</Subcaption>
            </ImageCard>
          ))}
          {maleList.map(c => (
            <ImageCard key={c.name}>
              <Avatar src={c.src} alt={c.name}/>
              <Name>{c.name}</Name>
              <Subcaption>{c.subtitle}</Subcaption>
            </ImageCard>
          ))}
        </ImageGrid>
      </Container>
    </Wrapper>
  );
}

// D3 막대 차트 그리기 함수
function drawBarChart(container, data) {
  // 색상 스케일 (핑크 톤 팔레트)
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(['#F5A8C7','#E79BCF','#D98ED8','#CC82E0','#BE75E8','#B168F0']);

  const width  = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  // 이전 차트 제거
  d3.select(container).selectAll('svg').remove();

  const svg = d3.select(container)
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)]).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x',      d => x(d.name))
      .attr('y',      d => y(d.count))
      .attr('height', d => y(0) - y(d.count))
      .attr('width',  x.bandwidth())
      .attr('fill',   d => color(d.name))
      .attr('rx',     8)          // 둥근 모서리
      .attr('ry',     8)
      .attr('fill-opacity', 0.8); // 반투명
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  /* 기존 FemaleTestPage에서 쓰셨던 그라데이션을 그대로 복사 */
  background: linear-gradient(to bottom, #FFFFFF, #E3C9DE);
  display: flex;
  flex-direction: column;
`;

// 상수 및 스타일컴포넌트
const HEADER_HEIGHT = 120;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: white;
`;

const Container = styled.div`
  padding: 2rem;
  padding-top: ${({ $paddingTop }) => `${$paddingTop + 20}px`};
`;

/* ★★★ 여기부터가 반응형 2×1 그리드 레이아웃 ★★★ */
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2rem;
`;
/* ================================================= */

/* 반응형 그리드: wide→6열, mid→4열, small→2열 */
const ImageGrid = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  margin-top: 3rem;

  /* wide: 6 columns */
  grid-template-columns: repeat(6, 1fr);

  /* medium: 4 columns */
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
  /* small: 2 columns */
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartSection = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageCard = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border-radius: 8px;
`;

const Name = styled.div`
  margin-top: 0.5rem;
  font-weight: 700;
  color: #121212;
`;

const Subcaption = styled.div`
  margin-top: 0.25rem;
  font-weight: 400;
  font-size: 0.85rem;
  color: #555;
`;
