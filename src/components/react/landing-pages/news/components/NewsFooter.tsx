import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function NewsFooter() {
  return (
    <>
      <Divider />
      <Box className="grid my-md gap-md">
        <Flex align="center" justify="center" gap="xs">
          <Text>Made by</Text>
          <Anchor href="https://github.com/usamazansari" target="_blank" underline="hover" className="underline-offset-2">
            @usamazansari
          </Anchor>
        </Flex>
        <Flex gap="md" wrap="wrap" align="center" justify="center">
          <Flex direction="column" align="center">
            <Text size="xs" c="dimmed">
              Powered by
            </Text>
            <Anchor href="https://currentsapi.services/en" target="_blank" underline="hover" className="underline-offset-2">
              Currents API <span className="material-icons text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="xs" c="dimmed">
              Layout inspired by
            </Text>
            <Anchor href="https://www.bbc.com/news" target="_blank" underline="hover" className="underline-offset-2">
              BBC News <span className="material-icons text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
