import { useMantineTheme } from '@mantine/core';
import * as d3 from 'd3';
import { useEffect, useMemo, useRef } from 'react';

export function LineChart<DataType extends Record<string, string | number>>({ width, height, data }: { width: number; height: number; data: DataType[] }) {
  const theme = useMantineTheme();
  const gx = useRef();
  const gy = useRef();

  const maxData = useMemo(() => Math.max(...data.map(d => +d.amount)), [data]);

  const x = d3
    .scaleUtc()
    .domain([0, data.length - 1])
    .range([20, width - 20]);

  const y = d3
    .scaleLinear()
    .domain([0, maxData])
    .range([height - 300, 20]);

  const lineD = d3.line((d, i) => x(i), y);

  // @ts-ignore
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height || 600} xmlns="http://www.w3.org/2000/svg">
      {/* @ts-ignore */}
      <g ref={gx} transform={`translate(0, ${height - 300})`} />
      {/* @ts-ignore */}
      <g ref={gy} transform={`translate(20, 0)`} />
      {/* @ts-ignore */}
      <path fill="none" d={lineD(data.map(d => +d.amount))} stroke={theme.colors.blue[5]} />
    </svg>
  );
}
