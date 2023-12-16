import { PageWithAffix } from '@landing-pages/react/common/components';
import { Home } from './Home';
import { HomeFooter } from './HomeFooter';
import { HomeHeader } from './HomeHeader';

export function HomePage() {
  return <PageWithAffix nav={<HomeHeader />} main={<Home />} footer={<HomeFooter />} />;
}
