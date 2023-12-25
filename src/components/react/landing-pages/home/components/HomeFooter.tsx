import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function HomeFooter() {
  return (
    <Box className="grid">
      <Divider />
      <Flex gap="xs" px="md" justify="flex-end" align="center" className="h-16">
        <Text>Made by</Text>
        <Anchor href="https://github.com/usamazansari" target="_blank" underline="hover" className="underline-offset-2 dark:text-color-danger-fg">
          @usamazansari
        </Anchor>
      </Flex>
    </Box>
  );
}