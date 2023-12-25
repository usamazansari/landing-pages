import { Switch, useMantineColorScheme } from '@mantine/core';
import { useState, useEffect } from 'react';

export function DarkModeSwitch(): React.ReactNode {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return !isHydrated ? null : (
    <Switch
      size="lg"
      onLabel={<span className="text-sm material-symbols-outlined">light_mode</span>}
      offLabel={<span className="text-sm material-symbols-outlined">dark_mode</span>}
      defaultChecked={colorScheme === 'light'}
      onChange={() => {
        toggleColorScheme();
      }}
    />
  );
}
