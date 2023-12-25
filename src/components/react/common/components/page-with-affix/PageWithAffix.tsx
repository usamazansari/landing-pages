import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import React from 'react';

export function PageWithAffix({ nav, main, footer }: { nav: React.ReactNode; main: React.ReactNode; footer: React.ReactNode }) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-10">{nav}</nav>
      <main>{main}</main>
      <footer>{footer}</footer>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <ActionIcon size="xl" variant="filled" radius="xl" onClick={() => scrollTo({ y: 0 })} style={transitionStyles}>
              <span className="material-symbols-outlined">expand_less</span>
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
