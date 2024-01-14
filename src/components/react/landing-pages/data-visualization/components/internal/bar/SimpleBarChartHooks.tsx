import { useCallback, useMemo, useState } from 'react';
import type { AxisSortOrder } from '../../../types';
import { ascending, descending } from 'd3';

export function useDataSorting(data: [string, number][], xAxisSortOrder: AxisSortOrder, yAxisSortOrder: AxisSortOrder) {
  const [dictionary, setDictionary] = useState<Record<string, [string, number][]>>({});

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
      const sortedDataByOrder = sortData(data);
      setDictionary(prevCache => ({ ...prevCache, [cacheKey]: sortedDataByOrder }));
      return sortedDataByOrder;
    }
  }, [data, dictionary, sortData, xAxisSortOrder, yAxisSortOrder]);

  return sortedData;
}
