import { Text, Tooltip } from '@mantine/core';
import { type ScaleBand } from 'd3';
import { useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../../types';
import { BAR_GAP } from './constants';

function XAxisTextWithTooltip({ boundaries, value }: { value: string; boundaries: ChartBoundaries }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isOverflowing = useMemo(() => (ref.current?.scrollWidth ?? 0) > (ref.current?.clientWidth ?? 0), []);
  return (
    <Tooltip label={value} position="top-start" hidden={!isOverflowing} withArrow>
      <Text size="xs" c="dimmed" w={boundaries.bottom} className="rotate-45 origin-top-left cursor-default" truncate="end" ref={ref}>
        {value}
      </Text>
    </Tooltip>
  );
}

export function XAxis({
  xScale,
  categories,
  svgDimensions,
  boundaries,
}: {
  xScale: ScaleBand<string>;
  categories: string[];
  svgDimensions: { height: number; width: number };
  boundaries: ChartBoundaries;
}) {
  const ticks = useMemo(
    () =>
      !svgDimensions.width
        ? []
        : categories.map((category, i) => ({
            value: category,
            xOffset: xScale.bandwidth() * i + xScale.bandwidth() / 2 - BAR_GAP / 2,
          })),
    [categories, svgDimensions.width, xScale],
  );

  return (
    <g transform={`translate(${boundaries.left}, ${svgDimensions.height - boundaries.bottom})`}>
      <path
        d={['M', BAR_GAP * -2, 0, 'L', svgDimensions.width - boundaries.right - boundaries.left + BAR_GAP, 0].join(' ')}
        style={{ stroke: 'var(--mantine-color-dimmed)' }}
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value}>
          <line x1={xOffset} x2={xOffset} y1={0} y2={4} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
          <foreignObject x={xOffset} y={8} className="overflow-visible">
            <XAxisTextWithTooltip key={value} value={value} boundaries={boundaries} />
          </foreignObject>
        </g>
      ))}
    </g>
  );
}
