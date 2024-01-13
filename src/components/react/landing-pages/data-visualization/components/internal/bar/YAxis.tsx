import { Text } from '@mantine/core';
import { type ScaleLinear } from 'd3';
import { useMemo } from 'react';
import type { ChartBoundaries } from '../../../types';
import { BAR_GAP } from './constants';

export function YAxis({
  yScale,
  axisLabel,
  svgDimensions,
  boundaries,
}: {
  yScale: ScaleLinear<number, number>;
  axisLabel: string;
  svgDimensions: { height: number; width: number };
  boundaries: ChartBoundaries;
}) {
  const yAxisPoints = useMemo(() => {
    const [min, max] = yScale.domain();
    const yStep = Math.pow(10, Math.floor(Math.log10(Math.abs(max - min))));
    const output = [];
    for (let i = min; i <= max; i += yStep) {
      output.push(i);
    }
    return output;
  }, [yScale]);

  const ticks = useMemo(
    () =>
      !svgDimensions.height
        ? []
        : yAxisPoints.map((point, i) => ({
            value: point.toFixed(2),
            yOffset: ((svgDimensions.height - boundaries.bottom - boundaries.top) / (yAxisPoints.length - 1)) * (yAxisPoints.length - 1 - i),
          })),
    [boundaries.bottom, boundaries.top, svgDimensions.height, yAxisPoints],
  );

  return (
    <g transform={`translate(${boundaries.left}, ${boundaries.top})`}>
      <path
        d={['M', BAR_GAP * -1, 0, 'L', BAR_GAP * -1, svgDimensions.height - boundaries.bottom].join(' ')}
        style={{ stroke: 'var(--mantine-color-dimmed)' }}
      />
      {ticks.map(({ value, yOffset }, index) => (
        <g key={value}>
          <line x1={-12} x2={BAR_GAP * -1} y1={yOffset} y2={yOffset} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
          <line
            x1={BAR_GAP * -1}
            x2={svgDimensions.width - boundaries.left - boundaries.right + BAR_GAP}
            y1={yOffset}
            y2={yOffset}
            style={{ stroke: 'var(--mantine-color-dimmed)', strokeDasharray: index !== 0 ? '6 4' : 'unset' }}
          />
          <foreignObject x={boundaries.left * -1 - 16} y={yOffset - 8} className="overflow-visible">
            <Text size="xs" c="dimmed" w={boundaries.left} ta="right" fw="bold" className="cursor-default font-mono">
              {value}
            </Text>
          </foreignObject>
        </g>
      ))}
      <foreignObject x={boundaries.left * -1 + 8} y={(svgDimensions.height - boundaries.bottom - boundaries.top) / 2} className="overflow-visible">
        <Text className="-rotate-90 origin-center" size="sm" c="dimmed" fw="bold">
          {axisLabel}
        </Text>
      </foreignObject>
    </g>
  );
}
