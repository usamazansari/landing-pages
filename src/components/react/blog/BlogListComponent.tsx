import { Box, MantineProvider, NavLink } from '@mantine/core';
import '@mantine/core/styles.css';

export function BlogListComponent({ data }: { data: { label: string; icon?: string; href: string }[] }) {
  return (
    <MantineProvider>
      <Box className="grid">
        {data.map(({ label, icon, href }) => (
          <NavLink variant="subtle" key={label} label={label} leftSection={icon && <span className="material-icons">{icon}</span>} href={href} />
        ))}
      </Box>
    </MantineProvider>
  );
}
