import { DarkModeSwitch } from '@landing-pages/react/common/components';
import { Box, Burger, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { DataVisualizationDrawer } from './internal/DataVisualizationDrawer';

export function DataVisualizationHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <Box className="grid">
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md">
        <Flex gap="md">
          <DataVisualizationDrawer
            opened={opened}
            close={() => {
              setOpened(false);
            }}
          />
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
          <UnstyledButton component="a" href="/news" className="leading-8">
            Data Visualization
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
