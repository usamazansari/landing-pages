import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import type { INews } from '../../types';
import { NewsItem } from './NewsItem';

export function NewsCarousel({ newsItemList = [] }: { newsItemList: INews[] }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <Box className="grid grid-cols-1">
      {!newsItemList.length ? (
        <Box className="grid place-content-center h-full w-full">
          <Flex align="center">
            <Text className="grid place-content-center" style={{ lineHeight: 'normal' }}>
              <span className="material-symbols-outlined">error</span>
            </Text>
            <Text c="dimmed" style={{ lineHeight: 'normal' }}>
              No news available
            </Text>
          </Flex>
        </Box>
      ) : (
        <Carousel
          align="start"
          slideGap="md"
          slideSize={isNarrow ? '85%' : '35%'}
          dragFree
          loop
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}>
          {newsItemList.map(newsItem => (
            <Carousel.Slide key={newsItem.id}>
              <NewsItem newsItem={newsItem} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Box>
  );
}
