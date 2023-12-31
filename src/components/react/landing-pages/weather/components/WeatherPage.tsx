import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
// import { setAPIKey, setSelectedCategory, useAppDispatch } from '../store';
import { WeatherHeader } from './WeatherHeader';
import { Weather } from './Weather';
import { WeatherFooter } from './WeatherFooter';

export function WeatherPage({ apiKey, selectedCategory }: { apiKey: string; selectedCategory?: string }) {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(setAPIKey(apiKey));
//   }, [apiKey, dispatch]);

//   useEffect(() => {
//     if (!selectedCategory) return;
//     dispatch(setSelectedCategory(selectedCategory.toLowerCase().replace(/[\s_]/g, '-')));
//   }, [dispatch, selectedCategory]);

  return <PageWithAffix nav={<WeatherHeader />} main={<Weather />} footer={<WeatherFooter
 />} />;
}
