import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
import { setGeoCodingAPIKey, setWeatherAPIKey, useAppDispatch } from '../store';
import { Weather } from './Weather';
import { WeatherFooter } from './WeatherFooter';
import { WeatherHeader } from './WeatherHeader';

export function WeatherPage({ geoCodingAPIKey, weatherAPIKey }: { geoCodingAPIKey: string; weatherAPIKey: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWeatherAPIKey(weatherAPIKey));
  }, [dispatch, weatherAPIKey]);

  useEffect(() => {
    dispatch(setGeoCodingAPIKey(geoCodingAPIKey));
  }, [dispatch, geoCodingAPIKey]);

  return <PageWithAffix nav={<WeatherHeader />} main={<Weather />} footer={<WeatherFooter />} />;
}
