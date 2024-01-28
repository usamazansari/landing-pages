import { useScreenSizeWatcher } from '@landing-pages/react/common/hooks';
import { Box, CloseButton, Divider, Drawer, Flex, ScrollArea, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export function DataVisualizationDrawer({ opened, close }: { opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {}, [filterText]);

  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header p={0}>
          <Flex direction="column" className="w-full">
            <Flex align="center" gap="md" className="pr-xs">
              <Drawer.Title className="cursor-default">
                <Flex align="center" gap="xs" p="md">
                  <Text className="grid place-content-center" style={{ lineHeight: 'normal' }}>
                    <span className="material-symbols-outlined">category</span>
                  </Text>
                  <Text fw={500} style={{ lineHeight: 'normal' }}>
                    Visualization types
                  </Text>
                </Flex>
              </Drawer.Title>
              <Drawer.CloseButton />
            </Flex>
            <Box className="px-md pb-md">
              <TextInput
                value={filterText}
                rightSection={!filterText ? <span className="material-symbols-outlined">search</span> : <CloseButton onClick={() => setFilterText('')} />}
                onChange={e => {
                  setFilterText(e.currentTarget.value);
                }}
                placeholder="Search visualization types"
              />
            </Box>
            <Divider />
          </Flex>
        </Drawer.Header>
        <Drawer.Body p={0} className="relative"></Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
