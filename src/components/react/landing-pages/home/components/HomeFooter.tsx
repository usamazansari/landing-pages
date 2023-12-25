import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function HomeFooter() {
  return (
    <>
      <Divider />
      <Box className="grid my-md">
        <Flex align="center" justify="center" gap="xs">
          <Text>Made by</Text>
          <Anchor href="https://github.com/usamazansari" target="_blank" underline="hover" className="underline-offset-2 dark:text-color-danger-fg">
            @usamazansari
          </Anchor>
        </Flex>
      </Box>
    </>
  );
}
