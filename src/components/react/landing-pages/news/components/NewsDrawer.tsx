import { Box, Divider, Drawer, NavLink, ScrollArea, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useScreenSizeWatcher } from '../../../common/hooks';

export function NewsDrawer({ categories = [], opened, close }: { categories: string[]; opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });
  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title className="cursor-default">
            <Text>Categories</Text>
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Divider />
        <Drawer.Body p={0}>
          <Box className="grid">
            {categories
              .sort((a, b) => a.localeCompare(b))
              .map(c => (
                <NavLink key={c} label={c.toUpperCase()} href={`/news/${c.toLowerCase().replace(/\s/g, '-')}`} />
              ))}
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

