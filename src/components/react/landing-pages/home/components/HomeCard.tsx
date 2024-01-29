import { Box, Button, Card, Flex, Text } from '@mantine/core';
import type { IHomeCard } from '../types';

export function HomeCard({ card }: { card: IHomeCard }) {
  return (
    <Card withBorder shadow="sm" radius="md" className="grid md:grid-cols-[1fr_auto] justify-between gap-md">
      <Box className="grid gap-md">
        <Flex align="center" className="gap-md">
          <Text c="blue">
            <span className="material-symbols-outlined text-6xl">{card.icon}</span>
          </Text>
          <Text fw="bold" fz="lg" c="blue" className="leading-[normal]">
            {card.label}
          </Text>
        </Flex>
        <Text c="dimmed">{card.description}</Text>
      </Box>

      <Button
        variant="light"
        component="a"
        href={card.href}
        className="self-end justify-self-end"
        rightSection={<span className="material-symbols-outlined">chevron_right</span>}>
        Explore {card.label}
      </Button>
    </Card>
  );
}
