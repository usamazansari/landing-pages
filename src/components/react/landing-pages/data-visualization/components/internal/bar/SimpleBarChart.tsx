import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Box, Flex, Text, Tooltip, rgba, useMantineTheme } from '@mantine/core';
import { useElementSize, useMouse } from '@mantine/hooks';
import { extent, rollup, scaleBand, scaleLinear, sum, type ScaleBand, type ScaleLinear } from 'd3';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { findDiscreteValuesUsingDivideAndConquer } from 'src/components/react/landing-pages/data-visualization/utils';
import type { ChartBoundaries } from '../../../types';

const BAR_GAP = 4;

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

function XAxis({
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

function YAxis({
  yScale,
  svgDimensions,
  boundaries,
}: {
  yScale: ScaleLinear<number, number>;
  svgDimensions: { height: number; width: number };
  amountDomain: [number, number];
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
      {ticks.map(({ value, yOffset }, index) =>
        value ? (
          <g key={value}>
            <line x1={-8} x2={0} y1={yOffset} y2={yOffset} style={{ stroke: 'var(--mantine-color-dimmed)' }} />
            <line
              x1={0}
              x2={svgDimensions.width - boundaries.left - boundaries.right + BAR_GAP}
              y1={yOffset}
              y2={yOffset}
              style={{ stroke: 'var(--mantine-color-dimmed)', strokeDasharray: index !== 0 ? '6 4' : 'unset' }}
            />
            <foreignObject x={boundaries.left * -1 - 16} y={yOffset - 8} className="overflow-visible">
              <Text size="xs" c="dimmed" w={boundaries.left} ta="right" className="cursor-default">
                {value}
              </Text>
            </foreignObject>
          </g>
        ) : null,
      )}
    </g>
  );
}

export function SimpleBarChart<DataType extends Record<string, string | number>>({
  data,
  excludeKeyList = [],
  boundaries = { left: 60, right: 20, top: 10, bottom: 100 },
}: {
  data: DataType[];
  excludeKeyList?: string[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, ...svgDimensions } = useElementSize();
  const { ref: rectOverlayRef, x } = useMouse();
  const theme = useMantineTheme();
  const [hoveredRectIndex, setHoveredRectIndex] = useState<number | null>(null);

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
  const amountDomain = useMemo(() => {
    const [min, max] = extent([...categoryAmountAggregation.values(), 0]) as [number, number];
    const yStep = Math.pow(10, Math.floor(Math.log10(Math.abs(max - min))));
    const minY = Math.floor(min / yStep) * yStep;
    const maxY = Math.ceil(max / yStep) * yStep;
    return [minY, maxY] as [number, number];
  }, [categoryAmountAggregation]);

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(categoriesDomain)
        .range([boundaries.left, svgDimensions.width - boundaries.right]),
    [boundaries.left, boundaries.right, categoriesDomain, svgDimensions.width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(amountDomain)
        .range([svgDimensions.height - boundaries.bottom, boundaries.top]),
    [amountDomain, boundaries.bottom, boundaries.top, svgDimensions.height],
  );

  const bars = useMemo(
    () =>
      !svgDimensions.height
        ? []
        : ([...categoryAmountAggregation.entries()] as [string, number][]).map(([category, amount]) => ({
            x: xScale(category) as number,
            y: yScale(amount) as number,
            width: xScale.bandwidth() - BAR_GAP,
            height: svgDimensions.height - boundaries.bottom - yScale(amount),
            identifier: category,
          })),
    [categoryAmountAggregation, boundaries.bottom, svgDimensions.height, xScale, yScale],
  );

  const barsX = useMemo(() => bars.map(({ x }) => x), [bars]);

  const mantineBars = useMemo(
    () =>
      [...categoryAmountAggregation.entries()].map(([category, amount]) => ({
        category,
        amount,
      })),
    [categoryAmountAggregation],
  );

  const getAmountAtCategory = useCallback((category: string) => categoryAmountAggregation.get(category), [categoryAmountAggregation]);

  useEffect(() => {
    const [hoveredBarX] = findDiscreteValuesUsingDivideAndConquer(x, barsX);
    const i = barsX.findIndex(bX => bX === hoveredBarX) ?? null;
    console.log({ hoveredBarX, i });
    setHoveredRectIndex(i);
  }, [barsX, x]);

  return (
    <Flex direction="column" gap="lg">
      <svg ref={svgRef} className="w-full min-h-[450px]">
        <g id="axes-group">
          <XAxis xScale={xScale} categories={categoriesDomain} svgDimensions={svgDimensions} boundaries={boundaries} />
          <YAxis yScale={yScale} amountDomain={amountDomain} svgDimensions={svgDimensions} boundaries={boundaries} />
        </g>
        <g id="data-group">
          {bars.map(({ x, y, width, height, identifier }) => (
            <rect key={identifier} x={x} y={y} width={width} height={height} fill={rgba(theme.colors.blue[6], 1)} />
          ))}
          <rect
            ref={rectOverlayRef}
            x={boundaries.left}
            y={boundaries.top}
            width={svgDimensions.width - boundaries.left - boundaries.right}
            height={svgDimensions.height - boundaries.top - boundaries.bottom}
            fill="transparent"
          />
        </g>
        <g id="tooltip-group">
          {hoveredRectIndex === null ? null : (
            <>
              <rect
                x={bars[hoveredRectIndex]?.x - 4}
                y={boundaries.top}
                width={bars[hoveredRectIndex]?.width + 8}
                height={svgDimensions.height - boundaries.bottom - boundaries.top}
                fill={rgba(theme.colors.gray[6], 0.1)}
                stroke={theme.colors.gray[6]}
                strokeDasharray="6 4"
              />
              <foreignObject
                x={bars[hoveredRectIndex]?.x - 4}
                y={boundaries.top}
                width={bars[hoveredRectIndex]?.width + 8}
                height={svgDimensions.height - boundaries.bottom - boundaries.top}>
                <Tooltip
                  label={
                    <Box className="grid gap-0">
                      <Flex gap="sm" align="center">
                        <Text>Category</Text>
                        <Text>{categoriesDomain[hoveredRectIndex]}</Text>
                      </Flex>
                      <Flex gap="sm" align="center">
                        <Text>Amount</Text>
                        <Text className="font-mono">{getAmountAtCategory(categoriesDomain[hoveredRectIndex])?.toFixed(2)}</Text>
                      </Flex>
                    </Box>
                  }
                  position="right-start">
                  <Box className="w-full h-full"></Box>
                </Tooltip>
              </foreignObject>
            </>
          )}
        </g>
      </svg>
      <BarChart h={450} data={mantineBars} dataKey="category" series={[{ name: 'amount', color: 'blue.6' }]} tickLine="xy" tooltipAnimationDuration={200} />
    </Flex>
  );
}
