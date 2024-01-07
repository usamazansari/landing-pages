import { rgba, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { axisBottom, axisLeft, extent, rollup, scaleBand, scaleLinear, select, sum } from 'd3';
import { useEffect, useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../types';

export function SimpleBarChart<DataType extends Record<string, string | number>>({
  data,
  excludeKeyList = [],
  boundaries = { left: 40, right: 10, top: 10, bottom: 40 },
}: {
  data: DataType[];
  excludeKeyList?: string[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, width, height } = useElementSize();
  const theme = useMantineTheme();
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const aggregatedCategories = useMemo(
    () =>
      rollup(
        data.filter(d => !excludeKeyList.includes(d.category as string)),
        v => sum(v, d => Math.abs(+d.amount)),
        d => d.category,
      ),
    [data],
  );

  const categoriesDomain = useMemo(() => [...aggregatedCategories.keys()] as string[], [aggregatedCategories]);
  const amountDomain = useMemo(() => extent(aggregatedCategories.values()) as number[], [aggregatedCategories]);

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(categoriesDomain)
        .range([boundaries.left, width - boundaries.right]),
    [categoriesDomain, boundaries.left, boundaries.right, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(amountDomain)
        .range([height - boundaries.bottom, boundaries.top]),
    [amountDomain, boundaries.bottom, boundaries.top, height],
  );

  const bars = useMemo(
    () =>
      ([...aggregatedCategories.entries()] as [string, number][]).map(([category, amount]) => ({
        x: xScale(category),
        y: yScale(amount),
        width: xScale.bandwidth() - 2,
        height: height - boundaries.bottom - yScale(amount),
        identifier: category.toLowerCase().replace(/\s/g, '-').replace(/-+/g, '-'),
      })),
    [aggregatedCategories, boundaries.bottom, height, xScale, yScale],
  );

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
      {bars.map(({ x, y, width, height, identifier }) => (
        <rect
          key={identifier}
          x={x}
          y={y}
          width={width}
          height={height}
          // fill={rgba(theme.colors.blue[5], 0.5)}
          fill={theme.colors.blue[5]}
          // stroke={theme.colors.blue[5]}
        />
      ))}
    </svg>
  );
}
