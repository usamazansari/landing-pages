import { DarkModeSwitch } from '@landing-pages/react/common/components';
import { Box, Burger, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

export function WeatherHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <Box className="grid">
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          <Burger
            opened={opened}
            onClick={() => {
              setOpened(true);
            }}
            size="sm"
            type="button"
            title="Toggle Sidebar"
            style={{ alignSelf: 'center' }}
          />
          <UnstyledButton component="a" href="/weather" className="leading-8">
            Weather
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
