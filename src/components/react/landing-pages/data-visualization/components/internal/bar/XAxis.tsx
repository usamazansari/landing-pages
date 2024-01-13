import { Text, Tooltip } from '@mantine/core';
import { type ScaleBand } from 'd3';
import { memo, useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../../types';
import { BAR_GAP } from './constants';

function XAxisTextWithTooltipInstance({ boundaries, value }: { value: string; boundaries: ChartBoundaries }) {
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <Tooltip label={value} position="top-start" hidden={!(ref.current && (ref.current.scrollWidth ?? 0) > (ref.current.clientWidth ?? 0))} withArrow>
      <Text size="xs" c="dimmed" w={boundaries.bottom} className="rotate-45 origin-top-left cursor-default" truncate="end" ref={ref}>
        {value}
      </Text>
    </Tooltip>
  );
}

const XAxisTextWithTooltip = memo(XAxisTextWithTooltipInstance);

export function XAxis({
  xScale,
  categories,
  svgDimensions,
  boundaries,
  axisLabel,
}: {
  xScale: ScaleBand<string>;
  categories: string[];
  svgDimensions: { height: number; width: number };
  boundaries: ChartBoundaries;
  axisLabel: string;
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
      <foreignObject
        x={(svgDimensions.width - boundaries.left - boundaries.right) / 2}
        y={boundaries.bottom - boundaries.top - 16}
        className="overflow-visible">
        <Text size="sm" c="dimmed" fw="bold">
          {axisLabel}
        </Text>
      </foreignObject>
    </g>
  );
}
