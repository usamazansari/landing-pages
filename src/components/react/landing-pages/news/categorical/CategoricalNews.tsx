import { Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ErrorCard } from '../../../error-boundary';
import { NewsCategory } from '../News.types';
import { useNewsCategoryApi } from '../useNewsApi';
import { NewsCarousel, NewsSection, NewsSkeleton } from '../common';

export function CategoricalNews({ apiKey, category }: { apiKey: string; category: NewsCategory }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const { data, isError, isLoading, isSuccess, error } = useNewsCategoryApi({ apiKey, category });

  return (
    <NewsSection name={category}>
      {isLoading ? (
        <Box className="grid gap-xl grid-cols-1 md:grid-cols-3">
          <NewsSkeleton />
          {!isNarrow ? (
            <>
              <NewsSkeleton />
              <NewsSkeleton />
            </>
          ) : null}
        </Box>
      ) : null}
      {isSuccess ? <NewsCarousel newsItemList={data?.news} /> : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSection>
  );
}
