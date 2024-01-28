import { useCallback, useMemo, useState } from 'react';
import type { AxisSortOrder } from '../../../types';
import { ascending, descending, rollup, sum } from 'd3';

export function useDataSorting<DataType extends Record<string, string | number>>({
  data,
  excludeKeyList = [],
  xAxisSortOrder,
  yAxisSortOrder,
}: {
  data: DataType[];
  excludeKeyList?: string[];
  xAxisSortOrder: AxisSortOrder;
  yAxisSortOrder: AxisSortOrder;
}) {
  const [dictionary, setDictionary] = useState<Record<string, [string, number][]>>({});

  const aggregation = useMemo(
    () =>
      rollup(
        data.filter(d => !excludeKeyList.includes(d.category as string)),
        v => sum(v, d => Math.abs(+d.amount)),
        d => d.category as string,
      ),
    [data, excludeKeyList],
  );

  const sortData = useCallback(
    (data: [string, number][]) =>
      !xAxisSortOrder && !yAxisSortOrder
        ? data
        : xAxisSortOrder === 'ascending'
          ? data.slice().sort(([a], [b]) => ascending(a, b))
          : xAxisSortOrder === 'descending'
            ? data.slice().sort(([a], [b]) => descending(a, b))
            : yAxisSortOrder === 'ascending'
              ? data.slice().sort(([, a], [, b]) => ascending(a, b))
              : yAxisSortOrder === 'descending'
                ? data.slice().sort(([, a], [, b]) => descending(a, b))
                : data,
    [xAxisSortOrder, yAxisSortOrder],
  );

  const sortedData = useMemo(() => {
    const cacheKey = `${xAxisSortOrder}-${yAxisSortOrder}`;
    if (dictionary[cacheKey]) {
      return dictionary[cacheKey];
    } else {
      const sortedDataByOrder = sortData([...aggregation.entries()]);
      setDictionary(prevCache => ({ ...prevCache, [cacheKey]: sortedDataByOrder }));
      return sortedDataByOrder;
    }
  }, [aggregation, dictionary, sortData, xAxisSortOrder, yAxisSortOrder]);

  return sortedData;
}
