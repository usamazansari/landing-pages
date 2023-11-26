import { Divider, Flex, UnstyledButton } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { DarkModeSwitch, Provider } from '../../../common/components';

export function HomeHeader(): React.ReactNode {
  const [hydrated, setHydrated] = useState(false);

  // NOTE: @usamazansari: Wait for hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  return !hydrated ? null : (
    <Provider>
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          <UnstyledButton component="a" href="/" className="leading-8">
            Landing Pages
          </UnstyledButton>
        </Flex>
        <Flex>
          <DarkModeSwitch />
        </Flex>
      </Flex>
      <Divider />
    </Provider>
  );
}
