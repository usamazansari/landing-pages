import { type MantineTheme } from '@mantine/core';

export const useScreenSizeWatcher = ({ theme, width }: { theme: MantineTheme; width: number }) => ({
  isNarrowViewport: width < parseFloat(theme.breakpoints.md.match(/\d+/)?.[0] ?? '48') * theme.scale * 16,
});

