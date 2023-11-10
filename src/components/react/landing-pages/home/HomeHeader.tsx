import { Burger, Divider, Flex, MantineProvider, Switch, UnstyledButton, useMantineColorScheme, type MantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { HomeDrawer } from './HomeDrawer';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';

function DarkModeSwitch({ setColorScheme }: { setColorScheme: (scheme: MantineColorScheme) => void }): React.ReactNode {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Switch
      size="lg"
      onLabel={<span className="text-sm material-icons">light_mode</span>}
      offLabel={<span className="text-sm material-icons">dark_mode</span>}
      defaultChecked={colorScheme === 'light'}
      onChange={() => {
        toggleColorScheme();
        setColorScheme(colorScheme);
      }}
    />
  );
}

export function HomeHeader(): React.ReactNode {
  const [opened, { open, close }] = useDisclosure();
  const [colorScheme, setColorScheme] = useState('auto' as MantineColorScheme);

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
          <Flex gap="md">
            <HomeDrawer opened={opened} close={close} />
            <Burger
              opened={opened}
              onClick={() => {
                open();
              }}
              size="sm"
              type="button"
              title="Toggle Sidebar"
              style={{ alignSelf: 'center' }}
            />
            <UnstyledButton component="a" href="/" fw={500} fz="xl" className="leading-normal">
              Landing Pages
            </UnstyledButton>
          </Flex>
          <Flex>
            <DarkModeSwitch setColorScheme={setColorScheme} />
          </Flex>
        </Flex>
        <Divider />
      </ErrorBoundary>
    </MantineProvider>
  );
}
