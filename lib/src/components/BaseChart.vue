<script lang="ts">
export default {
  name: 'BaseChart',
};
</script>

<script setup lang="ts">
import { Chart, ChartData, ChartDataset, ChartOptions, ChartType, Plugin } from 'chart.js';
import { onBeforeUnmount, onMounted, ref, shallowRef, watch, Ref } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep';
import isEqual from 'lodash-es/isEqual';
import { nanoid } from 'nanoid';

const props = withDefaults(
  defineProps<{
    /**
     * an ID for the chart
     */
    chartId: string;
    /**
     * type of the chart, valid in BaseChart only
     */
    chartType: ChartType;
    /**
     * chart data to render, type it using the chartType generic
     */
    chartData: ChartData<ChartType>;
    /**
     * chart config, type it using the chartType generic
     */
    options?: ChartOptions<ChartType>;
    /**
     * width of the chart
     * @default 400
     */
    width?: number;
    /**
     * height of the chart
     * @default 400
     */
    height?: number;
    /**
     * chart.js plugins
     * @default []
     */
    plugins?: Plugin[];
    /**
     * chartRef -> a function returning the chart ref, after rendering the chart instance will be
     * assigned to the ref
     */
    chartRef?: () => Ref<Chart<ChartType> | null>;
  }>(),
  {
    width: 400,
    height: 400,
    cssClasses: '',
    plugins: () => [],
  },
);

const emit = defineEmits<{
  (e: 'chart:render', chartInstance: Chart<ChartType>): void;
  (e: 'labels:update'): void;
  (e: 'chart:update', chartInstance: Chart<ChartType>): void;
  (e: 'chart:destroy'): void;
}>();

const canvasRef = ref<HTMLCanvasElement>();

const canvasId = `${props.chartId}-${nanoid(6)}`;

let chartInstance = shallowRef<Chart<ChartType> | null>(null);

watch(() => props.chartData, watchHandler, { deep: true });
watch(
  () => props.options,
  (newOptions, oldOptions) => {
    if (chartInstance.value && newOptions && !isEqual(chartInstance.value.options, oldOptions)) {
      chartInstance.value.options = cloneDeep(newOptions) as any;
      oldOptions = cloneDeep(newOptions) as any;
      handleChartUpdate();
    }
  },
  { deep: true },
);

/** Picked from vue-chartjs */
function watchHandler(newData: ChartData, oldData: ChartData) {
  if (!oldData) {
    if (chartInstance.value) {
      handleChartDestroy();
    }

    renderChart();
    return;
  }

  let chart = chartInstance.value;

  // Get new and old DataSet Labels
  let newDatasetLabels = newData.datasets.map((dataset) => dataset.label);

  let oldDatasetLabels = oldData.datasets.map((dataset) => dataset.label);

  // Stringify 'em for easier compare
  const oldLabels = JSON.stringify(oldDatasetLabels);
  const newLabels = JSON.stringify(newDatasetLabels);

  // Check if Labels are equal and if dataset length is equal
  if (!(newLabels === oldLabels && oldData.datasets.length === newData.datasets.length && chart)) {
    if (chart) {
      handleChartDestroy();
    }

    renderChart();
    return;
  }

  newData.datasets.forEach((dataset, i) => {
    // Get new and old dataset keys
    const oldDatasetKeys = Object.keys(oldData.datasets[i]);
    const newDatasetKeys = Object.keys(dataset);

    // Get keys that aren't present in the new data
    const deletionKeys = oldDatasetKeys.filter((key) => {
      return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
    });

    // Remove outdated key-value pairs
    deletionKeys.forEach((deletionKey) => {
      if (chart?.data.datasets[i]) {
        delete chart.data.datasets[i][deletionKey as keyof ChartDataset];
      }
    });

    // Update attributes individually to avoid re-rendering the entire chart
    for (const attribute in dataset) {
      const attrValue = dataset[attribute as keyof ChartDataset];

      if (dataset.hasOwnProperty(attribute) && attrValue && chart) {
        (chart.data as any).datasets[i][attribute] = attrValue;
      }
    }
  });

  if (newData.hasOwnProperty('labels')) {
    chart.data.labels = newData.labels;
    handleLabelsUpdate();
  }

  handleChartUpdate();
}

function renderChart() {
  if (!canvasRef.value)
    return console.error(
      `Error on component ${props.chartId}, canvas cannot be rendered. Check if the render appends server-side`,
    );

  chartInstance.value = new Chart(canvasRef.value, {
    data: props.chartData,
    type: props.chartType,
    options: cloneDeep(props.options) as ChartOptions<ChartType>, // Types won't work with props type
    plugins: props.plugins,
  });

  if (!!props.chartRef) {
    props.chartRef().value = chartInstance.value;
  }

  handleChartRender();
}

function handleLabelsUpdate() {
  emit('labels:update');
}

function handleChartRender() {
  if (!chartInstance.value) return;

  emit('chart:render', chartInstance.value);
}

function handleChartUpdate() {
  if (!chartInstance.value) return;

  chartInstance.value.update();

  emit('chart:update', chartInstance.value);
}

function handleChartDestroy() {
  chartInstance.value?.destroy();

  emit('chart:destroy');
}

onMounted(renderChart);

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value?.destroy();
  }
});
</script>
<template>
  <div style="max-width: 100%; position: relative">
    <canvas style="max-width: 100%; max-height: 100%" :id="canvasId" v-bind="{ width, height }" ref="canvasRef" />
  </div>
</template>
