import { Divider, Flex, MantineProvider, UnstyledButton, type MantineColorScheme, Switch, useMantineColorScheme, ActionIcon, Tooltip } from '@mantine/core';
import { useState } from 'react';
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

export function NewsHeader() {
  const [colorScheme, setColorScheme] = useState('auto' as MantineColorScheme);

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
          <Flex gap="md">
            <Tooltip label="Back to home page" withArrow withinPortal>
              <ActionIcon component="a" href="/" variant="transparent" color="gray">
                <span className="material-icons">chevron_left</span>
              </ActionIcon>
            </Tooltip>
            <UnstyledButton component="a" href="/news" fw={500} fz="xl" className="leading-normal">
              News
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
