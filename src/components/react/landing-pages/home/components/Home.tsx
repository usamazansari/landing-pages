import { Box, Flex, ScrollArea, Title } from '@mantine/core';
import { useMemo } from 'react';
import { Provider } from '@landing-pages/react/common/components';
import { HomeCardList } from '../data';
import { HomeCard } from './HomeCard';

export function Home() {
  const cards = useMemo(() => HomeCardList, []);
  return (
    <Provider>
      <ScrollArea h="100%" className="p-4">
        <Flex direction="column" gap="lg" className="container mx-auto">
          <Title order={2}>The Many Facets of the Web</Title>
          <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-xl">
            {cards.map(card => (
              <HomeCard key={card.href} card={card} />
            ))}
          </Box>
        </Flex>
      </ScrollArea>
    </Provider>
  );
}
