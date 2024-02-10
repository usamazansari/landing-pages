import { Anchor, Box, Divider, Flex, Text } from '@mantine/core';

export function DataVisualizationFooter() {
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
        <Flex gap="md" wrap="wrap" align="center" justify="center"></Flex>
      </Box>
    </>
  );
}
