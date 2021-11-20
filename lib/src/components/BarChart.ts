import { ChartProps } from '../types/index';
import { defineComponent, h } from 'vue';
import BaseChart from './BaseChart.vue';

export default defineComponent<Omit<ChartProps<'bar'>, 'chartType'>>({
  name: 'DoughnutChart',
  components: { BaseChart },
  props: ['chartId', 'chartData', 'options', 'width', 'height', 'plugins', 'chartRef'] as unknown as undefined,
  setup(props, { attrs }) {
    return () => [h(BaseChart, { ...props, ...attrs, chartType: 'bar' })];
  },
});
