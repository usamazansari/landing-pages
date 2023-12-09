import { Badge, Button, Card, Flex, Image, Text } from '@mantine/core';
import type { IHomeCard } from '../types';

export function HomeCard({ card }: { card: IHomeCard }) {
  return (
    <Card withBorder shadow="sm" radius="md" className="grid grid-rows-[4fr_1fr]">
      <Card.Section>
        <Image src={card.image} h={320} alt={card.label} />
      </Card.Section>

      <Flex direction="column" justify="space-between" className="h-full" mt="lg">
        <Flex direction="column" gap="md">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="xs">
              <Text className=" leading-[normal] flex items-center">
                <span className="material-icons">{card.icon}</span>
              </Text>
              <Text fw={500} className="leading-[normal] flex items-center">
                {card.label}
              </Text>
            </Flex>
            <Badge variant="dot" color={!card.activeUsers ? 'gray' : 'green'}>
              {card.activeUsers.toFixed()} ONLINE
            </Badge>
          </Flex>
          <Text c="dimmed" size="sm" lineClamp={2}>
            {card.description}
          </Text>
          <Button
            variant="light"
            component="a"
            href={card.href}
            className="self-end justify-self-end"
            rightSection={<span className="material-icons">chevron_right</span>}>
            Explore {card.label}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
