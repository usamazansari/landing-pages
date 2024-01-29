import { Box, Flex } from '@mantine/core';
import { useMemo } from 'react';
import { HomeCardList } from '../data';
import { HomeCard } from './HomeCard';

export function Home() {
  const cards = useMemo(() => HomeCardList, []);
  return (
    <>
      <Flex direction="column" gap="lg" className="container mx-auto my-lg" px="md">
        <Box className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-xl">
          {cards.map((card) => (
            <HomeCard key={card.href} card={card} />
          ))}
        </Box>
      </Flex>
    </>
  );
}
