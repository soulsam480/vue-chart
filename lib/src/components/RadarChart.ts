import { ChartProps } from '../types/index';
import { defineComponent, h } from 'vue';
import BaseChart from './BaseChart.vue';

export default defineComponent<Omit<ChartProps<'radar'>, 'chartType'>>({
  name: 'DoughnutChart',
  components: { BaseChart },
  props: ['chartId', 'chartData', 'options', 'width', 'height', 'plugins', 'chartRef'] as unknown as undefined,
  setup(props, { attrs }) {
    return () => [h(BaseChart, { ...props, ...attrs, chartType: 'radar' })];
  },
});
