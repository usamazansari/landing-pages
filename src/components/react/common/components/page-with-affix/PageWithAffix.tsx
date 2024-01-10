import { ActionIcon, Affix, Box, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import React from 'react';

export function PageWithAffix({ nav, main, footer }: { nav: React.ReactNode; main: React.ReactNode; footer: React.ReactNode }) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Box className="min-h-screen grid gap-lg grid-rows-[auto_1fr_auto]">
      <nav className="sticky top-0 left-0 right-0 z-10" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
        {nav}
      </nav>
      <main>{main}</main>
      <footer style={{ backgroundColor: 'var(--mantine-color-body)' }}>{footer}</footer>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <ActionIcon size="xl" variant="filled" radius="xl" onClick={() => scrollTo({ y: 0 })} style={transitionStyles}>
              <span className="material-symbols-outlined">expand_less</span>
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </Box>
  );
}
