import { Box, Button, Card, Flex, MantineProvider, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

export function Home() {
  const pages = useMemo(
    () => [
      {
        description: 'Stay updated with the latest headlines, breaking stories, and in-depth reporting on current events from around the world.',
        icon: 'newspaper',
        label: 'News',
        href: '/news',
      },
      {
        description:
          'Access your financial accounts, manage transactions, and explore banking services securely from the convenience of your computer or mobile device.',
        icon: 'account_balance',
        label: 'Bank',
        href: '/bank',
      },
      {
        description: 'Shop for a wide range of products and services online, browse through catalogs, and make purchases with ease.',
        icon: 'shopping_cart',
        label: 'E-Commerce',
        href: '/e-commerce',
      },
      {
        description: 'Experience captivating storytelling through scrolling web pages, combining visuals and text to engage and inform users in a dynamic way.',
        icon: 'local_library',
        label: 'Scrollytelling',
        href: '/scrollytelling',
      },
      {
        description: 'Manage your user account and authentication settings, ensuring secure access to various online platforms and services.',
        icon: 'fingerprint',
        label: 'Auth',
        href: '/auth',
      },
      {
        description: "Explore a curated selection of content, whether it's art, literature, or any other collection of items of interest.",
        icon: 'photo_album',
        label: 'Collection',
        href: '/collection',
      },
      {
        description: 'Plan your next adventure, book flights and accommodations, and discover travel tips and recommendations to make your trip unforgettable.',
        icon: 'flight',
        label: 'Travel',
        href: '/travel',
      },
      {
        description: 'Check current weather conditions, forecasts, and related information for your location or any place of interest.',
        icon: 'cloud',
        label: 'Weather',
        href: '/weather',
      },
      {
        description: 'Upload, view, and share videos on a platform that connects people through multimedia content.',
        icon: 'movie',
        label: 'Video Sharing',
        href: '/video-sharing',
      },
      {
        description: 'Engage in real-time text or video conversations with friends, family, or colleagues through online chat services or applications.',
        icon: 'chat',
        label: 'Chat',
        href: '/chat',
      },
      {
        description: 'Access expert insights, product reviews, and the latest tech trends to make informed decisions on your tech purchases.',
        icon: 'devices',
        label: 'Tech Review',
        href: '/tech-review',
      },
      {
        description: 'Explore a visual collection of images, photographs, or artwork, often organized around specific themes or topics.',
        icon: 'wallpaper',
        label: 'Image Gallery',
        href: '/image-gallery',
      },
      {
        description: 'Stay connected with friends, followers, and the world by sharing and viewing posts, photos, and updates on social networking platforms.',
        icon: 'feed',
        label: 'Social Media Feed',
        href: '/social-media-feed',
      },
      {
        description:
          'Read articles, personal insights, and expertise on various topics, often written by individuals or organizations, providing valuable information and perspectives.',
        icon: 'article',
        label: 'Blog',
        href: '/posts',
      },
    ],
    [],
  );
  return (
    <MantineProvider>
      <Flex direction="column" gap="lg">
        <Title order={2}>The Many Facets of the Web</Title>
        <Box className={'grid grid-cols-3 gap-4'}>
          {pages.map(page => (
            <Card key={page.href} withBorder shadow="sm" padding="lg" radius="md">
              <Flex direction="column" justify="space-between" className="h-full">
                <Card.Section p="md">{/* <span className="material-icons">{page.icon}</span> */}</Card.Section>

                <Flex direction="column" gap="md">
                  <Flex align="center" gap="xs">
                    <Text c="gray.6" className=" leading-normal flex items-center">
                      <span className="material-icons">{page.icon}</span>
                    </Text>
                    <Text fw="bold" size="lg" className="leading-normal flex items-center" c="gray.6">
                      {page.label}
                    </Text>
                  </Flex>
                  <Text size="sm" c="gray.6">
                    {page.description}
                  </Text>
                  <Button
                    variant="filled"
                    color="gray"
                    component="a"
                    href={page.href}
                    className="self-end justify-self-end"
                    rightSection={<span className="material-icons">chevron_right</span>}>
                    Explore {page.label}
                  </Button>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Box>
      </Flex>
    </MantineProvider>
  );
}
