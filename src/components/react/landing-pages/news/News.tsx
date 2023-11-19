import '@mantine/carousel/styles.css';
import { Box, Card, Flex, MantineProvider, ScrollArea, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';
import { NewsCategory } from './News.types';
import { LatestNews } from './latest';
import { CategoricalNews } from './categorical';

export function News({ apiKey }: { apiKey: string }) {
  const [categoryList] = useListState<NewsCategory>([
    NewsCategory.Business,
    NewsCategory.Finance,
    NewsCategory.General,
    NewsCategory.Lifestyle,
    NewsCategory.Politics,
    NewsCategory.Technology,
    NewsCategory.World,
  ]);

  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="m-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
            <Box className="grid gap-xl">
              <LatestNews apiKey={apiKey} />
              {categoryList.map(category => (
                <CategoricalNews key={category} apiKey={apiKey} category={category} />
              ))}
            </Box>
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
