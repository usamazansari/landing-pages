import { Box, Divider, Text } from '@mantine/core';

export function NewsSection({ category = '', children }: { category: string; children: React.ReactNode }) {
  return (
    <Box className="grid gap-md">
      <Divider
        label={
          <Text component="a" href={`/news/${category}`} size="lg" fw="bold" c="blue">
            {!category.length ? 'LATEST NEWS' : category.toUpperCase()}
          </Text>
        }
        labelPosition="left"
      />
      {children}
    </Box>
  );
}
