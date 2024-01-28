import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
import { setWeatherAPIKey, setGeocodingAPIKey, useWeatherAppDispatch, useGeoCodingAppDispatch } from '../store';
import { WeatherHeader } from './WeatherHeader';
import { Weather } from './Weather';
import { WeatherFooter } from './WeatherFooter';

export function WeatherPage({ geoCodingAPIKey, weatherAPIKey }: { geoCodingAPIKey: string; weatherAPIKey: string }) {
  const geoCodingDispatch = useGeoCodingAppDispatch();
  const weatherDispatch = useWeatherAppDispatch();

  useEffect(() => {
    weatherDispatch(setWeatherAPIKey(weatherAPIKey));
  }, [weatherDispatch, geoCodingDispatch, weatherAPIKey]);

  useEffect(() => {
    geoCodingDispatch(setGeocodingAPIKey(geoCodingAPIKey));
  }, [weatherDispatch, geoCodingDispatch, geoCodingAPIKey]);

  return <PageWithAffix nav={<WeatherHeader />} main={<Weather />} footer={<WeatherFooter />} />;
}
