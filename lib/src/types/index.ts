import { Chart, ChartData, Plugin, ChartType, ChartOptions } from 'chart.js';
import { Ref } from 'vue';
export declare type ChartProps<TType extends ChartType> = {
  /**
   * an ID for the chart
   */
  chartId: string;
  /**
   * type of the chart, valid in BaseChart only
   */
  chartType: TType;
  /**
   * chart data to render, type it using the chartType generic
   */
  chartData: ChartData<TType>;
  /**
   * chart config, type it using the chartType generic
   */
  options?: ChartOptions<TType>;
  /**
   * width of the chart
   * @default 400
   */
  width?: number | string;
  /**
   * height of the chart
   * @default 400
   */
  height?: number | string;
  /**
   * chart.js plugins
   * @default []
   */
  plugins?: Plugin[];
  /**
   * chartRef -> a function returning the chart ref, after rendering the chart instance will be
   * assigned to the ref
   */
  chartRef?: () => Ref<Chart<TType> | null>;
  /**
   * emitted chart labels are updated
   */
  onLabelsUpdate?: () => void;
  /**
   * emitted when chart gets updated
   * @param chartInstance Chartjs instance
   */
  onChartUpdate?: (chartInstance: Chart<TType>) => void;
  /**
   * emitted when chart gets destroyed
   */
  onChartDestroy?: () => void;
  /**
   * emitted when chart gets rendered
   * @param chartInstance Chartjs instance
   */
  onChartRender?: (chartInstance: Chart<TType>) => void;
};
