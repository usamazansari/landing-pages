import { Box, Flex, Text } from '@mantine/core';
import { type ScaleLinear } from 'd3';
import { useMemo } from 'react';
import type { ChartBoundaries } from '../../../types';
import { BAR_GAP } from './constants';
import { useElementSize } from '@mantine/hooks';

export function YAxis({
  yScale,
  axisLabel,
  svgDimensions,
  boundaries,
  sortOrder,
  setSortOrder,
}: {
  yScale: ScaleLinear<number, number>;
  axisLabel: string;
  svgDimensions: { height: number; width: number };
  boundaries: ChartBoundaries;
  sortOrder: 'ascending' | 'descending' | null;
  setSortOrder: (sortOrder: 'ascending' | 'descending' | null) => void;
}) {
  const { ref: axisLabelTextRef, width: axisLabelWidth } = useElementSize();
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
            value: point.toLocaleString('en', { maximumFractionDigits: 2, notation: 'compact', compactDisplay: 'short' }),
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
      <foreignObject
        height={axisLabelWidth + 60}
        width={24}
        x={boundaries.left * -1 + 8}
        y={(svgDimensions.height - boundaries.bottom - boundaries.top) / 2 - axisLabelWidth / 2}>
        <Flex
          align="center"
          className="cursor-pointer select-none h-full w-full"
          direction="column"
          justify="center"
          onClick={() => {
            if (sortOrder === 'ascending') {
              setSortOrder('descending');
            } else if (sortOrder === 'descending') {
              setSortOrder(null);
            } else {
              setSortOrder('ascending');
            }
          }}>
          {sortOrder === 'ascending' ? (
            <Box h={20} w="100%">
              <Text size="sm">
                <span className="material-symbols-outlined">expand_less</span>
              </Text>
            </Box>
          ) : null}
          <Text size="sm" c={!sortOrder ? 'dimmed' : undefined} fw="bold" ref={axisLabelTextRef} className="[writing-mode:vertical-rl] rotate-180">
            {axisLabel}
          </Text>
          {sortOrder === 'descending' ? (
            <Box h={20} w="100%">
              <Text size="sm">
                <span className="material-symbols-outlined">expand_more</span>
              </Text>
            </Box>
          ) : null}
        </Flex>
      </foreignObject>
    </g>
  );
}
