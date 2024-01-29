import { Box, Flex, ScrollArea } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useMemo } from 'react';
import { HomeCardList } from '../data';
import { HomeCard } from './HomeCard';

export function Home() {
  const cards = useMemo(() => HomeCardList, []);
  return (
    <>
      <ScrollArea h="100%">
        <Flex direction="column" gap="lg" className="container mx-auto my-lg" px="md">
          <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-xl">
            {cards.map((card) => (
              <HomeCard key={card.href} card={card} />
            ))}
          </Box>
        </Flex>
      </ScrollArea>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
