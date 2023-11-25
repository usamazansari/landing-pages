import { Box, Divider, Drawer, NavLink, ScrollArea, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';
import { useScreenSizeWatcher } from '../../../common/hooks';

export function HomeDrawer({ opened, close }: { opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });

  const menuItems = useMemo(
    () => [
      { icon: 'home', label: 'Home', href: '/' },
      { icon: 'newspaper', label: 'News', href: '/news' },
      { icon: 'account_balance', label: 'Bank', href: '/bank' },
      { icon: 'shopping_cart', label: 'E-Commerce', href: '/e-commerce' },
      { icon: 'local_library', label: 'Scrollytelling', href: '/scrollytelling' },
      { icon: 'fingerprint', label: 'Auth', href: '/auth' },
      { icon: 'photo_album', label: 'Collection', href: '/collection' },
      { icon: 'flight', label: 'Travel', href: '/travel' },
      { icon: 'cloud', label: 'Weather', href: '/weather' },
      { icon: 'movie', label: 'Video Sharing', href: '/video-sharing' },
      { icon: 'chat', label: 'Chat', href: '/chat' },
      { icon: 'devices', label: 'Tech Review', href: '/tech-review' },
      { icon: 'wallpaper', label: 'Image Gallery', href: '/image-gallery' },
      { icon: 'feed', label: 'Social Media Feed', href: '/social-media-feed' },
      { icon: 'article', label: 'Blog', href: '/posts' },
    ],
    [],
  );

  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title className="cursor-default">
            <Text>Navigation</Text>
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Divider />
        <Drawer.Body p={0}>
          <Box className="grid">
            {menuItems.map(({ href, icon, label }) => (
              <NavLink key={label} label={label} leftSection={<span className="material-icons">{icon}</span>} href={href} />
            ))}
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
