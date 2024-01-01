import { Anchor, Autocomplete, Box, Breadcrumbs, Button, Card, Flex, ScrollArea, Space, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useLazyGetCityCoordinatesQuery } from '../store/weather.api';
import { useAppDispatch, useAppSelector } from '../store';

export function Weather() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector(state => state.weather.apiKey);

  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'house', href: '/' });
    items.push({ title: 'Weather', icon: '', href: '/weather' });
    return items;
  }, []);

  const breadCrumbItems = useMemo(() => {
    return items.map(item => (
      <Anchor key={item.title.toLowerCase()} href={item.href} underline="never">
        <Flex align="center" gap="xs">
          {!item.icon ? null : (
            <Text className="grid place-content-center" style={{ lineHeight: 'normal' }}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </Text>
          )}
          {!item.title ? null : <Text style={{ lineHeight: 'normal' }}>{item.title}</Text>}
        </Flex>
      </Anchor>
    ));
  }, [items]);

  // TODO: @jitu712: Move this code into a search component

  const [trigger, { data, isLoading, isSuccess, isError }] = useLazyGetCityCoordinatesQuery();
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await trigger({ apiKey, city: searchString }).unwrap();
      if (isLoading) setSearchResults([]);
      // if (isSuccess) setSearchResults(data?.map(() => ({ name: '', lat: 0, log: 0 })));
      if (isError) setSearchResults([]);
    };
    fetchData();
  }, [apiKey, data, isError, isLoading, isSuccess, searchString, trigger]);

  // TODO: @jitu712: END: Move this code into a search component

  return (
    <ScrollArea h="100%">
      <Flex direction="column" gap="lg" className="container mx-auto my-lg" px="md">
        <Box>
          <Space />
          <Flex align="center" justify="space-between">
            <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
            {false && (
              <Button
                variant="subtle"
                onClick={() => {
                  //   dispatch(setShouldRefetch(true));
                }}>
                <Flex align="center" gap="sm">
                  <Text className="leading-[normal] flex items-center">
                    <span className="material-symbols-outlined">refresh</span>
                  </Text>
                  <Text fw={500} className="leading-[normal] flex items-center">
                    Refresh
                  </Text>
                </Flex>
              </Button>
            )}
          </Flex>
        </Box>
        <Box>
          <Card className="h-32 grid place-content-center mt-4" withBorder>
            <Text ta="center">Advertisement</Text>
          </Card>
        </Box>
        <Box>
          <Autocomplete data={searchResults} value={searchString} onChange={setSearchString} />
        </Box>
      </Flex>
    </ScrollArea>
  );
}
