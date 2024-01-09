import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Flex, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { extent, rollup, scaleBand, scaleLinear, sum, type ScaleBand } from 'd3';
import { useMemo } from 'react';
import type { ChartBoundaries } from '../../../types';

const BAR_GAP = 8;

function XAxis({
  xScale,
  categories,
  svgHeight,
  boundaries,
}: {
  xScale: ScaleBand<string>;
  categories: string[];
  svgHeight: number;
  boundaries: ChartBoundaries;
}) {
  const range = useMemo(() => xScale.range(), [xScale]);

  const ticks = useMemo(
    () =>
      categories.map((category, i) => ({
        value: category,
        xOffset: boundaries.left + xScale.bandwidth() * i + xScale.bandwidth() / 2 - BAR_GAP / 2,
      })),
    [boundaries.left, categories, xScale],
  );

  return (
    <g transform={`translate(0, ${svgHeight - boundaries.bottom})`}>
      <path d={['M', range[0] - BAR_GAP, 0, 'L', range[1], 0].join(' ')} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
      {ticks.map(({ value, xOffset }) => (
        <g key={value}>
          <line x1={xOffset} x2={xOffset} y1={0} y2={4} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
          <foreignObject x={xOffset} y={8} className="overflow-visible">
            <Tooltip label={value} position="top" withArrow>
              <Text size="xs" c="dimmed" w={boundaries.bottom} className="rotate-45 origin-top-left cursor-default" truncate="end">
                {value}
              </Text>
            </Tooltip>
          </foreignObject>
        </g>
      ))}
    </g>
  );
}

// function YAxis({ xScale, yScale, boundaries }: { xScale: ScaleBand<string>; yScale: ScaleLinear<number, number>; boundaries: { margin: ChartBoundaries; padding: ChartBoundaries; }; }) {
//   return (
//   )
// }

export function SimpleBarChart<DataType extends Record<string, string | number>>({
  data,
  excludeKeyList = [],
  boundaries = { left: 60, right: 0, top: 0, bottom: 40 },
}: {
  data: DataType[];
  excludeKeyList?: string[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, width, height } = useElementSize();
  const theme = useMantineTheme();

  const categoryAmountAggregation = useMemo(
    () =>
      rollup(
        data.filter(d => !excludeKeyList.includes(d.category as string)),
        v => sum(v, d => Math.abs(+d.amount)),
        d => d.category,
      ),
    [data, excludeKeyList],
  );

  const categoriesDomain = useMemo(() => [...categoryAmountAggregation.keys()] as string[], [categoryAmountAggregation]);
  const amountDomain = useMemo(() => extent(categoryAmountAggregation.values()) as number[], [categoryAmountAggregation]);

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(categoriesDomain)
        .range([boundaries.left, width - boundaries.right]),
    [boundaries.left, boundaries.right, categoriesDomain, width],
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
      ([...categoryAmountAggregation.entries()] as [string, number][]).map(([category, amount]) => ({
        x: xScale(category),
        y: yScale(amount),
        width: xScale.bandwidth() - BAR_GAP,
        height: height - boundaries.bottom - yScale(amount),
        identifier: category.toLowerCase().replace(/\s/g, '-').replace(/-+/g, '-'),
      })),
    [categoryAmountAggregation, boundaries.bottom, height, xScale, yScale],
  );

  const mantineBars = useMemo(
    () =>
      [...categoryAmountAggregation.entries()].map(([category, amount]) => ({
        category,
        amount,
      })),
    [categoryAmountAggregation],
  );

  return (
    <Flex direction="column" gap="lg">
      <svg ref={svgRef} className="w-full min-h-[300px]">
        <g id="axes">
          <XAxis xScale={xScale} categories={categoriesDomain} svgHeight={height} boundaries={boundaries} />
          {/* <YAxis xScale={xScale} yScale={yScale} boundaries={boundaries} /> */}
        </g>
        <g id="data">
          {bars.map(({ x, y, width, height, identifier }) => (
            <rect
              key={identifier}
              x={x}
              y={y}
              width={width}
              height={height}
              // fill={rgba(theme.colors.blue[6], 0.5)}
              fill={theme.colors.blue[6]}
              // stroke={theme.colors.blue[6]}
            />
          ))}
        </g>
      </svg>
      <BarChart h={450} data={mantineBars} dataKey="category" series={[{ name: 'amount', color: 'blue.6' }]} tickLine="xy" tooltipAnimationDuration={200} />
    </Flex>
  );
}
