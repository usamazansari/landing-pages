import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function WeatherFooter() {
  return (
    <>
      <Divider />
      <Box className="grid my-md gap-md">
        <Flex align="center" justify="center" gap="xs">
          <Text>Made by</Text>
          <Anchor href="https://github.com/Jitu712" target="_blank" underline="hover" className="underline-offset-2">
            @jitu712
          </Anchor>
        </Flex>
        <Flex gap="md" wrap="wrap" align="center" justify="center">
          <Flex direction="column" align="center">
            <Text size="xs" c="dimmed">
              Powered by
            </Text>
            <Anchor href="https://openweathermap.org/api" target="_blank" underline="hover" className="underline-offset-2">
            openweathermap API <span className="material-symbols-outlined text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="xs" c="dimmed">
              Layout inspired by
            </Text>
            <Anchor href="https://www.bbc.com/news" target="_blank" underline="hover" className="underline-offset-2">
              BBC News <span className="material-symbols-outlined text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
