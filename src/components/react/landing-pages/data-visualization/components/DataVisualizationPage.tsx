import { PageWithAffix } from '@landing-pages/react/common/components';
import { DataVisualization } from './DataVisualization';
import { DataVisualizationFooter } from './DataVisualizationFooter';
import { DataVisualizationHeader } from './DataVisualizationHeader';

export function DataVisualizationPage() {
  return <PageWithAffix nav={<DataVisualizationHeader />} main={<DataVisualization />} footer={<DataVisualizationFooter />} />;
}
