import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function NewsFooter() {
  return (
    <Box className="grid">
      <Divider />
      <Flex gap="xs" px="md" py="lg" justify="space-between" align="center">
        <Flex gap="xs" direction="column">
          <Flex gap="xs" align="center">
            <Text>Powered by</Text>
            <Anchor href="https://currentsapi.services/en" target="_blank" underline="hover" className="underline-offset-2">
              Currents API <span className="material-icons text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
          <Flex gap="xs" align="center">
            <Text>Inspired by</Text>
            <Anchor href="https://www.bbc.com/news" target="_blank" underline="hover" className="underline-offset-2">
              BBC <span className="material-icons text-[1rem]">open_in_new</span>
            </Anchor>
          </Flex>
        </Flex>

        <Flex gap="xs" px="md" align="center">
          <Text>Made by</Text>
          <Anchor href="https://github.com/usamazansari" target="_blank" underline="hover" className="underline-offset-2">
            @usamazansari
          </Anchor>
        </Flex>
      </Flex>
    </Box>
  );
}
