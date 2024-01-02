import { isFetchBaseQueryError, isSerializedError } from '@landing-pages/react/common/components';
import { Combobox, Flex, InputBase, Loader, Text, useCombobox } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { setSelectedCity, useAppDispatch, useAppSelector, useLazySearchCityQuery } from '../../store';
import type { Location } from '../../types';

export function SearchCity() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector(state => state.weather.apiKey);

  const [searchCity, { data, isLoading, isSuccess, isError, error }] = useLazySearchCityQuery({});
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString, setDebouncedSearchString] = useDebouncedState('', 250);
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = searchResults.map(item => (
    <Combobox.Option value={item.value as string} key={item.value as string}>
      {item.name}
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
      onOptionSubmit={value => {
        const selectedCity = searchResults.find(item => item.name.toLowerCase() === value.toLowerCase());
        dispatch(setSelectedCity(selectedCity ?? null));
        combobox.closeDropdown();
      }}>
      <Combobox.DropdownTarget>
        <InputBase
          value={searchString}
          rightSection={isLoading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          onChange={e => {
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
                  <Text>Loading...</Text>
                </Flex>
              </Combobox.Empty>
            </Combobox.Options>
          ) : isSuccess ? (
            !data?.length ? (
              <Combobox.Options>
                <Combobox.Empty>No results found.</Combobox.Empty>
              </Combobox.Options>
            ) : (
              options
            )
          ) : isError ? (
            <Combobox.Options>
              <Combobox.Empty>
                <Text c="red" ta="left" size="sm">
                  {printError(error)}
                </Text>
              </Combobox.Empty>
            </Combobox.Options>
          ) : null}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
