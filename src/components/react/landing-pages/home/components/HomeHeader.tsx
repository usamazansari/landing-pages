import { Burger, Divider, Flex, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { DarkModeSwitch, Provider } from '../../../common/components';
import { HomeDrawer } from './HomeDrawer';

export function HomeHeader(): React.ReactNode {
  // const [opened, { open, close }] = useDisclosure();
  // const [isHydrated, setIsHydrated] = useState(false);

  // useEffect(() => {
  //   setIsHydrated(true);
  // }, []);

  // return !isHydrated ? null : (
  return (
    <Provider>
      <Flex gap="md" align="center" justify="space-between" py="lg" px="md" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        <Flex gap="md">
          {/* <HomeDrawer opened={opened} close={close} />
          <Burger opened={opened} onClick={open} size="sm" type="button" title="Toggle Sidebar" style={{ alignSelf: 'center' }} /> */}
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
