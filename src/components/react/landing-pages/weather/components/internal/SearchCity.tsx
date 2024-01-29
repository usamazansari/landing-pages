import { isFetchBaseQueryError, isSerializedError } from '@landing-pages/react/common/components';
import { Box, Combobox, Flex, InputBase, Loader, Text, useCombobox } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { setSelectedCity, useLazySearchCityQuery, useAppDispatch, useAppSelector } from '../../store';
import type { Location } from '../../types';

export function SearchCity() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.weather.geoCodingAPIKey);

  const [searchCity, { data, isLoading, isSuccess, isError, error }] = useLazySearchCityQuery({});
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString, setDebouncedSearchString] = useDebouncedState('', 250);
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = searchResults.map((item) => (
    <Combobox.Option value={item.name as string} key={`${item.latitude}_${item.longitude}`}>
      <Box className="grid gap-xs">
        <Text ta="left" size="sm">
          {item.name}
        </Text>
        <Text ta="left" c="dimmed" size="xs">
          {item.country}
        </Text>
      </Box>
    </Combobox.Option>
  ));

  const printError = useCallback(
    (error: FetchBaseQueryError | SerializedError | undefined) =>
      isFetchBaseQueryError(error) ? (error.data as { message: string }).message : isSerializedError(error) ? error.message : 'Unknown error!',
    [],
  );

  useEffect(() => {
    setDebouncedSearchString(searchString);
  }, [searchString, setDebouncedSearchString]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchString.length >= 3) {
        try {
          const cities = await searchCity({ apiKey, city: debouncedSearchString }).unwrap();
          setSearchResults(cities ?? []);
        } catch (e) {
          console.log(e);
          setSearchResults([]);
        }
      }
    };
    fetchData();
  }, [apiKey, searchCity, debouncedSearchString]);

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(value) => {
        const selectedCity = searchResults.find((item) => item.name.toLowerCase() === value.toLowerCase());
        dispatch(setSelectedCity(selectedCity ?? null));
        combobox.closeDropdown();
      }}>
      <Combobox.DropdownTarget>
        <InputBase
          placeholder="Enter at least three characters to search"
          value={searchString}
          rightSection={isLoading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => {
            combobox.openDropdown();
          }}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {isLoading ? (
            <Combobox.Options>
              <Combobox.Empty>
                <Flex align="center" justify="center" gap="xs">
                  <Loader size={18} />
                  <Text size="sm">Loading...</Text>
                </Flex>
              </Combobox.Empty>
            </Combobox.Options>
          ) : isError ? (
            <Combobox.Options>
              <Combobox.Empty>
                <Text c="red" ta="left" size="sm">
                  {printError(error)}
                </Text>
              </Combobox.Empty>
            </Combobox.Options>
          ) : isSuccess ? (
            !data?.length ? (
              <Combobox.Options>
                <Combobox.Empty>
                  <Text ta="left" size="sm">
                    No results found.
                  </Text>
                </Combobox.Empty>
              </Combobox.Options>
            ) : (
              options
            )
          ) : (
            <Combobox.Options>
              <Combobox.Empty>
                <Text ta="left" size="sm">
                  Search for a city name to show the results.
                </Text>
              </Combobox.Empty>
            </Combobox.Options>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
