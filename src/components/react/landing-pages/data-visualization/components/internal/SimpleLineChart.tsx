import { useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { axisBottom, axisLeft, extent, line, scaleLinear, scaleUtc, select } from 'd3';
import { useEffect, useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../types';

export function SimpleLineChart<DataType extends Record<string, string | number>>({
  data,
  boundaries = { left: 40, right: 10, top: 10, bottom: 40 },
}: {
  data: DataType[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, width, height } = useElementSize();
  const theme = useMantineTheme();
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const amountDomain = useMemo(() => extent(data.map(d => +d.amount)) as [number, number], [data]);
  const dateDomain = useMemo(() => extent(data.map(d => new Date(d.date))) as [Date, Date], [data]);

  const xScale = useMemo(
    () =>
      scaleUtc()
        .domain(dateDomain)
        .range([boundaries.left, width - boundaries.right]),
    [boundaries.left, boundaries.right, dateDomain, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(amountDomain)
        .range([height - boundaries.bottom, boundaries.top]),
    [amountDomain, boundaries.bottom, boundaries.top, height],
  );

  const lineDFn = useMemo(
    () =>
      line<DataType>(
        d => xScale(new Date(d.date as string)),
        d => yScale(+d.amount),
      ),
    [xScale, yScale],
  );

  const d = useMemo(() => {
    const d = lineDFn(data) as string;
    if (d.search(/NaN/)) {
      console.log('NaN in d');
    }
    return d;
  }, [data, lineDFn]);

  useEffect(() => {
    select(gx.current).call(axisBottom(xScale) as (s: unknown) => void);
  }, [gx, xScale]);

  useEffect(() => {
    select(gy.current).call(axisLeft(yScale) as (s: unknown) => void);
  }, [gy, yScale]);

  return (
    <svg ref={svgRef} className="w-full h-full min-h-96 min-w-full">
      <g ref={gx} transform={`translate(0, ${height - boundaries.bottom})`} />
      <g ref={gy} transform={`translate(${boundaries.left}, 0)`} />
      <path fill="none" d={d} stroke={theme.colors.blue[5]} />
    </svg>
  );
}
