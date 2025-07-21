import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import * as d3 from 'd3';
import styled from 'styled-components';
//import { getStats } from '../api';

// 더미 데이터로 바로 초기화
const dummyStats = [
// 여성 데이터
{ gender: 'female', result_type: '영숙', count: 5 },
{ gender: 'female', result_type: '정숙', count: 3 },
{ gender: 'female', result_type: '순자', count: 4 },
{ gender: 'female', result_type: '영자', count: 6 },
{ gender: 'female', result_type: '옥순', count: 2 },
{ gender: 'female', result_type: '현숙', count: 1 },
// 남성 데이터
{ gender: 'male', result_type: '영수', count: 7 },
{ gender: 'male', result_type: '상철', count: 2 },
{ gender: 'male', result_type: '광수', count: 4 },
{ gender: 'male', result_type: '영식', count: 3 },
{ gender: 'male', result_type: '영철', count: 5 },
{ gender: 'male', result_type: '영호', count: 1 },
];

const femaleCategories = ['영숙','정숙','순자','영자','옥순','현숙'];
const maleCategories   = ['영수','상철','광수','영식','영철','영호'];

export default function StatsPage() {

  const [stats, setStats] = useState(dummyStats);

  const femaleRef = useRef();
  const maleRef   = useRef();


  // useEffect(() => {
  //   getStats()
  //     .then(({ typeCounts }) => setStats(typeCounts))
  //     .catch(console.error);
  // }, []);
  // 더미데이터를 쓰니까 일단은 위 코드 주석처리

  // D3로 차트 그리기
  useEffect(() => {
    if (!stats) return;

    // 성별별 데이터 분리
    const femaleData = femaleCategories.map(name => ({
      name,
      count: +(stats.find(s => s.gender === 'female' && s.result_type === name)?.count || 0)
    }));
    const maleData = maleCategories.map(name => ({
      name,
      count: +(stats.find(s => s.gender === 'male'   && s.result_type === name)?.count || 0)
    }));

    drawBarChart(femaleRef.current, femaleData);
    drawBarChart(maleRef.current,   maleData);
  }, [stats]);

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Container $paddingTop={HEADER_HEIGHT /* 아래에서 정의 */}>
      {stats ? (
        <>
          <ChartSection>
            <h2>여성 유형별 분포</h2>
            <ChartWrapper ref={femaleRef} />
          </ChartSection>
          <ChartSection>
            <h2>남성 유형별 분포</h2>
            <ChartWrapper ref={maleRef} />
          </ChartSection>
        </>
      ) : (
        <p>로딩 중…</p>
      )}
    </Container>
    </>
  );
}

// D3 차트 그리는 헬퍼
function drawBarChart(container, data) {

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range([
      '#F5A8C7',
      '#E79BCF',
      '#D98ED8',
      '#CC82E0',
      '#BE75E8',
      '#B168F0'
    ]);
  
  // 기본 설정
  const width  = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  // 기존 SVG 제거 (리렌더 방지)
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

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));

  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.count))
      .attr('height', d => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', d => color(d.name))
      .attr('rx', 16)
      .attr('ry', 16)
      .attr('fill-opacity', 0.7);
}

const HEADER_HEIGHT = 100; // 헤더 높이

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  padding: 2rem;
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
`;
const ChartSection = styled.div`
  margin-bottom: 5rem;
  h2 { text-align: center; }
`;
const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
