import { Burger, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DarkModeSwitch, Provider } from '../../../common/components';
import { NewsDrawer } from './NewsDrawer';

export function NewsHeader({ categories }: { categories: string[] }) {
  const [opened, setOpened] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // NOTE: @usamazansari: Wait for hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  return !hydrated ? null : (
    <Provider>
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          <NewsDrawer
            opened={opened}
            close={() => {
              setOpened(false);
            }}
            categories={categories}
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
    </Provider>
  );
}
