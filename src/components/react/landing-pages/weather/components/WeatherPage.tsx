import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
import { setAPIKey, useAppDispatch } from '../store';
import { WeatherHeader } from './WeatherHeader';
import { Weather } from './Weather';
import { WeatherFooter } from './WeatherFooter';

export function WeatherPage({ apiKey }: { apiKey: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAPIKey(apiKey));
  }, [apiKey, dispatch]);

  return <PageWithAffix nav={<WeatherHeader />} main={<Weather />} footer={<WeatherFooter />} />;
}
