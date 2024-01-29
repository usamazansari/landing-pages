import { DarkModeSwitch } from '@landing-pages/react/common/components';
import { Box, Divider, Flex, Text, UnstyledButton } from '@mantine/core';

export function HomeHeader() {
  return (
    <Box className="grid">
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          <UnstyledButton component="a" href="/" className="leading-8">
            <Text size="xl" fw={700}>
              Landing Pages
            </Text>
          </UnstyledButton>
        </Flex>
        <Flex>
          <DarkModeSwitch />
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
}
