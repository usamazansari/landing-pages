import { Badge, Box, Button, Card, Flex, Image, MantineProvider, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

interface PageCard {
  description: string;
  icon: string;
  label: string;
  href: string;
  activeUsers: number;
  image: string;
}

function LandingPageCard({ activeUsers, description, href, icon, image, label }: PageCard) {
  return (
    <Card withBorder shadow="sm" radius="md" className="grid grid-rows-[4fr_1fr]">
      <Card.Section>
        <Image src={image} h={320} alt={label} />
      </Card.Section>

      <Flex direction="column" justify="space-between" className="h-full" mt="lg">
        <Flex direction="column" gap="md">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="xs">
              <Text className=" leading-normal flex items-center">
                <span className="material-icons">{icon}</span>
              </Text>
              <Text fw={500} className="leading-normal flex items-center">
                {label}
              </Text>
            </Flex>
            <Badge variant="dot" color={!activeUsers ? 'gray' : 'green'}>
              {activeUsers.toFixed()} ONLINE
            </Badge>
          </Flex>
          <Text c="dimmed" size="sm" lineClamp={2}>
            {description}
          </Text>
          <Button
            variant="light"
            component="a"
            href={href}
            className="self-end justify-self-end"
            rightSection={<span className="material-icons">chevron_right</span>}>
            Explore {label}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export function Home() {
  const pages = useMemo(
    () =>
      [
        {
          description: 'Stay updated with the latest headlines, breaking stories, and in-depth reporting on current events from around the world.',
          icon: 'newspaper',
          label: 'News',
          href: '/news',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_1280.jpg',
        },
        {
          description:
            'Access your financial accounts, manage transactions, and explore banking services securely from the convenience of your computer or mobile device.',
          icon: 'account_balance',
          label: 'Bank',
          href: '/bank',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2015/09/15/15/53/bank-notes-941246_1280.jpg',
        },
        {
          description: 'Shop for a wide range of products and services online, browse through catalogs, and make purchases with ease.',
          icon: 'shopping_cart',
          label: 'E-Commerce',
          href: '/e-commerce',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2021/11/22/20/20/online-6817350_1280.jpg',
        },
        {
          description:
            'Experience captivating storytelling through scrolling web pages, combining visuals and text to engage and inform users in a dynamic way.',
          icon: 'local_library',
          label: 'Scrollytelling',
          href: '/scrollytelling',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2017/04/13/19/40/old-2228518_1280.jpg',
        },
        {
          description: 'Manage your user account and authentication settings, ensuring secure access to various online platforms and services.',
          icon: 'fingerprint',
          label: 'Auth',
          href: '/auth',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2017/09/19/16/00/cyber-security-2765707_1280.jpg',
        },
        {
          description: "Explore a curated selection of content, whether it's art, literature, or any other collection of items of interest.",
          icon: 'photo_album',
          label: 'Collection',
          href: '/collection',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2014/12/04/15/53/photomontage-556806_1280.jpg',
        },
        {
          description:
            'Plan your next adventure, book flights and accommodations, and discover travel tips and recommendations to make your trip unforgettable.',
          icon: 'flight',
          label: 'Travel',
          href: '/travel',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727_1280.jpg',
        },
        {
          description: 'Check current weather conditions, forecasts, and related information for your location or any place of interest.',
          icon: 'cloud',
          label: 'Weather',
          href: '/weather',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2015/09/23/08/16/thunder-953118_1280.jpg',
        },
        {
          description: 'Upload, view, and share videos on a platform that connects people through multimedia content.',
          icon: 'movie',
          label: 'Video Sharing',
          href: '/video-sharing',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2020/09/14/17/45/tv-5571609_1280.jpg',
        },
        {
          description: 'Engage in real-time text or video conversations with friends, family, or colleagues through online chat services or applications.',
          icon: 'chat',
          label: 'Chat',
          href: '/chat',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2023/02/04/17/28/chat-7767693_1280.jpg',
        },
        {
          description: 'Access expert insights, product reviews, and the latest tech trends to make informed decisions on your tech purchases.',
          icon: 'devices',
          label: 'Tech Review',
          href: '/tech-review',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_1280.jpg',
        },
        {
          description: 'Explore a visual collection of images, photographs, or artwork, often organized around specific themes or topics.',
          icon: 'wallpaper',
          label: 'Image Gallery',
          href: '/image-gallery',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg',
        },
        {
          description:
            'Stay connected with friends, followers, and the world by sharing and viewing posts, photos, and updates on social networking platforms.',
          icon: 'feed',
          label: 'Social Media Feed',
          href: '/social-media-feed',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2018/09/23/08/21/balloons-3696902_1280.jpg',
        },
        {
          description:
            'Read articles, personal insights, and expertise on various topics, often written by individuals or organizations, providing valuable information and perspectives.',
          icon: 'article',
          label: 'Blog',
          href: '/posts',
          activeUsers: Math.random() * 15,
          image: 'https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_1280.jpg',
        },
      ] as PageCard[],
    [],
  );
  return (
    <MantineProvider>
      <Flex direction="column" gap="lg">
        <Title order={2}>The Many Facets of the Web</Title>
        <Box className={'grid grid-cols-3 gap-4'}>
          {pages.map(page => (
            <LandingPageCard key={page.href} {...page} />
          ))}
        </Box>
      </Flex>
    </MantineProvider>
  );
}
