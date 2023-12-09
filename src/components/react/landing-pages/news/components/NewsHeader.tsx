import { DarkModeSwitch } from '@landing-pages/react/common/components';
import { Box, Burger, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { NewsDrawer } from './internal/NewsDrawer';
import { useAvailableNewsCategoriesApi } from '../hooks';

export function NewsHeader() {
  const [opened, setOpened] = useState(false);
  const response = useAvailableNewsCategoriesApi();

  return (
    <Box className="grid">
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          <NewsDrawer
            opened={opened}
            close={() => {
              setOpened(false);
            }}
            response={response}
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
          <UnstyledButton component="a" href="/" className="leading-8">
            News
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
