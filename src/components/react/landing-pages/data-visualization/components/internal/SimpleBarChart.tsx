import { useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { extent } from 'd3';
import { useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../types';

export function SimpleBarChart<DataType extends Record<string, string | number>>({
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

  // const xScale = useMemo(
  //   () =>
  //     scaleLinear()
  //       .domain()
  //       .range([boundaries.left, width - boundaries.right]),
  //   [boundaries.left, boundaries.right, dateDomain, width],
  // );

  // const yScale = useMemo(
  //   () =>
  //     scaleLinear()
  //       .domain(amountDomain)
  //       .range([height - boundaries.bottom, boundaries.top]),
  //   [amountDomain, boundaries.bottom, boundaries.top, height],
  // );

  return (
    <svg ref={svgRef} className="w-full h-full">
      <g ref={gx} transform={`translate(0, ${height - boundaries.bottom})`} />
      <g ref={gy} transform={`translate(${boundaries.left}, 0)`} />
      {/* <path fill="none" d={d} stroke={theme.colors.blue[5]} /> */}
    </svg>
  );
}
