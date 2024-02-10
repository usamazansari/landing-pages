import { isFetchBaseQueryError, isSerializedError } from '@landing-pages/react/common/components';
import { ActionIcon, Box, Combobox, Flex, InputBase, Loader, Skeleton, Text, useCombobox } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { setSelectedCity, useAppDispatch, useAppSelector, useLazyGetCountriesListQuery, useLazySearchCityQuery } from '../../store';
import type { City, Country, Forecast } from '../../types';

export function SearchCity() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.weather.geoCodingAPIKey);

  const [searchCity, { data: cityData, isLoading: isCityLoading, isSuccess: isCitySuccess, isError: isCityError, error: cityError }] = useLazySearchCityQuery(
    {},
  );
  const [
    getCountriesList,
    { data: countriesListData, isLoading: isCountriesListLoading, isSuccess: isCountriesListSuccess, isError: isCountriesListError, error: countriesListError },
  ] = useLazyGetCountriesListQuery({});
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString, setDebouncedSearchString] = useDebouncedState('', 250);
  const [searchResults, setSearchResults] = useState<{ city: City; country?: Country; forecast?: Forecast }[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

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
          const countries = await getCountriesList({ countryCodeListStringified: cities.map((city) => city.country).join(',') }).unwrap();
          setSearchResults(
            cities.map((city) => ({
              city,
              country: countries.find((country) => country.cca2 === city.country || country.cca3 === city.country),
            })),
          );
        } catch (e) {
          console.log(e);
          setSearchResults([]);
        }
      }
    };
    fetchData();
  }, [apiKey, searchCity, debouncedSearchString, getCountriesList]);

  const options = searchResults.map(({ city, country }) => (
    <Combobox.Option value={city.name as string} key={`${city.latitude}_${city.longitude}`}>
      <Box className="grid grid-rows-2 grid-cols-2 items-center">
        <Text ta="left" size="sm" className="[grid-row:1/2] [grid-column:1/2]">
          {city.name}
        </Text>
        {isCountriesListLoading ? (
          <Text ta="left" size="sm" className="[grid-row:2/3] [grid-column:1/2]">
            <Skeleton height={16} radius="xs" />
          </Text>
        ) : isCountriesListError ? (
          <Text ta="left" c="red" size="sm" className="[grid-row:2/3] [grid-column:1/2]">
            {printError(countriesListError)}
          </Text>
        ) : isCountriesListSuccess ? (
          !countriesListData?.length ? null : (
            <Flex align="center" gap="xs">
              <Text ta="left" c="dimmed" size="xs" className="[grid-row:2/3] [grid-column:1/2]">
                {country?.name.common}
              </Text>
            </Flex>
          )
        ) : null}
        <Box className="[grid-row:1/3] [grid-column:2/3] justify-self-end">
          <Text c="yellow" className="leading-[normal] grid place-content-center">
            <span className="material-symbols-outlined">clear_day</span>
          </Text>
        </Box>
      </Box>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(value) => {
        const selectedCity = searchResults.find((item) => item.city.name.toLowerCase() === value.toLowerCase())?.city ?? null;
        dispatch(setSelectedCity(selectedCity));
        combobox.closeDropdown();
      }}>
      <Combobox.DropdownTarget>
        <InputBase
          placeholder="Enter at least three characters to search"
          value={searchString}
          rightSection={isCityLoading ? <Loader size={18} /> : <Combobox.Chevron />}
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
          {isCityLoading ? (
            <Combobox.Options>
              <Combobox.Empty>
                <Flex align="center" justify="center" gap="xs">
                  <Loader size={18} />
                  <Text size="sm">Loading...</Text>
                </Flex>
              </Combobox.Empty>
            </Combobox.Options>
          ) : isCityError ? (
            <Combobox.Options>
              <Combobox.Empty>
                <Text c="red" ta="left" size="sm">
                  {printError(cityError)}
                </Text>
              </Combobox.Empty>
            </Combobox.Options>
          ) : isCitySuccess ? (
            !cityData?.length ? (
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
                  Enter 3 or more characters to search.
                </Text>
              </Combobox.Empty>
            </Combobox.Options>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
