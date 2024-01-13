import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Box, Flex, HoverCard, Text, rgba, useMantineTheme } from '@mantine/core';
import { useElementSize, useMouse } from '@mantine/hooks';
import { extent, rollup, scaleBand, scaleLinear, sum } from 'd3';
import { useEffect, useMemo, useState } from 'react';
import type { ChartBoundaries } from '../../../types';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { BAR_GAP } from './constants';

type BarRectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  identifier: string;
};

type BarDatum = {
  category: string;
  amount: number;
};

function DatumRect({ datum }: { datum: BarRectProps }) {
  const theme = useMantineTheme();
  return <rect key={datum.identifier} x={datum.x} y={datum.y} width={datum.width} height={datum.height} fill={rgba(theme.colors.blue[6], 1)} />;
}

function RectTooltip({
  bar,
  boundaries,
  svgDimensions,
}: {
  bar: (BarRectProps & BarDatum) | null;
  boundaries: ChartBoundaries;
  svgDimensions: { width: number; height: number };
}) {
  const theme = useMantineTheme();
  return bar === null ? null : (
    <>
      <rect
        x={bar.x - BAR_GAP / 2}
        y={boundaries.top}
        width={bar.width + BAR_GAP}
        height={svgDimensions.height - boundaries.bottom - boundaries.top}
        fill={rgba(theme.colors.gray[1], 0.1)}
        stroke="var(--mantine-color-dimmed)"
        strokeDasharray="6 4"
      />
      <foreignObject x={bar.x - 4} y={boundaries.top} width={bar.width + 8} height={svgDimensions.height - boundaries.bottom - boundaries.top}>
        <HoverCard position="right-start" shadow="sm" withArrow>
          <HoverCard.Target>
            <Box className="w-full h-full"></Box>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Flex align="center" gap="md">
              <Text>{bar.category}</Text>
              <Text className="font-mono">{bar.amount.toFixed(2)}</Text>
            </Flex>
          </HoverCard.Dropdown>
        </HoverCard>
      </foreignObject>
    </>
  );
}

export function SimpleBarChart<DataType extends Record<string, string | number>>({
  data,
  excludeKeyList = [],
  boundaries = { left: 80, right: 20, top: 10, bottom: 70 },
}: {
  data: DataType[];
  excludeKeyList?: string[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, ...svgDimensions } = useElementSize();
  const { ref: overlayRef, x } = useMouse();
  const [hoveredBar, setHoveredBar] = useState<(BarRectProps & BarDatum) | null>(null);

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
        : ([...categoryAmountAggregation.entries()] as [string, number][]).map(
            ([category, amount]) =>
              ({
                x: xScale(category) as number,
                y: yScale(amount) as number,
                width: xScale.bandwidth() - BAR_GAP,
                height: svgDimensions.height - boundaries.bottom - yScale(amount),
                identifier: category,
                category,
                amount,
              }) as BarRectProps & BarDatum,
          ),
    [categoryAmountAggregation, boundaries.bottom, svgDimensions.height, xScale, yScale],
  );

  const mantineBars = useMemo(
    () =>
      [...categoryAmountAggregation.entries()].map(([category, amount]) => ({
        category,
        amount,
      })),
    [categoryAmountAggregation],
  );

  useEffect(() => {
    if (bars.length !== 0) {
      const barWidth = (svgDimensions.width - boundaries.left - boundaries.right) / bars.length;
      const hoveredBarIndex = Math.floor(x / barWidth);
      if (hoveredBarIndex >= 0 && hoveredBarIndex < bars.length) {
        setHoveredBar(bars[hoveredBarIndex]);
      }
    }
  }, [bars, boundaries.left, boundaries.right, svgDimensions.width, x]);

  return (
    <Flex direction="column" gap="lg">
      <svg ref={svgRef} className="w-full min-h-[450px]">
        <g id="axes-group">
          <XAxis xScale={xScale} categories={categoriesDomain} svgDimensions={svgDimensions} boundaries={boundaries} />
          <YAxis yScale={yScale} amountDomain={amountDomain} svgDimensions={svgDimensions} boundaries={boundaries} />
        </g>
        <g id="data-group">
          {bars.map(datum => (
            <DatumRect key={datum.identifier} datum={datum} />
          ))}
          <rect
            ref={overlayRef}
            id="overlay"
            x={boundaries.left}
            y={boundaries.top}
            width={svgDimensions.width - boundaries.left - boundaries.right}
            height={svgDimensions.height - boundaries.top - boundaries.bottom}
            fill="transparent"
          />
        </g>
        <g id="tooltip-group">
          <RectTooltip bar={hoveredBar} boundaries={boundaries} svgDimensions={svgDimensions} />
        </g>
      </svg>
      <BarChart
        h={450}
        data={mantineBars}
        dataKey="category"
        series={[{ name: 'amount', color: 'blue.6' }]}
        tickLine="xy"
        tooltipAnimationDuration={200}
        withLegend
        withTooltip
      />
    </Flex>
  );
}
