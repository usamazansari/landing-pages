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
  boundaries = { left: 100, right: 10, top: 10, bottom: 100 },
}: {
  data: DataType[];
  excludeKeyList?: string[];
  boundaries?: ChartBoundaries;
}) {
  const { ref: svgRef, ...svgDimensions } = useElementSize();
  const { ref: overlayRef, x } = useMouse();
  const [hoveredBar, setHoveredBar] = useState<(BarRectProps & BarDatum) | null>(null);
  const [xAxisSortOrder, setXAxisSortOrder] = useState<'ascending' | 'descending' | null>(null);
  const [yAxisSortOrder, setYAxisSortOrder] = useState<'ascending' | 'descending' | null>(null);

  const [defaultSortedBars, setDefaultSortedBars] = useState<[string, number][]>([]);
  const [ascendingSortedBars, setAscendingSortedBars] = useState<[string, number][]>([]);
  const [descendingSortedBars, setDescendingSortedBars] = useState<[string, number][]>([]);

  const categoryAmountAggregation = useMemo(
    () =>
      rollup(
        data.filter(d => !excludeKeyList.includes(d.category as string)),
        v => sum(v, d => Math.abs(+d.amount)),
        d => d.category,
      ),
    [data, excludeKeyList],
  );

  const sortedBars = useMemo(
    () => (xAxisSortOrder === 'ascending' ? ascendingSortedBars : xAxisSortOrder === 'descending' ? descendingSortedBars : defaultSortedBars),
    [defaultSortedBars, ascendingSortedBars, descendingSortedBars, xAxisSortOrder],
  );

  const categoriesDomain = useMemo(() => sortedBars.map(([category]) => category) as string[], [sortedBars]);
  const amountDomain = useMemo(() => extent([...sortedBars.map(([, amount]) => amount ?? 0)]) as [number, number], [sortedBars]);

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
        : sortedBars.map(
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
    [boundaries.bottom, sortedBars, svgDimensions.height, xScale, yScale],
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

  useEffect(() => {
    setDefaultSortedBars([...categoryAmountAggregation.entries()] as [string, number][]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (xAxisSortOrder === 'ascending') {
      setAscendingSortedBars(defaultSortedBars.slice().sort(([a], [b]) => a.localeCompare(b)));
    }
  }, [defaultSortedBars, xAxisSortOrder]);

  useEffect(() => {
    if (xAxisSortOrder === 'descending') {
      setDescendingSortedBars(defaultSortedBars.slice().sort(([a], [b]) => b.localeCompare(a)));
    }
  }, [defaultSortedBars, xAxisSortOrder]);

  return (
    <Flex direction="column" gap="lg">
      <svg ref={svgRef} className="w-full min-h-[450px]">
        {svgDimensions.height && svgDimensions.width ? (
          <g id="axes-group">
            <XAxis
              xScale={xScale}
              axisLabel={'Category'}
              categories={categoriesDomain}
              svgDimensions={svgDimensions}
              boundaries={boundaries}
              sortOrder={xAxisSortOrder}
              setSortOrder={setXAxisSortOrder}
            />
            <YAxis
              yScale={yScale}
              axisLabel={'Amount'}
              svgDimensions={svgDimensions}
              boundaries={boundaries}
              sortOrder={yAxisSortOrder}
              setSortOrder={setYAxisSortOrder}
            />
          </g>
        ) : null}
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
