import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Box, Flex, HoverCard, Text, rgba, useMantineTheme } from '@mantine/core';
import { useElementSize, useMouse } from '@mantine/hooks';
import { extent, rollup, scaleBand, scaleLinear, sum } from 'd3';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChartBoundaries } from '../../../types';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { BAR_GAP } from './constants';
import { findDiscreteValuesUsingDivideAndConquer } from './helpers';

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
                fill="transparent"
                stroke="var(--mantine-color-dimmed)"
                strokeDasharray="6 4"
              />
              <foreignObject
                x={bars[hoveredRectIndex]?.x - 4}
                y={boundaries.top}
                width={bars[hoveredRectIndex]?.width + 8}
                height={svgDimensions.height - boundaries.bottom - boundaries.top}>
                <HoverCard position="right-start" shadow="sm">
                  <HoverCard.Target>
                    <Box className="w-full h-full"></Box>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Flex align="center" gap="md">
                      <Text>{categoriesDomain[hoveredRectIndex]}</Text>
                      <Text className="font-mono">{getAmountAtCategory(categoriesDomain[hoveredRectIndex])?.toFixed(2)}</Text>
                    </Flex>
                  </HoverCard.Dropdown>
                </HoverCard>
              </foreignObject>
            </>
          )}
        </g>
      </svg>
      <BarChart h={450} data={mantineBars} dataKey="category" series={[{ name: 'amount', color: 'blue.6' }]} tickLine="xy" tooltipAnimationDuration={200} />
    </Flex>
  );
}
