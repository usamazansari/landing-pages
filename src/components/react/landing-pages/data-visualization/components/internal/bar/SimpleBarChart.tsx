import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { Box, Flex, HoverCard, Text, rgba, useMantineTheme } from '@mantine/core';
import { useElementSize, useMouse, usePrevious } from '@mantine/hooks';
import { animated, easings, useSpring, useSpringRef } from '@react-spring/web';
import { extent, scaleBand, scaleLinear } from 'd3';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDataSorting } from 'src/components/react/landing-pages/data-visualization/components/internal/bar/SimpleBarChartHooks';
import type { AxisSortOrder, ChartBoundaries } from '../../../types';
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

function DatumRect({ datum, oldDatum }: { datum: BarRectProps; oldDatum?: BarRectProps | undefined }) {
  const theme = useMantineTheme();

  const springRef = useSpringRef();
  const [spring, api] = useSpring(
    () => ({
      ref: springRef,
      from: { x: oldDatum?.x ?? 0 },
      to: { x: datum.x },
      config: {
        duration: 1000,
        easing: easings.easeInOutSine,
      },
    }),
    [oldDatum?.x, datum.x],
  );

  useEffect(() => {
    api.start();
  }, [api, datum.x, oldDatum?.x]);

  return (
    <>
      <animated.rect key={datum.identifier} x={spring.x} y={datum.y} width={datum.width} height={datum.height} fill={rgba(theme.colors.blue[6], 1)} />;
    </>
  );
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
              <Text fw="bold" className="leading-[normal]">
                {bar.category}
              </Text>
              <Text fw="bold" className="font-mono leading-[normal]">
                {bar.amount.toFixed(2)}
              </Text>
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

  const [xAxisSortOrder, setXAxisSortOrder] = useState<AxisSortOrder>(null);
  const [yAxisSortOrder, setYAxisSortOrder] = useState<AxisSortOrder>(null);

  const sortedData = useDataSorting({ data, xAxisSortOrder, yAxisSortOrder, excludeKeyList });

  const categoriesDomain = useMemo(() => sortedData.map(([category]) => category) as string[], [sortedData]);
  const amountDomain = useMemo(() => {
    const [min, max] = extent([...sortedData.map(([, amount]) => amount), 0]) as [number, number];
    const yStep = Math.pow(10, Math.floor(Math.log10(Math.abs(max - min))));
    const minY = Math.floor(min / yStep) * yStep;
    const maxY = Math.ceil(max / yStep) * yStep;
    return [minY, maxY] as [number, number];
  }, [sortedData]);

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
        : sortedData.map(
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
    [boundaries.bottom, sortedData, svgDimensions.height, xScale, yScale],
  );

  const previousBarsRef = usePrevious(bars);

  const mantineBars = useMemo(
    () =>
      sortedData.map(([category, amount]) => ({
        category,
        amount,
      })),
    [sortedData],
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

  const oldDatum = useCallback((identifier: string) => previousBarsRef?.find(d => d.identifier === identifier), [previousBarsRef]);

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
              setSortOrder={o => {
                setXAxisSortOrder(o);
                setYAxisSortOrder(null);
              }}
            />
            <YAxis
              yScale={yScale}
              axisLabel={'Amount'}
              svgDimensions={svgDimensions}
              boundaries={boundaries}
              sortOrder={yAxisSortOrder}
              setSortOrder={o => {
                setYAxisSortOrder(o);
                setXAxisSortOrder(null);
              }}
            />
          </g>
        ) : null}
        <g id="data-group">
          {bars.map(datum => (
            <DatumRect key={datum.identifier} datum={datum} oldDatum={oldDatum(datum.identifier)} />
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
