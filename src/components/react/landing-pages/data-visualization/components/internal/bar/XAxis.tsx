import { Box, Flex, Text, Tooltip } from '@mantine/core';
import { type ScaleBand } from 'd3';
import { memo, useMemo, useRef } from 'react';
import type { ChartBoundaries } from '../../../types';
import { BAR_GAP } from './constants';
import { useElementSize } from '@mantine/hooks';

function XAxisTextWithTooltipInstance({ boundaries, value }: { value: string; boundaries: ChartBoundaries }) {
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <Tooltip label={value} position="top-start" hidden={!(ref.current && ref.current.scrollWidth > ref.current.clientWidth)} withArrow>
      <Text size="xs" c="dimmed" w={boundaries.bottom - 24} className="rotate-45 origin-top-left cursor-default" truncate="end" ref={ref}>
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
  sortOrder,
  showTicks,
  setSortOrder,
}: {
  xScale: ScaleBand<string>;
  categories: string[];
  svgDimensions: { height: number; width: number };
  boundaries: ChartBoundaries;
  axisLabel: string;
  sortOrder: 'ascending' | 'descending' | null;
  showTicks: boolean;
  setSortOrder: (sortOrder: 'ascending' | 'descending' | null) => void;
}) {
  const { ref: axisLabelTextRef, width: axisLabelWidth } = useElementSize();
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
          {showTicks ? (
            <line
              x1={xOffset}
              x2={xOffset}
              y1={(svgDimensions.height - boundaries.bottom - boundaries.top) * -1}
              y2={0}
              style={{ stroke: 'var(--mantine-color-dimmed)', strokeDasharray: '6 4' }}
            />
          ) : null}
          <line x1={xOffset} x2={xOffset} y1={0} y2={8} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
          <foreignObject x={xOffset} y={16} className="overflow-visible">
            <XAxisTextWithTooltip key={value} value={value} boundaries={boundaries} />
          </foreignObject>
        </g>
      ))}
      <foreignObject
        x={(svgDimensions.width - boundaries.left - boundaries.right) / 2}
        y={boundaries.bottom - boundaries.top - 16}
        width={axisLabelWidth + 40}
        height={24}>
        <Flex
          align="center"
          justify="center"
          w={axisLabelWidth + 40}
          h={24}
          className="cursor-pointer select-none"
          onClick={() => {
            if (sortOrder === 'ascending') {
              setSortOrder('descending');
            } else if (sortOrder === 'descending') {
              setSortOrder(null);
            } else {
              setSortOrder('ascending');
            }
          }}>
          {sortOrder === 'descending' ? (
            <Box w={20} h="100%">
              <Text size="sm">
                <span className="material-symbols-outlined">chevron_left</span>
              </Text>
            </Box>
          ) : null}
          <Text size="sm" c={!sortOrder ? 'dimmed' : undefined} fw="bold" ref={axisLabelTextRef}>
            {axisLabel}
          </Text>
          {sortOrder === 'ascending' ? (
            <Box w={20} h="100%">
              <Text size="sm">
                <span className="material-symbols-outlined">chevron_right</span>
              </Text>
            </Box>
          ) : null}
        </Flex>
      </foreignObject>
    </g>
  );
}
