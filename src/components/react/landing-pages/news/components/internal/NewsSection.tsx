import { Box, Divider, Text } from '@mantine/core';

export function NewsSection({ name = '', children }: { name: string; children: React.ReactNode }) {
  return (
    <Box className="grid gap-md">
      <Divider
        label={
          <Text size="lg" fw="bold">
            {!name.length ? 'LATEST NEWS' : name.toUpperCase()}
          </Text>
        }
        labelPosition="left"
      />
      {children}
    </Box>
  );
}
